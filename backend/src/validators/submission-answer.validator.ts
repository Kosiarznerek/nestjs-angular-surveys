import {
  ArgumentMetadata,
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  isDateString,
  isEmail,
  isNumberString,
  isString,
  max,
  maxLength,
  min,
  minLength,
} from 'class-validator';
import { Repository } from 'typeorm';
import { SubmissionAnswersDto } from '../dtos/submission-answers.dto';
import { DateQuestionMetadataEntity } from '../entities/date-question-metadata.entity';
import { NumberQuestionMetadataEntity } from '../entities/number-question-metadata.entity';
import { SelectQuestionMetadataEntity } from '../entities/select-question-metadata.entity';
import { SurveyQuestionEntity } from '../entities/survey-question.entity';
import { SurveyEntity } from '../entities/survey.entity';
import { TextQuestionMetadataEntity } from '../entities/text-question-metadata.entity';
import { QuestionMetadataType } from '../enums/question-metadata-type.enum';

@Injectable()
export class SubmissionAnswerValidator implements PipeTransform {
  private surveyIdentifier?: string;

  public constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
  ) {
    this.surveyIdentifier = null;
  }

  public async transform(
    value: string | SubmissionAnswersDto,
    metadata: ArgumentMetadata,
  ): Promise<string | SubmissionAnswersDto> {
    if (typeof value === 'string' && metadata.type === 'param') {
      this.surveyIdentifier = value;
      return value;
    }

    if (
      typeof value === 'object' &&
      this.surveyIdentifier &&
      metadata.type === 'body'
    ) {
      await this.validateAnswers(value);
      this.surveyIdentifier = null;
      return value;
    }

    throw new InternalServerErrorException('Propably surveyIdentifier is null');
  }

  private async validateAnswers(answers: SubmissionAnswersDto): Promise<void> {
    const surveyEntity: SurveyEntity = await this.surveyRepository.findOne({
      relations: ['submissions'],
      where: {
        identifier: this.surveyIdentifier,
      },
    });

    if (!surveyEntity) {
      throw new NotFoundException(
        `Survey with identifier '${this.surveyIdentifier}' does not exists`,
      );
    }

    this.validateIfAnswersCanBeSubmitted(surveyEntity);
    this.validateAnswersIdentifiers(answers, surveyEntity.questions);

    const errors: string[] = this.getErrosForAllAnswers(
      answers,
      surveyEntity.questions,
    );
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }

  private validateIfAnswersCanBeSubmitted(surveyEntity: SurveyEntity): void {
    const currentDate: number = new Date().valueOf();
    const { maximumSubmissions, submissions } = surveyEntity;
    const { submittableFrom, submittableTo } = surveyEntity;

    const submittableFromDate: number = new Date(submittableFrom).valueOf();
    const submittableToDate: number = new Date(submittableTo).valueOf();

    if (maximumSubmissions && submissions.length >= maximumSubmissions) {
      throw new ForbiddenException(
        `Survey canot be submitted more then ${maximumSubmissions} times`,
      );
    }

    if (currentDate < submittableFromDate) {
      throw new ForbiddenException(
        `Survey can be submitted from ${submittableFrom}`,
      );
    }

    if (submittableTo && currentDate > submittableToDate) {
      throw new ForbiddenException(
        `Survey can be submitted till ${submittableTo}`,
      );
    }
  }

  private validateAnswersIdentifiers(
    answers: SubmissionAnswersDto,
    questions: SurveyQuestionEntity[],
  ) {
    for (const questionIdentifier in answers) {
      const questionInNotInList: boolean = !questions.some(
        (value) => value.identifier === questionIdentifier,
      );

      if (questionInNotInList) {
        throw new ForbiddenException(
          `Survey has no question with identifier '${questionIdentifier}'`,
        );
      }
    }
  }

  private getErrosForAllAnswers(
    answers: SubmissionAnswersDto,
    questions: SurveyQuestionEntity[],
  ): string[] {
    const errors: string[] = [];

    for (const question of questions) {
      const questionAnswer: string = answers[question.identifier];
      const questionHasAnswer: boolean = Object.keys(answers).includes(
        question.identifier,
      );

      if (questionHasAnswer && !isString(questionAnswer)) {
        errors.push(
          `Answer for question '${question.identifier}' is not a string`,
        );
        continue;
      }

      if (!questionHasAnswer && question.isRequired) {
        errors.push(`Answer for question '${question.identifier}' is required`);
        continue;
      }

      if (questionHasAnswer) {
        const answerErrors: string[] = this.getErrorsForAnswer(
          questionAnswer,
          question,
        );
        errors.push(...answerErrors);
      }
    }

    return errors;
  }

  private getErrorsForAnswer(
    answer: string,
    question: SurveyQuestionEntity,
  ): string[] {
    const errors: string[] = [];

    switch (question.metadata.type) {
      case QuestionMetadataType.PlainText:
      case QuestionMetadataType.EmailText:
      case QuestionMetadataType.AreaText:
        errors.push(...this.getErrorsForTextAnswer(answer, question.metadata));
        break;
      case QuestionMetadataType.StandartNumber:
        errors.push(
          ...this.getErrorsForNumberAnswer(answer, question.metadata),
        );
        break;
      case QuestionMetadataType.DatePicker:
        errors.push(...this.getErrorsForDateAnswer(answer, question.metadata));
        break;
      case QuestionMetadataType.SingleSelectRadio:
      case QuestionMetadataType.SingleSelectCheckbox:
      case QuestionMetadataType.SingleSelectDropdown:
      case QuestionMetadataType.MultiSelectCheckbox:
      case QuestionMetadataType.MultiSelectDropdown:
        errors.push(
          ...this.getErrorsForSelectAnswer(answer, question.metadata),
        );
        break;
      default:
        throw new InternalServerErrorException(
          `Question is not supported ${question.metadata['type']}`,
        );
    }

    return errors.map(
      (error) => `Answer for question ${question.identifier} ${error}`,
    );
  }

  private getErrorsForTextAnswer(
    answer: string,
    metadata: TextQuestionMetadataEntity,
  ): string[] {
    const errors: string[] = [];
    const { minimumLength, maximumLength } = metadata;

    if (metadata.type === QuestionMetadataType.EmailText && !isEmail(answer)) {
      errors.push('is not a valid email');
    }

    if (minimumLength && !minLength(answer, minimumLength)) {
      errors.push(`did not reached minimum length of ${minimumLength}`);
    }
    if (maximumLength && !maxLength(answer, maximumLength)) {
      errors.push(`is over maximim length of ${maximumLength}`);
    }

    return errors;
  }

  private getErrorsForNumberAnswer(
    answer: string,
    metadata: NumberQuestionMetadataEntity,
  ): string[] {
    const errors: string[] = [];
    const value: number = +answer;
    const { minimumValue, maximumValue } = metadata;

    if (isNumberString(answer)) {
      errors.push('is invalid number string');
      return errors;
    }

    if (minimumValue && !min(value, minimumValue)) {
      errors.push(`did not reached minimum value of ${minimumValue}`);
    }
    if (maximumValue && !max(value, maximumValue)) {
      errors.push(`is over maximum value of ${maximumValue}`);
    }

    return errors;
  }

  private getErrorsForDateAnswer(
    answer: string,
    metadata: DateQuestionMetadataEntity,
  ): string[] {
    const errors: string[] = [];

    const { minimumISODate, maximumISODate } = metadata;
    const answerDate: number = new Date(answer).valueOf();
    const minimumDate: number = new Date(minimumISODate).valueOf();
    const maximumDate: number = new Date(maximumISODate).valueOf();

    if (!isDateString(answer)) {
      errors.push('is not an ISO Date string');
    }
    if (answerDate < minimumDate) {
      errors.push(`did not readed minimum date of ${minimumISODate}`);
    }
    if (maximumISODate && answerDate > maximumDate) {
      errors.push(`is over maximum date of ${maximumISODate}`);
    }

    return errors;
  }

  private getErrorsForSelectAnswer(
    answer: string,
    metadata: SelectQuestionMetadataEntity,
  ): string[] {
    const isMultiSelect: boolean =
      metadata.type === QuestionMetadataType.MultiSelectCheckbox ||
      metadata.type === QuestionMetadataType.MultiSelectDropdown;

    if (isMultiSelect) {
      return this.getErrorsForMultiSelectAnswer(answer, metadata);
    } else {
      return this.getErrorsForSingleSelectAnswer(answer, metadata);
    }
  }

  private getErrorsForSingleSelectAnswer(
    answer: string,
    metadata: SelectQuestionMetadataEntity,
  ): string[] {
    const { availableValues } = metadata;
    const valueIsValid: boolean = availableValues.includes(answer);

    if (valueIsValid) {
      return [];
    } else {
      return [
        `does not satisfies available values: ${metadata.availableValues}`,
      ];
    }
  }

  private getErrorsForMultiSelectAnswer(
    answer: string,
    metadata: SelectQuestionMetadataEntity,
  ): string[] {
    let selectedValues: string[] = [];
    try {
      const selectedValues: string[] = JSON.parse(answer);
      if (!Array.isArray(selectedValues)) {
        throw new Error();
      }
    } catch {
      return ['is not array in JSON format'];
    }

    const errors: string[] = [];
    const { availableValues } = metadata;

    for (const selectedValue of selectedValues) {
      const valueIsValid: boolean = availableValues.includes(selectedValue);

      if (!valueIsValid) {
        errors.push(
          `contains '${selectedValue}' as selected value which is not listed in available values ${availableValues}`,
        );
      }
    }

    return errors;
  }
}
