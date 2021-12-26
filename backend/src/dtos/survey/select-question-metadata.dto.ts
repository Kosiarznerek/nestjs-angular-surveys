import { ApiProperty } from '@nestjs/swagger';
import { QuestionMetadataType } from '../../enums/question-metadata-type.enum';

export class SelectQuestionMetadataDto {
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
