import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional } from 'class-validator';
import { QuestionMetadataType } from '../../enums/question-metadata-type.enum';

const dateQuestionMetadataTypes: QuestionMetadataType[] = [
  QuestionMetadataType.DatePicker,
];

export class CreateDateQuestionMetadataDto {
  @IsIn(dateQuestionMetadataTypes)
  @ApiProperty({
    enum: dateQuestionMetadataTypes,
  })
  public type: QuestionMetadataType.DatePicker;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    type: Date,
  })
  public minimumISODate?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    type: Date,
  })
  public maximumISODate?: string;
}
