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
import { AuthenticateOutputQueryParams } from './authenticate.model';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent {
  public readonly formGroup: FormGroup;

  public readonly requireSurveyIdendifier: boolean;
  public readonly requiredSurveyAuthenticationToken: boolean;

  private readonly redirectTo: string;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router,
  ) {
    const { queryParams } = this.activatedRoute.snapshot;

    this.redirectTo = queryParams['redirectTo'];
    this.requireSurveyIdendifier =
      queryParams['requireSurveyIdendifier'] === 'true';
    this.requiredSurveyAuthenticationToken =
      queryParams['requiredSurveyAuthenticationToken'] === 'true';

    this.formGroup = this.createFormGroup();
  }

  public onFormSubmitHandler(): void {
    if (this.formGroup.invalid) {
      this.matSnackBar.open('Invallid form value', 'Close', {
        duration: 5_000,
      });
    } else {
      const queryParams: AuthenticateOutputQueryParams =
        this.formGroup.getRawValue();
      this.router.navigate([this.redirectTo], { queryParams });
    }
  }

  public navigateBack(): void {
    this.location.back();
  }

  private createFormGroup(): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({});

    if (this.requireSurveyIdendifier) {
      const formControl: FormControl = this.createUUIDFormControl();
      formGroup.addControl('surveyIdendifier', formControl);
    }
    if (this.requiredSurveyAuthenticationToken) {
      const formControl: FormControl = this.createUUIDFormControl();
      formGroup.addControl('surveyAuthenticationToken', formControl);
    }

    return formGroup;
  }

  private createUUIDFormControl(): FormControl {
    return new FormControl(
      undefined,
      Validators.compose([Validators.required, this.createUUIDValidatorFn()]),
    );
  }

  private createUUIDValidatorFn(): ValidatorFn {
    return Validators.pattern(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  }
}
