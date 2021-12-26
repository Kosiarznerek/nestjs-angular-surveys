import { registerDecorator, ValidationArguments } from 'class-validator';
import { CreateSurveyQuestionDto } from '../dtos/create-survey/create-survey-question.dto';

const defaultMessage = (validationArguments?: ValidationArguments): string => {
  return `${validationArguments?.property} must have unique orderIndexes starting from 1 with step 1`;
};

const validate = (value: CreateSurveyQuestionDto[]): boolean => {
  if (!Array.isArray(value)) {
    return false;
  }

  const questionIndexes: number[] = value.map(
    (question) => question.orderIndex,
  );
  const questionIndexesSet: Set<number> = new Set<number>(questionIndexes);
  const sortedUniqueIndexes: number[] = Array.from(questionIndexesSet).sort();

  if (sortedUniqueIndexes.length !== value.length) {
    return false;
  }

  for (let index = 0; index < sortedUniqueIndexes.length; index++) {
    if (sortedUniqueIndexes[index] !== index + 1) {
      return false;
    }
  }

  return true;
};

export const SurveyQuestionsHaveValidOrderValidator =
  () => (object: Object, propertyName: string) =>
    registerDecorator({
      name: 'SurveyQuestionsHaveValidOrderValidator',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate,
        defaultMessage,
      },
    });
