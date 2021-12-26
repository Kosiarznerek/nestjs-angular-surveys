import { QuestionStatistic } from './question-statistic';

export interface SurveyStatistics {
  submittedSurveys: number;
  questionStatistics: Record<string, QuestionStatistic>;
}
