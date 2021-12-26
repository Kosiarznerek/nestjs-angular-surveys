import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveRoutingModule } from './archive.routing';
import { ArchiveComponent } from './archive.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [ArchiveComponent],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    MatCardModule,
    MatDividerModule,
  ],
})
export class ArchiveModule {}
