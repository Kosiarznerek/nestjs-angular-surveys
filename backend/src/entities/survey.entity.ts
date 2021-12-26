import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { SurveyDisplayFormat } from '../enums/survey-display-format.enum';
import { SurveySubmissionEntity } from './survey-submission.entity';
import { SurveyQuestionEntity } from './survey-question.entity';

@Entity()
export class SurveyEntity {
  @PrimaryGeneratedColumn('uuid')
  public identifier: string;

  @PrimaryGeneratedColumn('uuid')
  public authenticationToken: string;

  @CreateDateColumn()
  public createdAt: string;

  @Column({
    type: 'boolean',
  })
  public publicStatistics: boolean;

  @Column({
    type: 'varchar',
  })
  public displayFormat: SurveyDisplayFormat;

  @Column({
    type: 'date',
    nullable: true,
  })
  public submittableFrom: string | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  public submittableTo: string | null;

  @Column({
    type: 'unsigned big int',
    nullable: true,
  })
  public maximumSubmissions: number | null;

  @OneToMany(() => SurveyQuestionEntity, (questions) => questions.survey, {
    cascade: true,
    eager: true,
  })
  public questions: SurveyQuestionEntity[];

  @OneToMany(() => SurveySubmissionEntity, (answers) => answers.survey)
  public submissions: SurveySubmissionEntity[];
}
