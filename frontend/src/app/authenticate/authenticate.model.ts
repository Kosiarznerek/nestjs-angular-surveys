export interface AuthenticateInputQueryParams {
  redirectTo: string;
  requireSurveyIdendifier?: boolean;
  requiredSurveyAuthenticationToken?: boolean;
}

export interface AuthenticateOutputQueryParams {
  surveyIdendifier?: string;
  surveyAuthenticationToken?: string;
}
