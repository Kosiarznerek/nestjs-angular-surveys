import { QuestionMetadataType } from '../..';

export interface CreateSelectQuestionMetadata {
  type:
    | QuestionMetadataType.SingleSelectRadio
    | QuestionMetadataType.SingleSelectCheckbox
    | QuestionMetadataType.SingleSelectDropdown
    | QuestionMetadataType.MultiSelectCheckbox
    | QuestionMetadataType.MultiSelectDropdown;
  availableValues: string[];
}
