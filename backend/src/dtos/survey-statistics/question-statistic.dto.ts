import { QuestionStatistic } from 'common';

export class QuestionStatisticDto implements QuestionStatistic {
  public totalAnswers: number;
  public noAnswers: number;
  public commonAnswers: string[];
}
