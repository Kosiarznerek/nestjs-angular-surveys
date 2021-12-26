import { QuestionMetadataType } from '../..';

export interface NumberQuestionMetadata {
  type: QuestionMetadataType.StandartNumber;
  minimumValue: number | null;
  maximumValue: number | null;
}
