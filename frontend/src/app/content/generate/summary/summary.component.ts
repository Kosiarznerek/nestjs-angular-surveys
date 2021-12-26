import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SummaryQueryParams } from '../generate.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  public readonly queryParams$: Observable<SummaryQueryParams>;

  public constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.queryParams$ = <Observable<SummaryQueryParams>>(
      this.activatedRoute.queryParams
    );
  }

  public navigateHome(): Promise<boolean> {
    return this.router.navigate(['/']);
  }

  public createAnotherSurvey(): Promise<boolean> {
    return this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
    });
  }
}
