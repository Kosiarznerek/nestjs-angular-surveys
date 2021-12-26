import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router,
  Params,
} from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { AuthQueryParam } from '../../authenticate/authenticate.models';
import { FetchService } from '../../fetch/fetch.service';
import { ResultsResolverResult } from './results.model';

@Injectable({
  providedIn: 'root',
})
export class ResultsResolverService implements Resolve<ResultsResolverResult> {
  public constructor(
    private readonly router: Router,
    private readonly fetchService: FetchService,
  ) {}

  public resolve(
    routeSnapshot: ActivatedRouteSnapshot,
  ): Observable<ResultsResolverResult> {
    const queryParams: Params = routeSnapshot.queryParams;

    const surveyIdParam: string = AuthQueryParam.SurveyIdentifier;
    const surveyTokenParam: string = AuthQueryParam.SurveyAuthToken;

    const surveyId: string | undefined = queryParams[surveyIdParam];
    const surveyToken: string | undefined = queryParams[surveyTokenParam];

    if (!surveyId || !surveyToken) {
      this.router.navigate([`/error/${HttpStatusCode.BadRequest}`]);
      return of();
    } else {
      return forkJoin([
        this.fetchService.findOne$(surveyId),
        this.fetchService.getStatistics$(surveyId, surveyToken),
        this.fetchService.findAllSubmissions$(surveyId, surveyToken),
      ])
        .pipe(catchError((error: unknown) => this.handleError(error)))
        .pipe(
          map(([survey, surveyStatistics, surveySubmissions]) => ({
            survey,
            surveyStatistics,
            surveySubmissions,
          })),
        );
    }
  }

  private handleError(error: unknown): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      this.router.navigate([`/error/${error.status}`]);
    } else {
      this.router.navigate([`/error/${HttpStatusCode.ExpectationFailed}`]);
    }

    return of();
  }
}
