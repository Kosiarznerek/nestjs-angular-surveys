import { QuestionMetadataType } from 'common';

export class DateQuestionMetadataEntity {
  public type: QuestionMetadataType.DatePicker;
  public minimumISODate?: string;
  public maximumISODate?: string;
}
