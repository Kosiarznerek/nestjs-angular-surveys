import { QuestionMetadataType } from '../..';

export interface CreateNumberQuestionMetadata {
  type: QuestionMetadataType.StandartNumber;
  minimumValue?: number;
  maximumValue?: number;
}
