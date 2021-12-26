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

  public canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
  ): Observable<boolean> {
    const queryParams: Params = activatedRouteSnapshot.queryParams;

    const surveyIdQueryParam: string = AuthQueryParam.SurveyIdentifier;
    const authTokenQueryParam: string = AuthQueryParam.SurveyAuthToken;

    const identifier: string = queryParams[surveyIdQueryParam];
    const authenticationToken: string = queryParams[authTokenQueryParam];

    return this.fetchService
      .findAllSubmissions$(identifier, authenticationToken)
      .pipe(
        catchError(() =>
          this.router.navigate([`/error/${HttpStatusCode.BadRequest}`]),
        ),
        mapTo(true),
      );
  }
}
