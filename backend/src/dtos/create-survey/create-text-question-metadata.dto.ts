import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { CreateTextQuestionMetadata, QuestionMetadataType } from 'common';

const textQuestionMetadataTypes: QuestionMetadataType[] = [
  QuestionMetadataType.PlainText,
  QuestionMetadataType.EmailText,
  QuestionMetadataType.AreaText,
];

export class CreateTextQuestionMetadataDto
  implements CreateTextQuestionMetadata
{
  @IsIn(textQuestionMetadataTypes)
  @ApiProperty({
    enum: textQuestionMetadataTypes,
  })
  public type:
    | QuestionMetadataType.PlainText
    | QuestionMetadataType.EmailText
    | QuestionMetadataType.AreaText;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 1 })
  public minimumLength?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 10 })
  public maximumLength?: number;
}
