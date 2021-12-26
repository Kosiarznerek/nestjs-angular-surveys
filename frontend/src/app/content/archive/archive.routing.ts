import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './archive.component';
import { ArchiveResolverService } from './archive.resolver';

const routes: Routes = [
  {
    path: '',
    component: ArchiveComponent,
    resolve: {
      data: ArchiveResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchiveRoutingModule {}
