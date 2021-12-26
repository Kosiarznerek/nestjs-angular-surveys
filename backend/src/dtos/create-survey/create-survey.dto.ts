import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { SurveyDisplayFormat } from '../../enums/survey-display-format.enum';
import { SurveyQuestionsHaveValidOrderValidator } from '../../validators/survey-questions-have-valid-order.validator';
import { CreateSurveyQuestionDto } from './create-survey-question.dto';

export class CreateSurveyDto {
  @IsBoolean()
  public publicStatistics: boolean;

  @IsEnum(SurveyDisplayFormat)
  public displayFormat: SurveyDisplayFormat;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    type: Date,
  })
  public submittableFrom?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    type: Date,
  })
  public submittableTo?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 100 })
  public maximumSubmissions?: number;

  @IsArray()
  @ArrayMinSize(3)
  @ValidateNested()
  @Type(() => CreateSurveyQuestionDto)
  @SurveyQuestionsHaveValidOrderValidator()
  public questions: CreateSurveyQuestionDto[];
}
