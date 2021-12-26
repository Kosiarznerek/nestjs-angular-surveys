import { QuestionMetadataType } from '../..';

export interface DateQuestionMetadata {
  type: QuestionMetadataType.DatePicker;
  minimumISODate: string | null;
  maximumISODate: string | null;
}
