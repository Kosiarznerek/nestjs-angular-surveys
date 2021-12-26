import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationConfiguration,
  AuthQueryParam,
} from '../authenticate/authenticate.models';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  public constructor(private readonly router: Router) {}

  public navigateGenerate(): Promise<boolean> {
    return this.router.navigate(['/surveys/generate']);
  }

  public navigateComplete(): Promise<boolean> {
    const queryParams: AuthenticationConfiguration = {
      redirectTo: '/surveys/complete',
      outputQueryParams: [AuthQueryParam.SurveyIdentifier],
    };

    return this.router.navigate(['/authenticate'], { queryParams });
  }

  public navigateResults(): Promise<boolean> {
    const queryParams: AuthenticationConfiguration = {
      redirectTo: '/surveys/results',
      outputQueryParams: [
        AuthQueryParam.SurveyIdentifier,
        AuthQueryParam.SurveyAuthToken,
      ],
    };

    return this.router.navigate(['/authenticate'], { queryParams });
  }

  public navigateArchive(): Promise<boolean> {
    const queryParams: AuthenticationConfiguration = {
      redirectTo: '/surveys/archive',
      outputQueryParams: [
        AuthQueryParam.SurveyIdentifier,
        AuthQueryParam.SubmissionIndentifier,
      ],
    };

    return this.router.navigate(['/authenticate'], { queryParams });
  }
}
