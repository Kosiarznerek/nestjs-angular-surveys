import { QuestionMetadataType } from 'common';

export class NumberQuestionMetadataEntity {
  public type: QuestionMetadataType.StandartNumber;
  public minimumValue?: number;
  public maximumValue?: number;
}
