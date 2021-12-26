import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { SubmissionAnswersEntity } from './submission-answers.entity';
import { SurveyEntity } from './survey.entity';

@Entity()
export class SurveySubmissionEntity {
  @PrimaryGeneratedColumn('uuid')
  public identifier: string;

  @CreateDateColumn()
  public createdAt: string;

  @Column({
    type: 'simple-json',
  })
  public answers: SubmissionAnswersEntity;

  @ManyToOne(() => SurveyEntity, (survey) => survey.questions)
  public survey: SurveyEntity;
}
