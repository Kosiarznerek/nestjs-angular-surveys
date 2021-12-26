import { ApiProperty } from '@nestjs/swagger';
import { DateQuestionMetadata, QuestionMetadataType } from 'common';

export class DateQuestionMetadataDto implements DateQuestionMetadata {
  @ApiProperty({
    enum: [QuestionMetadataType.DatePicker],
  })
  public type: QuestionMetadataType.DatePicker;
  public minimumISODate?: string;
  public maximumISODate?: string;
}
