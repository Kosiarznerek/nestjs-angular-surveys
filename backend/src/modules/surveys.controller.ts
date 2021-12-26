import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Survey } from 'common';
import { CreateSurveyDto } from '../dtos/create-survey/create-survey.dto';
import { SurveyStatisticsDto } from '../dtos/survey-statistics/survey-statistics.dto';
import { SubmissionAnswersDto } from '../dtos/survey-submission/submission-answers.dto';
import { SurveySubmissionDto } from '../dtos/survey-submission/survey-submission.dto';
import { SurveyDto } from '../dtos/survey/survey.dto';
import { AuthenticationTokenGuard } from '../guards/authentication-token.guard';
import { SurveyStatisticsGuard } from '../guards/survey-statistics.guard';
import { SubmissionAnswerValidator } from '../validators/submission-answer.validator';
import { SurveysService } from './surveys.service';

@ApiTags('surveys')
@Controller('surveys')
export class SurveysController {
  public constructor(private readonly surveysService: SurveysService) {}

  @Post()
  public create(@Body() body: CreateSurveyDto): Promise<SurveyDto> {
    return this.surveysService.create(body);
  }

  @Get(':surveyIdentifier')
  public async findOne(
    @Param('surveyIdentifier') surveyIdentifier: string,
  ): Promise<SurveyDto> {
    const survey: Survey = await this.surveysService.findOne(surveyIdentifier);
    delete survey.authenticationToken;
    return survey;
  }

  @Get(':surveyIdentifier/statistics')
  @SurveyStatisticsGuard()
  public getStatistics(
    @Param('surveyIdentifier') surveyIdentifier: string,
  ): Promise<SurveyStatisticsDto> {
    return this.surveysService.getStatistics(surveyIdentifier);
  }

  @Post(':surveyIdentifier/submissions')
  @ApiBody({ type: Object })
  @UsePipes(SubmissionAnswerValidator)
  public submitAnswers(
    @Body() answers: SubmissionAnswersDto,
    @Param('surveyIdentifier') surveyIdentifier: string,
  ): Promise<SurveySubmissionDto> {
    return this.surveysService.submitAnswers(surveyIdentifier, answers);
  }

  @Get(':surveyIdentifier/submissions')
  @AuthenticationTokenGuard()
  public findAllSubmissions(
    @Param('surveyIdentifier') surveyIdentifier: string,
  ): Promise<SurveySubmissionDto[]> {
    return this.surveysService.findAllSubmissions(surveyIdentifier);
  }

  @Get(':surveyIdentifier/submissions/:submissionIdentifier')
  public findOneSubmission(
    @Param('surveyIdentifier') surveyIdentifier: string,
    @Param('submissionIdentifier') submissionIdentifier: string,
  ): Promise<SurveySubmissionDto> {
    return this.surveysService.findOneSubmission(
      surveyIdentifier,
      submissionIdentifier,
    );
  }
}
