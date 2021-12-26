import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NumberQuestionMetadata,
  QuestionMetadataType,
  SubmissionAnswers,
  Survey,
  SurveyDisplayFormat,
  SurveyQuestion,
  SurveySubmission,
  TextQuestionMetadata,
} from 'common';
import { catchError, of } from 'rxjs';
import { AuthQueryParam } from '../../../authenticate/authenticate.models';
import { FetchService } from '../../../fetch/fetch.service';
import { SummaryQueryParams } from '../complete.models';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent {
  public readonly survey: Survey;
  public readonly formGroup: FormGroup;

  public currentQuestionIndex: number;

  public readonly ESurveyDisplayFormat: typeof SurveyDisplayFormat;
  public readonly EQuestionMetadataType: typeof QuestionMetadataType;

  public constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    private readonly fetchService: FetchService,
    private readonly router: Router,
  ) {
    this.survey = this.activatedRoute.snapshot.data['survey'];
    this.formGroup = this.createFormGroup();

    this.currentQuestionIndex = 0;

    this.ESurveyDisplayFormat = SurveyDisplayFormat;
    this.EQuestionMetadataType = QuestionMetadataType;
  }

  public get currentQuestionIdentifier(): string {
    return this.survey.questions[this.currentQuestionIndex].identifier;
  }

  public navigateBack(): void {
    return this.location.back();
  }

  public onFormSubmitHandler(): void {
    const model: SubmissionAnswers = this.stringifyFormGroupRawValue();
    this.fetchService
      .submitAnswers$(this.survey.identifier, model)
      .pipe(catchError(() => of(null)))
      .subscribe(this.afterSurveySubmitHandler.bind(this));
  }

  public isSingleSelectCheckboxChecked(
    question: SurveyQuestion,
    answer: string,
  ): boolean {
    const control: AbstractControl =
      this.formGroup.controls[question.identifier];
    return control.value === answer;
  }

  public onSingleSelectCheckboxValueChange(
    question: SurveyQuestion,
    answer: string,
  ): void {
    const control: AbstractControl =
      this.formGroup.controls[question.identifier];

    if (control.value === answer) {
      control.setValue(null);
    } else {
      control.setValue(answer);
    }
  }

  public isMultiSelectCheckboxChecked(
    question: SurveyQuestion,
    answer: string,
  ): boolean {
    const control: AbstractControl =
      this.formGroup.controls[question.identifier];
    return control.value?.includes(answer);
  }

  public onMultiSelectCheckboxValueChange(
    question: SurveyQuestion,
    answer: string,
  ): void {
    const control: AbstractControl =
      this.formGroup.controls[question.identifier];
    let controlValue: string[] | null = control.value;

    if (!controlValue) {
      controlValue = [answer];
    } else if (!controlValue.includes(answer)) {
      controlValue.push(answer);
    } else {
      const answerIndex: number = controlValue.indexOf(answer);
      controlValue.splice(answerIndex, 1);
    }

    control.setValue(controlValue);
  }

  private stringifyFormGroupRawValue(): SubmissionAnswers {
    const submissionAnswers: SubmissionAnswers = {};
    const rawModel: Record<string, unknown> = this.formGroup.getRawValue();

    for (const question of this.survey.questions) {
      const rawValue: unknown = rawModel[question.identifier];
      const value: string | null = this.stringifyQuestionAnswer(rawValue);
      if (value !== null) {
        submissionAnswers[question.identifier] = value;
      }
    }

    return submissionAnswers;
  }

  private stringifyQuestionAnswer(answer: unknown): string | null {
    if (typeof answer === 'string') {
      return answer;
    } else if (typeof answer === 'number') {
      return answer.toString();
    } else if (answer instanceof Date) {
      return answer.toISOString();
    } else if (answer instanceof Array) {
      return JSON.stringify(answer);
    } else {
      return null;
    }
  }

  private afterSurveySubmitHandler(submission: SurveySubmission | null): void {
    if (!submission) {
      this.matSnackBar.open(
        'Oops. It looks like something went wrong',
        'Close',
        {
          duration: 5_000,
        },
      );
    } else {
      const summaryQueryParams: SummaryQueryParams = {
        [AuthQueryParam.SurveyIdentifier]: this.survey.identifier,
        [AuthQueryParam.SubmissionIndentifier]: submission.identifier,
      };

      this.router.navigate(['summary'], {
        relativeTo: this.activatedRoute,
        queryParams: summaryQueryParams,
      });
    }
  }

  private createFormGroup(): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({});

    for (const question of this.survey.questions) {
      const formControl: AbstractControl =
        this.createQuestionFormControl(question);
      formGroup.addControl(question.identifier, formControl);
    }

    return formGroup;
  }

  private createQuestionFormControl(question: SurveyQuestion): AbstractControl {
    const formControl: FormControl = new FormControl();

    const validators: ValidatorFn[] = this.createQuestionValidators(question);
    formControl.addValidators(validators);

    return formControl;
  }

  private createQuestionValidators(question: SurveyQuestion): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (question.isRequired) {
      validators.push(Validators.required);
    }

    if (question.metadata.type === QuestionMetadataType.EmailText) {
      validators.push(Validators.email);
    }

    switch (question.metadata.type) {
      case QuestionMetadataType.PlainText:
      case QuestionMetadataType.EmailText:
      case QuestionMetadataType.AreaText: {
        const textValidators: ValidatorFn[] = this.createTextQuestionValidators(
          question.metadata,
        );
        validators.push(...textValidators);
        break;
      }
      case QuestionMetadataType.StandartNumber: {
        const numberValidators: ValidatorFn[] =
          this.createNumberQuestionValidators(question.metadata);
        validators.push(...numberValidators);
        break;
      }
    }

    return validators;
  }

  private createTextQuestionValidators(
    metadata: TextQuestionMetadata,
  ): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (metadata.minimumLength) {
      const minLengthValidator: ValidatorFn = Validators.minLength(
        metadata.minimumLength,
      );
      validators.push(minLengthValidator);
    }
    if (metadata.maximumLength) {
      const maxLengthValidator: ValidatorFn = Validators.maxLength(
        metadata.maximumLength,
      );
      validators.push(maxLengthValidator);
    }

    return validators;
  }

  private createNumberQuestionValidators(
    metadata: NumberQuestionMetadata,
  ): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (metadata.minimumValue) {
      const minValueValidator: ValidatorFn = Validators.min(
        metadata.minimumValue,
      );
      validators.push(minValueValidator);
    }
    if (metadata.maximumValue) {
      const maxValueValidator: ValidatorFn = Validators.max(
        metadata.maximumValue,
      );
      validators.push(maxValueValidator);
    }

    return validators;
  }
}
