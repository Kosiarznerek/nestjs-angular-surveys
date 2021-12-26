import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateSurveyQuestion } from 'common';
import {
  CreateQuestionMetadataDto,
  CreateQuestionMetadataApiExtraModels,
  CreateQuestionMetadataApiProperty,
  createQuestionMetadataDescriptor,
} from './create-question-metadata.dto';

@CreateQuestionMetadataApiExtraModels()
export class CreateSurveyQuestionDto implements CreateSurveyQuestion {
  @IsString()
  @MinLength(5)
  @MaxLength(400)
  public label: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 1 })
  public orderIndex: number;

  @IsBoolean()
  public isRequired: boolean;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ example: 60 })
  public timeLimitInSeconds?: number;

  @ValidateNested()
  @Type(() => null, {
    keepDiscriminatorProperty: true,
    discriminator: createQuestionMetadataDescriptor,
  })
  @CreateQuestionMetadataApiProperty()
  public metadata: CreateQuestionMetadataDto;
}
