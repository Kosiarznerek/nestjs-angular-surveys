import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { QuestionStatisticDto } from './question-statistics.dto';

@ApiExtraModels(QuestionStatisticDto)
export class SurveyStatisticsDto {
  public submittedSurveys: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      $ref: getSchemaPath(QuestionStatisticDto),
    },
  })
  public questionStatistics: Record<string, QuestionStatisticDto>;
}
