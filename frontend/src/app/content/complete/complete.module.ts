import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteRoutingModule } from './complete.routing';
import { CompleteComponent } from './complete.component';

@NgModule({
  declarations: [CompleteComponent],
  imports: [CommonModule, CompleteRoutingModule],
})
export class CompleteModule {}
