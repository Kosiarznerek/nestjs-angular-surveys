import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateInputQueryParams } from '../authenticate/authenticate.models';

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
    const queryParams: AuthenticateInputQueryParams = {
      redirectTo: '/surveys/complete',
      requireSurveyIdendifier: true,
    };

    return this.router.navigate(['/authenticate'], { queryParams });
  }

  public navigateResults(): Promise<boolean> {
    const queryParams: AuthenticateInputQueryParams = {
      redirectTo: '/surveys/results',
      requireSurveyIdendifier: true,
      requiredSurveyAuthenticationToken: true,
    };

    return this.router.navigate(['/authenticate'], { queryParams });
  }

  public navigateArchive(): Promise<boolean> {
    const queryParams: AuthenticateInputQueryParams = {
      redirectTo: '/surveys/archive',
      requireSurveyIdendifier: true,
    };

    return this.router.navigate(['/authenticate'], { queryParams });
  }
}
