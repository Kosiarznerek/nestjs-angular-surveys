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
  registerDecorator,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { SurveyDisplayFormat } from '../../enums/survey-display-format.enum';
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
  @HaveValidOrderIndex()
  @Type(() => CreateSurveyQuestionDto)
  public questions: CreateSurveyQuestionDto[];
}

function HaveValidOrderIndex() {
  return (object: Object, propertyName: string) =>
    registerDecorator({
      name: 'HaveValidOrderIndex',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${validationArguments?.property} must have unique orderIndexes starting from 1 with step 1`;
        },
        validate(value: CreateSurveyQuestionDto[]) {
          if (!Array.isArray(value)) {
            return false;
          }

          const questionIndexes: number[] = value.map(
            (question) => question.orderIndex,
          );
          const questionIndexesSet: Set<number> = new Set<number>(
            questionIndexes,
          );
          const sortedUniqueIndexes: number[] =
            Array.from(questionIndexesSet).sort();

          if (sortedUniqueIndexes.length !== value.length) {
            return false;
          }

          for (let index = 0; index < sortedUniqueIndexes.length; index++) {
            if (sortedUniqueIndexes[index] !== index + 1) {
              return false;
            }
          }

          return true;
        },
      },
    });
}
