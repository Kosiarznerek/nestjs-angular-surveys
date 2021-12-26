import { CreateQuestionMetadata } from './create-question-metadata';

export interface CreateSurveyQuestion {
  label: string;
  orderIndex: number;
  isRequired: boolean;
  timeLimitInSeconds?: number;
  metadata: CreateQuestionMetadata;
}
