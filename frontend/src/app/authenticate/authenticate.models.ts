export enum AuthQueryParam {
  SurveyIdentifier = 'surveyidentifier',
  SubmissionIndentifier = 'submissionIndentifier',
  SurveyAuthToken = 'surveyAuthenticationToken',
}

export interface AuthenticationConfiguration {
  redirectTo: string;
  outputQueryParams: AuthQueryParam[];
}
