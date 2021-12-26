import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveyQuestionEntity } from '../entities/survey-question.entity';
import { SurveySubmissionEntity } from '../entities/survey-submission.entity';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';

@Module({
  controllers: [SurveysController],
  providers: [SurveysService],
  imports: [
    TypeOrmModule.forFeature([
      SurveySubmissionEntity,
      SurveyQuestionEntity,
      SurveyEntity,
    ]),
  ],
})
export class SurveysModule {}
