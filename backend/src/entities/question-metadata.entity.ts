import { DateQuestionMetadataEntity } from './date-question-metadata.entity';
import { NumberQuestionMetadataEntity } from './number-question-metadata.entity';
import { SelectQuestionMetadataEntity } from './select-question-metadata.entity';
import { TextQuestionMetadataEntity } from './text-question-metadata.entity';

export type QuestionMetadataEntity =
  | TextQuestionMetadataEntity
  | NumberQuestionMetadataEntity
  | DateQuestionMetadataEntity
  | SelectQuestionMetadataEntity;
