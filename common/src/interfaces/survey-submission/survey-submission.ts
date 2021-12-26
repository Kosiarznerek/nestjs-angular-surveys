import { SubmissionAnswers } from './submission-answers';

export interface SurveySubmission {
  identifier: string;
  createdAt: string;
  answers: SubmissionAnswers;
}
