import {
  QuestionMetadataApiExtraModels,
  QuestionMetadataApiProperty,
  QuestionMetadataDto,
} from './question-metadata.dto';

@QuestionMetadataApiExtraModels()
export class SurveyQustionDto {
  public identifier: string;
  public label: string;
  public orderIndex: number;
  public isRequired: boolean;
  public timeLimitInSeconds: number | null;

  @QuestionMetadataApiProperty()
  public metadata: QuestionMetadataDto;
}
