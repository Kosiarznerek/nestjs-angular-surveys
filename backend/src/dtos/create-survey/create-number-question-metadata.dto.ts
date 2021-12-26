import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { CreateNumberQuestionMetadata, QuestionMetadataType } from 'common';

const numberQuestionMetadataTypes: QuestionMetadataType[] = [
  QuestionMetadataType.StandartNumber,
];

export class CreateNumberQuestionMetadataDto
  implements CreateNumberQuestionMetadata
{
  @IsIn(numberQuestionMetadataTypes)
  @ApiProperty({
    enum: numberQuestionMetadataTypes,
  })
  public type: QuestionMetadataType.StandartNumber;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1 })
  public minimumValue?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 10 })
  public maximumValue?: number;
}
