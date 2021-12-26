import { CreateDateQuestionMetadata } from './create-date-question-metadata';
import { CreateNumberQuestionMetadata } from './create-number-question-metadata';
import { CreateSelectQuestionMetadata } from './create-select-question-metadata';
import { CreateTextQuestionMetadata } from './create-text-question-metadata';

export type CreateQuestionMetadata =
  | CreateTextQuestionMetadata
  | CreateNumberQuestionMetadata
  | CreateDateQuestionMetadata
  | CreateSelectQuestionMetadata;
