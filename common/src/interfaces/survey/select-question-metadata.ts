import { QuestionMetadataType } from '../..';

export interface SelectQuestionMetadata {
  type:
    | QuestionMetadataType.SingleSelectRadio
    | QuestionMetadataType.SingleSelectCheckbox
    | QuestionMetadataType.SingleSelectDropdown
    | QuestionMetadataType.MultiSelectCheckbox
    | QuestionMetadataType.MultiSelectDropdown;
  availableValues: string[];
}
