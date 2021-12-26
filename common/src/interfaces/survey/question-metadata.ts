import { DateQuestionMetadata } from './date-question-metadata';
import { NumberQuestionMetadata } from './number-question-metadata';
import { SelectQuestionMetadata } from './select-question-metadata';
import { TextQuestionMetadata } from './text-question-metadata';

export type QuestionMetadata =
  | TextQuestionMetadata
  | NumberQuestionMetadata
  | DateQuestionMetadata
  | SelectQuestionMetadata;
