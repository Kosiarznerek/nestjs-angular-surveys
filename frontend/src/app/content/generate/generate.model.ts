import { AuthQueryParam } from '../../authenticate/authenticate.models';

export interface SummaryQueryParams {
  [AuthQueryParam.SurveyIdentifier]: string;
  [AuthQueryParam.SurveyAuthToken]: string;
}
