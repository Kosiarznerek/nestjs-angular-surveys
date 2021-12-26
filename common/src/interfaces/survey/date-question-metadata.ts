import { QuestionMetadataType } from '../..';

export interface DateQuestionMetadata {
  type: QuestionMetadataType.DatePicker;
  minimumISODate?: string;
  maximumISODate?: string;
}
