import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSurvey, Survey } from 'common';
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

  public findOne$(identifier: string): Observable<Survey> {
    const url: string = `${this.controllerPath}/${identifier}`;
    return this.httpClient.get<Survey>(url);
  }

  public create$(model: CreateSurvey): Observable<Survey> {
    return this.httpClient.post<Survey>(this.controllerPath, model);
  }
}
