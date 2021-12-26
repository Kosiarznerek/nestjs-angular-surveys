import { QuestionMetadataType } from '../enums/question-metadata-type.enum';

export class TextQuestionMetadataEntity {
  public type:
    | QuestionMetadataType.PlainText
    | QuestionMetadataType.EmailText
    | QuestionMetadataType.AreaText;
  public minimumLength?: number;
  public maximumLength?: number;
}
