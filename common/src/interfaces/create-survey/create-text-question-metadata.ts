import { QuestionMetadataType } from '../..';

export interface CreateTextQuestionMetadata {
  type:
    | QuestionMetadataType.PlainText
    | QuestionMetadataType.EmailText
    | QuestionMetadataType.AreaText;
  minimumLength?: number;
  maximumLength?: number;
}
