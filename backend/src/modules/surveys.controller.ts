import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSurveyDto } from '../dtos/create-survey/create-survey.dto';
import { SurveyDto } from '../dtos/survey/survey.dto';
import { SurveysService } from './surveys.service';

@ApiTags('surveys')
@Controller('surveys')
export class SurveysController {
  public constructor(private readonly surveysService: SurveysService) {}

  @Post()
  public createSurvey(@Body() body: CreateSurveyDto): Promise<SurveyDto> {
    return this.surveysService.createSurvey(body);
  }
}
