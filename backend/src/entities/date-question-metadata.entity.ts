import { QuestionMetadataType } from '../enums/question-metadata-type.enum';

export class DateQuestionMetadataEntity {
  public type: QuestionMetadataType.DatePicker;
  public minimumISODate?: string;
  public maximumISODate?: string;
}
