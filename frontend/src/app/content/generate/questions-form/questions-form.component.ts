import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { QuestionMetadataType } from 'common';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss'],
})
export class QuestionsFormComponent {
  public readonly formGroup: FormGroup;
  public readonly EQuestionMetadataType: typeof QuestionMetadataType;

  private static readonly minimumQuestions: number = 3;
  private static readonly minimumSelectValues: number = 2;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
  ) {
    this.formGroup = this.createFormGroup();
    this.EQuestionMetadataType = QuestionMetadataType;
  }

  public get questionsFormArray(): FormArray {
    return <FormArray>this.formGroup.get('questions');
  }

  public get questionsFormGroups(): FormGroup[] {
    return <FormGroup[]>this.questionsFormArray.controls
  }

  public isTextQuestion(formGroup: FormGroup): boolean {
    const questionType: QuestionMetadataType = this.getMetadataType(formGroup);
    return [
      QuestionMetadataType.PlainText,
      QuestionMetadataType.EmailText,
      QuestionMetadataType.AreaText,
    ].includes(questionType);
  }

  public isNumberQuestion(formGroup: FormGroup): boolean {
    const questionType: QuestionMetadataType = this.getMetadataType(formGroup);
    return questionType === QuestionMetadataType.StandartNumber;
  }

  public isDateQuestion(formGroup: FormGroup): boolean {
    const questionType: QuestionMetadataType = this.getMetadataType(formGroup);
    return questionType === QuestionMetadataType.DatePicker;
  }

  public isSelectQuestion(formGroup: FormGroup): boolean {
    const questionType: QuestionMetadataType = this.getMetadataType(formGroup);
    return [
      QuestionMetadataType.SingleSelectRadio,
      QuestionMetadataType.SingleSelectCheckbox,
      QuestionMetadataType.SingleSelectDropdown,
      QuestionMetadataType.MultiSelectCheckbox,
      QuestionMetadataType.MultiSelectDropdown,
    ].includes(questionType);
  }

  public getSelectAvailableValues(formGroup: FormGroup): FormArray {
    return <FormArray>formGroup.get('metadata.availableValues');
  }

  public removeSelectAvailableValue(formGroup: FormGroup, index: number): void {
    const formArray: FormArray = this.getSelectAvailableValues(formGroup);

    if (formArray.controls.length <= QuestionsFormComponent.minimumSelectValues) {
      this.openMatSnackBar(`There should be minumum ${QuestionsFormComponent.minimumSelectValues} values`)
    } else {
      formArray.controls.splice(index, 1);
    }
  }

  public addSelectAvailableValue(formGroup: FormGroup): void {
    const formArray: FormArray = this.getSelectAvailableValues(formGroup);
    const formControl: FormControl = new FormControl(undefined, Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(400),
    ]))
    formArray.push(formControl);
  }

  public addQuestion(): void {
    const formGroup: FormGroup = this.createQuestionFormGroup();
    this.questionsFormArray.push(formGroup);
  }

  public removeQuestion(index: number): void {
    if (this.questionsFormArray.length <= QuestionsFormComponent.minimumQuestions) {
      this.openMatSnackBar(`There should be minumum ${QuestionsFormComponent.minimumQuestions} questions`)
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

  private openMatSnackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.matSnackBar.open(message, 'Close', {
      duration: 5_000,
    });
  }

  private getMetadataType(formGroup: FormGroup): QuestionMetadataType {
    const metadata: FormGroup = <FormGroup>formGroup.controls['metadata'];
    return metadata.controls['type'].value;
  }

  private createFormGroup(): FormGroup {
    const questions: FormArray = this.formBuilder.array([]);
    const formGroup: FormGroup = this.formBuilder.group({ questions });

    for (let i = 0; i < QuestionsFormComponent.minimumQuestions; i++) {
      const formGroup: FormGroup = this.createQuestionFormGroup();
      questions.push(formGroup);
    }

    return formGroup;
  }

  private createQuestionFormGroup(): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({
      label: [undefined, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(400),
      ])],
      isRequired: [true, Validators.required],
      timeLimitInSeconds: [undefined, Validators.min(1)],
      metadata: this.formBuilder.group({
        type: [QuestionMetadataType.PlainText, Validators.required],
        minimumLength: [undefined, Validators.min(1)],
        maximumLength: [undefined, Validators.min(1)],
        minimumValue: [undefined],
        maximumValue: [undefined],
        minimumISODate: [undefined],
        maximumISODate: [undefined],
        availableValues: this.formBuilder.array([]),
      }),
    });

    for (let i = 0; i < QuestionsFormComponent.minimumSelectValues; i++) {
      this.addSelectAvailableValue(formGroup);
    }

    return formGroup;
  }
}
