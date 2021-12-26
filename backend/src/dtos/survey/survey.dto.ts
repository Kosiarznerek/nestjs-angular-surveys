import { Survey, SurveyDisplayFormat } from 'common';
import { SurveyQuestionDto } from './survey-question.dto';

export class SurveyDto implements Survey {
  public identifier: string;
  public authenticationToken: string;
  public createdAt: string;
  public publicStatistics: boolean;
  public displayFormat: SurveyDisplayFormat;
  public submittableFrom: string | null;
  public submittableTo: string | null;
  public maximumSubmissions: number | null;
  public questions: SurveyQuestionDto[];
}
