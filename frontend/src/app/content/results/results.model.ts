import { Survey, SurveyStatistics, SurveySubmission } from 'common';

export interface ResultsResolverResult {
  survey: Survey;
  surveyStatistics: SurveyStatistics;
  surveySubmissions: SurveySubmission[] | null;
}

export interface ResultsRouteData {
  data: ResultsResolverResult;
}
