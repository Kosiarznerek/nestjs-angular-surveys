import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthenticationConfiguration,
  AuthQueryParam,
} from './authenticate.models';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent {
  public readonly formGroup: FormGroup;
  public readonly configuration: AuthenticationConfiguration;
  public readonly EAuthQueryParam: typeof AuthQueryParam;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router,
  ) {
    this.configuration = <AuthenticationConfiguration>(
      this.activatedRoute.snapshot.queryParams
    );
    this.formGroup = this.createFormGroup();
    this.EAuthQueryParam = AuthQueryParam;
  }

  public navigateBack(): void {
    this.location.back();
  }

  public get hasSurveyidentifier(): boolean {
    const { outputQueryParams } = this.configuration;
    return outputQueryParams.includes(AuthQueryParam.SurveyIdentifier);
  }

  public get hasSurveyAuthenticationToken(): boolean {
    const { outputQueryParams } = this.configuration;
    return outputQueryParams.includes(AuthQueryParam.SurveyAuthToken);
  }

  public get hasSubmissionIndentifier(): boolean {
    const { outputQueryParams } = this.configuration;
    return outputQueryParams.includes(AuthQueryParam.SubmissionIndentifier);
  }

  public onFormSubmitHandler(): void {
    if (this.formGroup.invalid) {
      this.matSnackBar.open('Invallid form value', 'Close', {
        duration: 5_000,
      });
    } else {
      const queryParams: Record<string, string> = this.formGroup.getRawValue();
      this.router.navigate([this.configuration.redirectTo], { queryParams });
    }
  }

  private createFormGroup(): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({});

    for (const queryParamName of this.configuration.outputQueryParams) {
      const formControl: FormControl = new FormControl(
        undefined,
        this.createUUIDValidatorFn(),
      );
      formGroup.addControl(queryParamName, formControl);
    }

    return formGroup;
  }

  private createUUIDValidatorFn(): ValidatorFn {
    return Validators.pattern(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  }
}
