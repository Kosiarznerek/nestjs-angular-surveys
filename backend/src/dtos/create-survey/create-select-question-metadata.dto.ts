import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsString,
  MinLength,
} from 'class-validator';
import { QuestionMetadataType } from '../../enums/question-metadata-type.enum';

const selectQuestionMetadataTypes: QuestionMetadataType[] = [
  QuestionMetadataType.SingleSelectRadio,
  QuestionMetadataType.SingleSelectCheckbox,
  QuestionMetadataType.SingleSelectDropdown,
  QuestionMetadataType.MultiSelectCheckbox,
  QuestionMetadataType.MultiSelectDropdown,
];

export class CreateSelectQuestionMetadataDto {
  @IsIn(selectQuestionMetadataTypes)
  @ApiProperty({
    enum: selectQuestionMetadataTypes,
  })
  public type:
    | QuestionMetadataType.SingleSelectRadio
    | QuestionMetadataType.SingleSelectCheckbox
    | QuestionMetadataType.SingleSelectDropdown
    | QuestionMetadataType.MultiSelectCheckbox
    | QuestionMetadataType.MultiSelectDropdown;

  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  @MinLength(5, { each: true })
  public availableValues: string[];
}