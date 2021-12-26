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
import { ArchiveResolverResult } from './archive.model';

@Injectable({
  providedIn: 'root',
})
export class ArchiveResolverService implements Resolve<ArchiveResolverResult> {
  public constructor(
    private readonly router: Router,
    private readonly fetchService: FetchService,
  ) {}

  public resolve(
    routeSnapshot: ActivatedRouteSnapshot,
  ): Observable<ArchiveResolverResult> {
    const queryParams: Params = routeSnapshot.queryParams;

    const surveyIdParam: string = AuthQueryParam.SurveyIdentifier;
    const submissionIdParam: string = AuthQueryParam.SubmissionIndentifier;

    const surveyId: string | undefined = queryParams[surveyIdParam];
    const submissionId: string | undefined = queryParams[submissionIdParam];

    if (!surveyId || !submissionId) {
      this.router.navigate([`/error/${HttpStatusCode.BadRequest}`]);
      return of();
    } else {
      return forkJoin([
        this.fetchService.findOne$(surveyId),
        this.fetchService.findOneSubmission$(surveyId, submissionId),
      ])
        .pipe(catchError((error: unknown) => this.handleError(error)))
        .pipe(
          map(([survey, surveySubmission]) => ({
            survey,
            surveySubmission,
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
