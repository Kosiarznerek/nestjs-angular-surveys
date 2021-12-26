import { Survey, SurveySubmission } from 'common';

export interface ArchiveResolverResult {
  survey: Survey;
  surveySubmission: SurveySubmission;
}

export interface ArchiveRouteData {
  data: ArchiveResolverResult;
}
