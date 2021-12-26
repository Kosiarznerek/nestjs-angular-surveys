import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateRoutingModule } from './generate.routing';
import { GenerateComponent } from './generate.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchModule } from '../../fetch/fetch.module';

@NgModule({
  declarations: [GenerateComponent],
  imports: [
    CommonModule,
    GenerateRoutingModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FetchModule,
  ],
})
export class GenerateModule {}
