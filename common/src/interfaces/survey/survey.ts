import { SurveyDisplayFormat } from '../..';
import { SurveyQuestion } from './survey-question';

export interface Survey {
  identifier: string;
  authenticationToken: string;
  createdAt: string;
  publicStatistics: boolean;
  displayFormat: SurveyDisplayFormat;
  submittableFrom: string | null;
  submittableTo: string | null;
  maximumSubmissions: number | null;
  questions: SurveyQuestion[];
}
