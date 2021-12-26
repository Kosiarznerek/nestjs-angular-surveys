import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateSurvey,
  SubmissionAnswers,
  Survey,
  SurveyStatistics,
  SurveySubmission,
} from 'common';
import { Observable } from 'rxjs';
import { FetchModule } from './fetch.module';

@Injectable({
  providedIn: FetchModule,
})
export class FetchService {
  private readonly origin: string;
  private readonly controllerName: string;
  private readonly controllerPath: string;

  public constructor(private readonly httpClient: HttpClient) {
    this.origin = 'http://localhost:3000';
    this.controllerName = 'surveys';
    this.controllerPath = `${this.origin}/${this.controllerName}`;
  }

  public create$(model: CreateSurvey): Observable<Survey> {
    return this.httpClient.post<Survey>(this.controllerPath, model);
  }

  public findOne$(identifier: string): Observable<Survey> {
    const url: string = `${this.controllerPath}/${identifier}`;
    return this.httpClient.get<Survey>(url);
  }

  public getStatistics$(
    identifier: string,
    authenticationToken?: string,
  ): Observable<SurveyStatistics> {
    const url: string = `${this.controllerPath}/${identifier}/statistics`;

    let headers: HttpHeaders = new HttpHeaders();
    if (authenticationToken) {
      headers = headers.append('authentication-token', authenticationToken);
    }

    return this.httpClient.get<SurveyStatistics>(url, { headers });
  }

  public submitAnswers$(
    identifier: string,
    model: SubmissionAnswers,
  ): Observable<SurveySubmission> {
    const url: string = `${this.controllerPath}/${identifier}/submissions`;
    return this.httpClient.post<SurveySubmission>(url, model);
  }

  public findAllSubmissions$(
    identifier: string,
    authenticationToken: string,
  ): Observable<SurveySubmission[]> {
    const url: string = `${this.controllerPath}/${identifier}/submissions`;

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authentication-token', authenticationToken);

    return this.httpClient.get<SurveySubmission[]>(url, { headers });
  }

  public findOneSubmission$(
    surveyIdentifier: string,
    submissionIdentifier: string,
  ): Observable<SurveySubmission> {
    const url: string = `${this.controllerPath}/${surveyIdentifier}/submissions/${submissionIdentifier}`;
    return this.httpClient.get<SurveySubmission>(url);
  }
}
