import { ApiProperty } from '@nestjs/swagger';
import { QuestionMetadataType } from '../../enums/question-metadata-type.enum';

export class TextQuestionMetadataDto {
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
  public minimumLength?: number;
  public maximumLength?: number;
}
