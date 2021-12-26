import { ApiProperty } from '@nestjs/swagger';
import { QuestionMetadataType } from '../../enums/question-metadata-type.enum';

export class NumberQuestionMetadataDto {
  @ApiProperty({
    enum: [QuestionMetadataType.StandartNumber],
  })
  public type: QuestionMetadataType.StandartNumber;
  public minimumValue?: number;
  public maximumValue?: number;
}
