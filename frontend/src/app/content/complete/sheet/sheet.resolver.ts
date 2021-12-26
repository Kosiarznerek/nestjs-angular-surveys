import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Survey } from 'common';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthenticateOutputQueryParams } from '../../../authenticate/authenticate.models';
import { FetchService } from '../../../fetch/fetch.service';

@Injectable({
  providedIn: 'root',
})
export class SheetResolverService implements Resolve<Survey> {
  public constructor(
    private readonly router: Router,
    private readonly fetchService: FetchService,
  ) {}

  public resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<Survey> {
    const queryParams: AuthenticateOutputQueryParams =
      routeSnapshot.queryParams;

    if (!queryParams.surveyIdendifier) {
      this.router.navigate([`/error/${HttpStatusCode.BadRequest}`]);
      return of();
    } else {
      return this.fetchService
        .findOne$(queryParams.surveyIdendifier)
        .pipe(catchError((error: unknown) => this.handleError(error)));
    }
  }

  private handleError(error: unknown): Observable<Survey> {
    if (error instanceof HttpErrorResponse) {
      this.router.navigate([`/error/${error.status}`]);
    } else {
      this.router.navigate([`/error/${HttpStatusCode.ExpectationFailed}`]);
    }

    return of();
  }
}
