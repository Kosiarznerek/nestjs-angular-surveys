import { SurveySubmission } from 'common';
import { SubmissionAnswersDto } from './submission-answers.dto';

export class SurveySubmissionDto implements SurveySubmission {
  public identifier: string;
  public createdAt: string;
  public answers: SubmissionAnswersDto;
}
