import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { QuestionMetadataEntity } from './question-metadata.entity';
import { SurveyEntity } from './survey.entity';

@Entity()
export class SurveyQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  public identifier: string;

  @Column({
    type: 'text',
    length: 400,
  })
  public label: string;

  @Column({
    type: 'unsigned big int',
  })
  public orderIndex: number;

  @Column({
    type: 'boolean',
  })
  public isRequired: boolean;

  @Column({
    type: 'unsigned big int',
    nullable: true,
  })
  public timeLimitInSeconds: number | null;

  @Column({
    type: 'simple-json',
  })
  public metadata: QuestionMetadataEntity;

  @ManyToOne(() => SurveyEntity, (survey) => survey.questions)
  public survey: SurveyEntity;
}
