import { QuestionMetadataType } from '../..';

export interface CreateDateQuestionMetadata {
  type: QuestionMetadataType.DatePicker;
  minimumISODate?: string;
  maximumISODate?: string;
}
