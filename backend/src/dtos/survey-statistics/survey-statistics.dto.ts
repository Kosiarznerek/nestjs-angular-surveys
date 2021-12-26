import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { SurveyStatistics } from 'common';
import { QuestionStatisticDto } from './question-statistic.dto';

@ApiExtraModels(QuestionStatisticDto)
export class SurveyStatisticsDto implements SurveyStatistics {
  public submittedSurveys: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      $ref: getSchemaPath(QuestionStatisticDto),
    },
  })
  public questionStatistics: Record<string, QuestionStatisticDto>;
}
