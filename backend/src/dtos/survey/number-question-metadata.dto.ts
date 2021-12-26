import { ApiProperty } from '@nestjs/swagger';
import { NumberQuestionMetadata, QuestionMetadataType } from 'common';

export class NumberQuestionMetadataDto implements NumberQuestionMetadata {
  @ApiProperty({
    enum: [QuestionMetadataType.StandartNumber],
  })
  public type: QuestionMetadataType.StandartNumber;
  public minimumValue: number | null;
  public maximumValue: number | null;
}
