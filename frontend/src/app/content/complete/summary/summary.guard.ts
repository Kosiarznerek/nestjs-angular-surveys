import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Params,
  Router,
} from '@angular/router';
import { catchError, mapTo, Observable } from 'rxjs';
import { AuthQueryParam } from '../../../authenticate/authenticate.models';
import { FetchService } from '../../../fetch/fetch.service';

@Injectable()
export class SummaryGuard implements CanActivate {
  public constructor(
    private readonly router: Router,
    private readonly fetchService: FetchService,
  ) {}

  public canActivate(snapshot: ActivatedRouteSnapshot): Observable<boolean> {
    const queryParams: Params = snapshot.queryParams;

    const surveyIdQueryParam: string = AuthQueryParam.SurveyIdentifier;
    const submissionIdQueryParam: string = AuthQueryParam.SubmissionIndentifier;

    const surveyId: string = queryParams[surveyIdQueryParam];
    const submissionId: string = queryParams[submissionIdQueryParam];

    return this.fetchService.findOneSubmission$(surveyId, submissionId).pipe(
      catchError(() =>
        this.router.navigate([`/error/${HttpStatusCode.BadRequest}`]),
      ),
      mapTo(true),
    );
  }
}
