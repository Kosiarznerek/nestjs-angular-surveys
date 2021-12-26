import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteRoutingModule } from './complete.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SummaryComponent } from './summary/summary.component';
import { SheetComponent } from './sheet/sheet.component';

@NgModule({
  declarations: [SheetComponent, SummaryComponent],
  imports: [
    CommonModule,
    CompleteRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class CompleteModule {}
