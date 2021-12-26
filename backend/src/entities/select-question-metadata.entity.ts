import { QuestionMetadataType } from '../enums/question-metadata-type.enum';

export class SelectQuestionMetadataEntity {
  public type:
    | QuestionMetadataType.SingleSelectRadio
    | QuestionMetadataType.SingleSelectCheckbox
    | QuestionMetadataType.SingleSelectDropdown
    | QuestionMetadataType.MultiSelectCheckbox
    | QuestionMetadataType.MultiSelectDropdown;
  public availableValues: string[];
}
