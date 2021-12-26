import { ApiProperty } from '@nestjs/swagger';
import { QuestionMetadataType, TextQuestionMetadata } from 'common';

export class TextQuestionMetadataDto implements TextQuestionMetadata {
  @ApiProperty({
    enum: [
      QuestionMetadataType.PlainText,
      QuestionMetadataType.EmailText,
      QuestionMetadataType.AreaText,
    ],
  })
  public type:
    | QuestionMetadataType.PlainText
    | QuestionMetadataType.EmailText
    | QuestionMetadataType.AreaText;
  public minimumLength: number | null;
  public maximumLength: number | null;
}
