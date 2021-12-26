import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing.routing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, LandingRoutingModule, MatCardModule, MatIconModule],
})
export class LandingModule {}
