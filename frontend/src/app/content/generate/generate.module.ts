import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateRoutingModule } from './generate.routing';
import { GenerateComponent } from './generate.component';

@NgModule({
  declarations: [GenerateComponent],
  imports: [CommonModule, GenerateRoutingModule],
})
export class GenerateModule {}
