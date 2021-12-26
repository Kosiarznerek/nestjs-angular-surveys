import { QuestionMetadataType } from '../enums/question-metadata-type.enum';

export class NumberQuestionMetadataEntity {
  public type: QuestionMetadataType.StandartNumber;
  public minimumValue?: number;
  public maximumValue?: number;
}
