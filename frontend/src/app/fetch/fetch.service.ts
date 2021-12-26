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
  private readonly controller: string;

  public constructor(private readonly httpClient: HttpClient) {
    this.origin = 'http://localhost:3000';
    this.controller = 'surveys';
  }

  public create$(model: CreateSurvey): Observable<Survey> {
    const url: string = `${this.origin}/${this.controller}`;
    return this.httpClient.post<Survey>(url, model);
  }
}
