import { QuestionMetadataType } from 'common';

export class NumberQuestionMetadataEntity {
  public type: QuestionMetadataType.StandartNumber;
  public minimumValue: number | null;
  public maximumValue: number | null;
}
