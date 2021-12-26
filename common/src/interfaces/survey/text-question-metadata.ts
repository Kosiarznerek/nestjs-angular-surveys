import { QuestionMetadataType } from '../..';

export interface TextQuestionMetadata {
  type:
    | QuestionMetadataType.PlainText
    | QuestionMetadataType.EmailText
    | QuestionMetadataType.AreaText;
  minimumLength?: number;
  maximumLength?: number;
}
