import { SurveyDisplayFormat } from '../..';
import { CreateSurveyQuestion } from './create-survey-question';

export interface CreateSurvey {
  publicStatistics: boolean;
  displayFormat: SurveyDisplayFormat;
  submittableFrom?: string;
  submittableTo?: string;
  maximumSubmissions?: number;
  questions: CreateSurveyQuestion[];
}
