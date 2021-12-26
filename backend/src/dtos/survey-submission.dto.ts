import { SubmissionAnswersDto } from './submission-answers.dto';

export class SurveySubmissionDto {
  public identifier: string;
  public createdAt: string;
  public answers: SubmissionAnswersDto;
}
