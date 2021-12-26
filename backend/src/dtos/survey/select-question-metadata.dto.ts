import { ApiProperty } from '@nestjs/swagger';
import { QuestionMetadataType, SelectQuestionMetadata } from 'common';

export class SelectQuestionMetadataDto implements SelectQuestionMetadata {
  @ApiProperty({
    enum: [
      QuestionMetadataType.SingleSelectRadio,
      QuestionMetadataType.SingleSelectCheckbox,
      QuestionMetadataType.SingleSelectDropdown,
      QuestionMetadataType.MultiSelectCheckbox,
      QuestionMetadataType.MultiSelectDropdown,
    ],
  })
  public type:
    | QuestionMetadataType.SingleSelectRadio
    | QuestionMetadataType.SingleSelectCheckbox
    | QuestionMetadataType.SingleSelectDropdown
    | QuestionMetadataType.MultiSelectCheckbox
    | QuestionMetadataType.MultiSelectDropdown;
  public availableValues: string[];
}
