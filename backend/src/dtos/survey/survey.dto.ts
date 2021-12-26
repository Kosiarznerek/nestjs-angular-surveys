import { SurveyDisplayFormat } from '../../enums/survey-display-format.enum';
import { SurveyQustionDto } from './survey-question.dto';

export class SurveyDto {
  public identifier: string;
  public authenticationToken: string;
  public createdAt: string;
  public publicStatistics: boolean;
  public displayFormat: SurveyDisplayFormat;
  public submittableFrom: string | null;
  public submittableTo: string | null;
  public maximumSubmissions: number | null;
  public questions: SurveyQustionDto[];
}
