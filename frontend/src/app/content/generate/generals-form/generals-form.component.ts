import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generals-form',
  templateUrl: './generals-form.component.html',
  styleUrls: ['./generals-form.component.scss'],
})
export class GeneralsFormComponent {
  public readonly formGroup: FormGroup;

  public constructor(private readonly formBuilder: FormBuilder) {
    this.formGroup = this.createFormGroup();
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      publicStatistics: [true, Validators.required],
      displayFormat: ['AllAtOnce', Validators.required],
      submittableFrom: [undefined],
      submittableTo: [undefined],
      maximumSubmissions: [undefined, Validators.min(1)],
    });
  }
}
