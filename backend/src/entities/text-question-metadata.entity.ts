import { QuestionMetadataType } from 'common';

export class TextQuestionMetadataEntity {
  public type:
    | QuestionMetadataType.PlainText
    | QuestionMetadataType.EmailText
    | QuestionMetadataType.AreaText;
  public minimumLength?: number;
  public maximumLength?: number;
}
