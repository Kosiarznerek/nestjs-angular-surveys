import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from '../dtos/create-survey/create-survey.dto';
import { SubmissionAnswersDto } from '../dtos/submission-answers.dto';
import { SurveyStatisticsDto } from '../dtos/survey-statistics.dto';
import { SurveySubmissionDto } from '../dtos/survey-submission.dto';
import { SurveyDto } from '../dtos/survey/survey.dto';
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

  public create(model: CreateSurveyDto): Promise<SurveyDto> {
    return this.surveyRepository.save(model);
  }

  public async findOne(surveyIdentifier: string): Promise<SurveyDto> {
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

  public getStatistics(surveyIdentifier: string): Promise<SurveyStatisticsDto> {
    throw new NotImplementedException();
  }

  public async submitAnswers(
    surveyIdentifier: string,
    answers: SubmissionAnswersDto,
  ): Promise<SurveySubmissionDto> {
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
  ): Promise<SurveySubmissionDto[]> {
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
  ): Promise<SurveySubmissionDto> {
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
}
