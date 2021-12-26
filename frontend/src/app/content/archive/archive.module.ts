import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveRoutingModule } from './archive.routing';
import { ArchiveComponent } from './archive.component';
import { FetchModule } from '../../fetch/fetch.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [ArchiveComponent],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    FetchModule,
    MatCardModule,
    MatDividerModule,
  ],
})
export class ArchiveModule {}
