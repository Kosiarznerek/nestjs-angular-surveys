import {
  applyDecorators,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SurveyEntity } from '../entities/survey.entity';
import {
  AuthenticationTokenActivator,
  authenticationTokenHeaderName,
  surveyIdentifierParamName,
} from './authentication-token.guard';

@Injectable()
export class SurveyStatisticsActivator extends AuthenticationTokenActivator {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const surveyIdentifier: string = this.extractSurveyIdentifier(context);
    const surveyEntity: SurveyEntity = await this.getSurveyEntity(
      surveyIdentifier,
    );

    if (surveyEntity.publicStatistics) {
      return true;
    } else {
      this.validateAuthenticationToken(surveyEntity, context);
      return true;
    }
  }
}

export const SurveyStatisticsGuard = () =>
  applyDecorators(
    UseGuards(SurveyStatisticsActivator),
    ApiParam({ name: surveyIdentifierParamName }),
    ApiHeader({ name: authenticationTokenHeaderName }),
    ApiUnauthorizedResponse({
      description: 'Statistics are not public or invalid authentication token',
    }),
  );
