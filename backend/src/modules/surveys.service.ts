import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from '../dtos/create-survey/create-survey.dto';
import { SurveyEntity } from '../entities/survey.entity';

@Injectable()
export class SurveysService {
  public constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
  ) {}

  public createSurvey(model: CreateSurveyDto) {
    return this.surveyRepository.save(model);
  }
}
