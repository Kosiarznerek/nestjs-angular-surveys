import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthQueryParam } from '../../../authenticate/authenticate.models';
import { SummaryQueryParams } from '../complete.models';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  public readonly queryParams: SummaryQueryParams;
  public readonly EAuthenticationQueryParam: typeof AuthQueryParam;

  public constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.queryParams = <SummaryQueryParams>(
      this.activatedRoute.snapshot.queryParams
    );
    this.EAuthenticationQueryParam = AuthQueryParam;
  }

  public navigateHome(): Promise<boolean> {
    return this.router.navigate(['/']);
  }

  public navigateArchive(): Promise<boolean> {
    return this.router.navigate(['/surveys/archive'], {
      queryParams: this.queryParams,
    });
  }
}
