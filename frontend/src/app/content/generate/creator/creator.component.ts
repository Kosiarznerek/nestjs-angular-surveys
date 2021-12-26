import { Component, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateSurvey,
  QuestionMetadataType,
  Survey,
  SurveyDisplayFormat,
} from 'common';
import { catchError, mapTo, of, startWith, Subject, takeUntil } from 'rxjs';
import { FetchService } from '../../../fetch/fetch.service';
import { SummaryQueryParams } from '../generate.model';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss'],
})
export class CreatorComponent implements OnDestroy {
  public readonly formGroup: FormGroup;

  public readonly ESurveyDisplayFormat: typeof SurveyDisplayFormat;
  public readonly EQuestionMetadataType: typeof QuestionMetadataType;

  private readonly ngOnDestroy$: Subject<void>;

  private static readonly minimumQuestions: number = 3;
  private static readonly minimumSelectValues: number = 2;

  public constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    private readonly fetchService: FetchService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.ngOnDestroy$ = new Subject<void>();
    this.formGroup = this.createFormGroup();

    this.ESurveyDisplayFormat = SurveyDisplayFormat;
    this.EQuestionMetadataType = QuestionMetadataType;
  }

  public ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  public get questionsFormArray(): FormArray {
    return <FormArray>this.formGroup.get('questions');
  }

  public get questionsFormGroups(): FormGroup[] {
    return <FormGroup[]>this.questionsFormArray.controls;
  }

  public shouldDisplayTextMetadata(formGroup: FormGroup): boolean {
    const questionType: QuestionMetadataType = this.getMetadataType(formGroup);
    return this.isTextQuestion(questionType);
  }

  public shouldDisplayNumberMetadata(formGroup: FormGroup): boolean {
    const questionType: QuestionMetadataType = this.getMetadataType(formGroup);
    return this.isNumberQuestion(questionType);
  }

  public shouldDisplayDateMetadata(formGroup: FormGroup): boolean {
    const questionType: QuestionMetadataType = this.getMetadataType(formGroup);
    return this.isDateQuestion(questionType);
  }

  public shouldDisplaySelectMetadata(formGroup: FormGroup): boolean {
    const questionType: QuestionMetadataType = this.getMetadataType(formGroup);
    return this.isSelectQuestion(questionType);
  }

  public getSelectAvailableValues(formGroup: FormGroup): FormArray {
    return <FormArray>formGroup.get('metadata.availableValues');
  }

  public removeSelectAvailableValue(formGroup: FormGroup, index: number): void {
    const formArray: FormArray = this.getSelectAvailableValues(formGroup);

    if (formArray.controls.length <= CreatorComponent.minimumSelectValues) {
      this.openMatSnackBar(
        `There should be minumum ${CreatorComponent.minimumSelectValues} values`,
      );
    } else {
      formArray.controls.splice(index, 1);
    }
  }

  public addSelectAvailableValue(formGroup: FormGroup): void {
    const formArray: FormArray = this.getSelectAvailableValues(formGroup);
    const formControl: FormControl = this.createSelectAvailableValueControl();
    formArray.push(formControl);
  }

  public addQuestion(): void {
    const formGroup: FormGroup = this.createQuestionFormGroup();
    this.questionsFormArray.push(formGroup);
  }

  public removeQuestion(index: number): void {
    if (this.questionsFormArray.length <= CreatorComponent.minimumQuestions) {
      this.openMatSnackBar(
        `There should be minumum ${CreatorComponent.minimumQuestions} questions`,
      );
    } else {
      this.questionsFormArray.removeAt(index);
    }
  }

  public duplicateQuestion(index: number): void {
    const formGroup: FormGroup = this.createQuestionFormGroup();
    const templateValue: any = this.questionsFormGroups[index].getRawValue();
    formGroup.patchValue(templateValue);
    this.questionsFormArray.insert(index, formGroup);
  }

  public onFormSubmitHandler(): void {
    const model: CreateSurvey = this.formGroup.getRawValue();
    this.fetchService
      .create$(model)
      .pipe(catchError(() => of(null)))
      .subscribe(this.afterSurveySubmitHandler.bind(this));
  }

  private afterSurveySubmitHandler(survey: Survey | null): void {
    if (!survey) {
      this.openMatSnackBar('Oops. It looks like something went wrong');
    } else {
      const summaryQueryParams: SummaryQueryParams = {
        identifier: survey.identifier,
        authenticationToken: survey.authenticationToken,
      };

      this.router.navigate(['summary'], {
        relativeTo: this.activatedRoute,
        queryParams: summaryQueryParams,
      });
    }
  }

  private createSelectAvailableValueControl(): FormControl {
    return new FormControl(
      undefined,
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(400),
      ]),
    );
  }

  private isTextQuestion(questionType: QuestionMetadataType): boolean {
    return [
      QuestionMetadataType.PlainText,
      QuestionMetadataType.EmailText,
      QuestionMetadataType.AreaText,
    ].includes(questionType);
  }

  private isNumberQuestion(questionType: QuestionMetadataType): boolean {
    return questionType === QuestionMetadataType.StandartNumber;
  }

  private isDateQuestion(questionType: QuestionMetadataType): boolean {
    return questionType === QuestionMetadataType.DatePicker;
  }

  private isSelectQuestion(questionType: QuestionMetadataType): boolean {
    return [
      QuestionMetadataType.SingleSelectRadio,
      QuestionMetadataType.SingleSelectCheckbox,
      QuestionMetadataType.SingleSelectDropdown,
      QuestionMetadataType.MultiSelectCheckbox,
      QuestionMetadataType.MultiSelectDropdown,
    ].includes(questionType);
  }

  private openMatSnackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.matSnackBar.open(message, 'Close', {
      duration: 5_000,
    });
  }

  private getMetadataType(formGroup: FormGroup): QuestionMetadataType {
    const metadata: FormGroup = <FormGroup>formGroup.controls['metadata'];
    return metadata.controls['type'].value;
  }

  private onQuestionsFormArrayChange(questions: FormGroup[]): void {
    for (let index = 0; index < questions.length; index++) {
      const question: FormGroup = questions[index];
      const formControl: FormControl = new FormControl(index + 1);
      question.addControl('orderIndex', formControl, {
        emitEvent: false,
      });
    }
  }

  private createFormGroup(): FormGroup {
    const questionsFormArray: FormArray = this.formBuilder.array([]);
    questionsFormArray.valueChanges
      .pipe(
        takeUntil(this.ngOnDestroy$),
        mapTo(<FormGroup[]>questionsFormArray.controls),
      )
      .subscribe((questions) => this.onQuestionsFormArrayChange(questions));

    for (let i = 0; i < CreatorComponent.minimumQuestions; i++) {
      const formGroup: FormGroup = this.createQuestionFormGroup();
      questionsFormArray.push(formGroup);
    }

    return this.formBuilder.group({
      publicStatistics: [true, Validators.required],
      displayFormat: [SurveyDisplayFormat.AllAtOnce, Validators.required],
      submittableFrom: [undefined],
      submittableTo: [undefined],
      maximumSubmissions: [undefined, Validators.min(1)],
      questions: questionsFormArray,
    });
  }

  private createQuestionFormGroup(): FormGroup {
    return this.formBuilder.group({
      label: [
        undefined,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(400),
        ]),
      ],
      isRequired: [true, Validators.required],
      timeLimitInSeconds: [undefined, Validators.min(1)],
      metadata: this.createMetadataFormGroup(),
    });
  }

  private createMetadataFormGroup(): FormGroup {
    const typeFormControl: FormControl = new FormControl(
      QuestionMetadataType.PlainText,
      Validators.required,
    );

    const metadataFormGroup: FormGroup = this.formBuilder.group({
      type: typeFormControl,
    });

    typeFormControl.valueChanges
      .pipe(startWith(null), takeUntil(this.ngOnDestroy$))
      .subscribe(() => {
        this.onMetadataTypeChange(metadataFormGroup);
      });

    return metadataFormGroup;
  }

  private onMetadataTypeChange(formGroup: FormGroup): void {
    const typeFormControl: FormControl = <FormControl>formGroup.get('type');
    const questionMetadataType: QuestionMetadataType = typeFormControl.value;

    Object.keys(formGroup.controls)
      .filter((controlName) => controlName !== 'type')
      .forEach((controlName) => formGroup.removeControl(controlName));

    if (this.isTextQuestion(questionMetadataType)) {
      this.addTextQuestionMetadataControls(formGroup);
    } else if (this.isNumberQuestion(questionMetadataType)) {
      this.addNumberQuestionMetadataControls(formGroup);
    } else if (this.isDateQuestion(questionMetadataType)) {
      this.addDateQuestionMetadataControls(formGroup);
    } else if (this.isSelectQuestion(questionMetadataType)) {
      this.addSelectQuestionMetadataControls(formGroup);
    }
  }

  private addTextQuestionMetadataControls(formGroup: FormGroup): void {
    const minimumLength: FormControl = new FormControl(
      undefined,
      Validators.min(1),
    );
    const maximumLength: FormControl = new FormControl(
      undefined,
      Validators.min(1),
    );

    formGroup.addControl('minimumLength', minimumLength);
    formGroup.addControl('maximumLength', maximumLength);
  }

  private addNumberQuestionMetadataControls(formGroup: FormGroup): void {
    const minimumValue: FormControl = new FormControl();
    const maximumValue: FormControl = new FormControl();

    formGroup.addControl('minimumValue', minimumValue);
    formGroup.addControl('maximumValue', maximumValue);
  }

  private addDateQuestionMetadataControls(formGroup: FormGroup): void {
    const minimumISODate: FormControl = new FormControl();
    const maximumISODate: FormControl = new FormControl();

    formGroup.addControl('minimumISODate', minimumISODate);
    formGroup.addControl('maximumISODate', maximumISODate);
  }

  private addSelectQuestionMetadataControls(formGroup: FormGroup): void {
    const formArray: FormArray = this.formBuilder.array([]);

    for (let i = 0; i < CreatorComponent.minimumSelectValues; i++) {
      const formControl: FormControl = this.createSelectAvailableValueControl();
      formArray.push(formControl);
    }

    formGroup.addControl('availableValues', formArray);
  }
}
