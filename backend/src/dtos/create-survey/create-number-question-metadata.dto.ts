import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { QuestionMetadataType } from '../../enums/question-metadata-type.enum';

const numberQuestionMetadataTypes: QuestionMetadataType[] = [
  QuestionMetadataType.StandartNumber,
];

export class CreateNumberQuestionMetadataDto {
  @IsIn(numberQuestionMetadataTypes)
  @ApiProperty({
    enum: numberQuestionMetadataTypes,
  })
  public type: QuestionMetadataType.StandartNumber;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 1 })
  public minimumValue?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 10 })
  public maximumValue?: number;
}
