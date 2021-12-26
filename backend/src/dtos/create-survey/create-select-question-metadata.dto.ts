import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsIn,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateSelectQuestionMetadata, QuestionMetadataType } from 'common';

const selectQuestionMetadataTypes: QuestionMetadataType[] = [
  QuestionMetadataType.SingleSelectRadio,
  QuestionMetadataType.SingleSelectCheckbox,
  QuestionMetadataType.SingleSelectDropdown,
  QuestionMetadataType.MultiSelectCheckbox,
  QuestionMetadataType.MultiSelectDropdown,
];

export class CreateSelectQuestionMetadataDto
  implements CreateSelectQuestionMetadata
{
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
  @ArrayUnique()
  @ArrayMinSize(2)
  @IsString({ each: true })
  @MinLength(5, { each: true })
  public availableValues: string[];
}
