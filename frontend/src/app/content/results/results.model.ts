import { Survey, SurveyStatistics, SurveySubmission } from 'common';

export interface ResultsResolverResult {
  survey: Survey;
  surveyStatistics: SurveyStatistics;
  surveySubmissions: SurveySubmission[];
}

export interface ResultsRouteData {
  data: ResultsResolverResult;
}
