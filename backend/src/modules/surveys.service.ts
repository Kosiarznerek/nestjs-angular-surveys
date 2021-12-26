import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateSurvey,
  QuestionMetadataType,
  SubmissionAnswers,
  Survey,
  SurveyStatistics,
  SurveySubmission,
} from 'common';
import { Repository } from 'typeorm';
import { SubmissionAnswersEntity } from '../entities/submission-answers.entity';
import { SurveyQuestionEntity } from '../entities/survey-question.entity';
import { SurveySubmissionEntity } from '../entities/survey-submission.entity';
import { SurveyEntity } from '../entities/survey.entity';

@Injectable()
export class SurveysService {
  public constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
    @InjectRepository(SurveySubmissionEntity)
    private surveySubmissionRepository: Repository<SurveySubmissionEntity>,
  ) {}

  public create(model: CreateSurvey): Promise<Survey> {
    return this.surveyRepository.save(model);
  }

  public async findOne(surveyIdentifier: string): Promise<Survey> {
    const surveyEntity: SurveyEntity = await this.surveyRepository.findOne({
      identifier: surveyIdentifier,
    });

    if (!surveyEntity) {
      throw new NotFoundException(
        `Survey with identifier '${surveyIdentifier}' does not exists`,
      );
    }

    return surveyEntity;
  }

  public async getStatistics(
    surveyIdentifier: string,
  ): Promise<SurveyStatistics> {
    const surveyEntity: SurveyEntity = await this.surveyRepository.findOne({
      relations: ['submissions'],
      where: {
        identifier: surveyIdentifier,
      },
    });

    const surveyStatistics: SurveyStatistics = {
      submittedSurveys: surveyEntity.submissions.length,
      questionStatistics: {},
    };

    for (const question of surveyEntity.questions) {
      const questionTotalAnswers: number = this.getQuestionTotalAnswers(
        question,
        surveyEntity.submissions,
      );

      surveyStatistics.questionStatistics[question.identifier] = {
        totalAnswers: questionTotalAnswers,
        noAnswers: surveyStatistics.submittedSurveys - questionTotalAnswers,
        commonAnswers: this.getQuestionCommonAnswers(
          question,
          surveyEntity.submissions,
        ),
      };
    }

    return surveyStatistics;
  }

  public async submitAnswers(
    surveyIdentifier: string,
    answers: SubmissionAnswers,
  ): Promise<SurveySubmission> {
    const surveyEntity: SurveyEntity = await this.surveyRepository.findOne({
      identifier: surveyIdentifier,
    });

    const surveySubmissionEntity: SurveySubmissionEntity =
      await this.surveySubmissionRepository.save({
        answers,
        survey: surveyEntity,
      });

    delete surveySubmissionEntity.survey;

    return surveySubmissionEntity;
  }

  public async findAllSubmissions(
    surveyIdentifier: string,
  ): Promise<SurveySubmission[]> {
    const surveyEntity: SurveyEntity = await this.surveyRepository.findOne({
      relations: ['submissions'],
      where: {
        identifier: surveyIdentifier,
      },
    });

    return surveyEntity.submissions;
  }

  public async findOneSubmission(
    surveyIdentifier: string,
    submissionIdentifier: string,
  ): Promise<SurveySubmission> {
    const surveyEntity: SurveyEntity = await this.surveyRepository.findOne({
      identifier: surveyIdentifier,
    });

    if (!surveyEntity) {
      throw new NotFoundException(
        `Survey with identifier '${surveyIdentifier}' does not exists`,
      );
    }

    const surveySubmissionEntity: SurveySubmissionEntity =
      await this.surveySubmissionRepository.findOne({
        relations: ['survey'],
        where: {
          identifier: submissionIdentifier,
        },
      });

    if (!surveySubmissionEntity) {
      throw new NotFoundException(
        `Survey submission with identifier '${submissionIdentifier}' does not exists`,
      );
    }

    if (surveySubmissionEntity.survey.identifier !== surveyIdentifier) {
      throw new NotFoundException(
        `Survey submission with identifier '${submissionIdentifier}' exits in ` +
          `survey with identifier '${surveySubmissionEntity.survey.identifier}'` +
          `but not in survey with identifier '${surveyIdentifier}'`,
      );
    }

    delete surveySubmissionEntity.survey;

    return surveySubmissionEntity;
  }

  private getQuestionTotalAnswers(
    question: SurveyQuestionEntity,
    submissions: SurveySubmissionEntity[],
  ): number {
    let counter: number = 0;

    for (const subbmission of submissions) {
      const questionHasAnswer: boolean = Object.keys(
        subbmission.answers,
      ).includes(question.identifier);

      if (questionHasAnswer) {
        counter++;
      }
    }

    return counter;
  }

  private getQuestionCommonAnswers(
    question: SurveyQuestionEntity,
    submissions: SurveySubmissionEntity[],
  ): string[] {
    let maxCount: number = 2;
    let commonAnswers: string[] = [];

    const answersCount: Map<string, number> = this.getAnswersCountMap(
      question,
      submissions,
    );

    for (const [answerValue, answerCount] of answersCount) {
      if (answerCount > maxCount) {
        maxCount = answerCount;
        commonAnswers = [];
      }

      if (answerCount === maxCount) {
        commonAnswers.push(answerValue);
      }
    }

    return commonAnswers;
  }

  private getAnswersCountMap(
    question: SurveyQuestionEntity,
    submissions: SurveySubmissionEntity[],
  ): Map<string, number> {
    const answersCount: Map<string, number> = new Map<string, number>();

    for (const submission of submissions) {
      const submissionAnswers: string[] = this.extractQuestionAnswers(
        question,
        submission.answers,
      );

      for (const submissionAnswer of submissionAnswers) {
        const count: number = answersCount.get(submissionAnswer) ?? 0;
        answersCount.set(submissionAnswer, count + 1);
      }
    }

    return answersCount;
  }

  private extractQuestionAnswers(
    question: SurveyQuestionEntity,
    answers: SubmissionAnswersEntity,
  ): string[] {
    const questionHasAnswer: boolean = Object.keys(answers).includes(
      question.identifier,
    );
    if (!questionHasAnswer) {
      return [];
    }

    const isMultiSelect: boolean =
      question.metadata.type === QuestionMetadataType.MultiSelectCheckbox ||
      question.metadata.type === QuestionMetadataType.MultiSelectDropdown;

    const answer: string = answers[question.identifier];

    if (isMultiSelect) {
      return JSON.parse(answer);
    } else {
      return [answer];
    }
  }
}
