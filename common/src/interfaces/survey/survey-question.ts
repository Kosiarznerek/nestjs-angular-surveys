import { QuestionMetadata } from './question-metadata';

export interface SurveyQuestion {
  identifier: string;
  label: string;
  orderIndex: number;
  isRequired: boolean;
  timeLimitInSeconds: number | null;
  metadata: QuestionMetadata;
}
