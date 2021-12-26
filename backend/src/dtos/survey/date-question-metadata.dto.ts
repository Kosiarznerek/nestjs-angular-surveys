import { ApiProperty } from '@nestjs/swagger';
import { QuestionMetadataType } from '../../enums/question-metadata-type.enum';

export class DateQuestionMetadataDto {
  @ApiProperty({
    enum: [QuestionMetadataType.DatePicker],
  })
  public type: QuestionMetadataType.DatePicker;
  public minimumISODate?: string;
  public maximumISODate?: string;
}
