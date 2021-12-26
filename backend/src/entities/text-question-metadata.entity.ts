import { QuestionMetadataType } from 'common';

export class TextQuestionMetadataEntity {
  public type:
    | QuestionMetadataType.PlainText
    | QuestionMetadataType.EmailText
    | QuestionMetadataType.AreaText;
  public minimumLength: number | null;
  public maximumLength: number | null;
}
