import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ApiHeader, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { isString } from 'class-validator';
import { Repository } from 'typeorm';
import { SurveyEntity } from '../entities/survey.entity';

export const surveyIdentifierParamName: string = 'surveyIdentifier';
export const authenticationTokenHeaderName: string = 'authentication-token';

@Injectable()
export class AuthenticationTokenActivator implements CanActivate {
  public constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const surveyIdentifier: string = this.extractSurveyIdentifier(context);
    const surveyEntity: SurveyEntity = await this.getSurveyEntity(
      surveyIdentifier,
    );
    this.validateAuthenticationToken(surveyEntity, context);
    return true;
  }

  protected validateAuthenticationToken(
    surveyEntity: SurveyEntity,
    context: ExecutionContext,
  ): void {
    const authenticationToken: string =
      this.extractAuthenticationToken(context);
    if (surveyEntity.authenticationToken !== authenticationToken) {
      throw new UnauthorizedException('Invalid authentication token');
    }
  }

  protected extractSurveyIdentifier(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const surveyIdentifier: string = request.params[surveyIdentifierParamName];

    if (!isString(surveyIdentifier)) {
      throw new UnauthorizedException(
        'Survey identifier in param is not string',
      );
    }

    return surveyIdentifier;
  }

  protected async getSurveyEntity(identifier: string): Promise<SurveyEntity> {
    const surveyEntity: SurveyEntity = await this.surveyRepository.findOne({
      identifier,
    });

    if (!surveyEntity) {
      throw new NotFoundException(
        `Survey with identifier '${identifier}' does not exists`,
      );
    }

    return surveyEntity;
  }

  private extractAuthenticationToken(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const authenticationToken: string =
      request.headers[authenticationTokenHeaderName];

    if (!isString(authenticationToken)) {
      throw new UnauthorizedException(
        'Survey authentication token in headers is not string',
      );
    }

    return authenticationToken;
  }
}

export const AuthenticationTokenGuard = () =>
  applyDecorators(
    UseGuards(AuthenticationTokenActivator),
    ApiParam({ name: surveyIdentifierParamName }),
    ApiHeader({ name: authenticationTokenHeaderName, required: true }),
    ApiUnauthorizedResponse({
      description: 'Survey authentication token is required for this route',
    }),
  );
