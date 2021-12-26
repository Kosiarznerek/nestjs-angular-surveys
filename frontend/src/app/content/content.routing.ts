import { HttpStatusCode } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'archive',
        loadChildren: () =>
          import('./archive/archive.module').then(
            ({ ArchiveModule }) => ArchiveModule,
          ),
      },
      {
        path: 'complete',
        loadChildren: () =>
          import('./complete/complete.module').then(
            ({ CompleteModule }) => CompleteModule,
          ),
      },
      {
        path: 'generate',
        loadChildren: () =>
          import('./generate/generate.module').then(
            ({ GenerateModule }) => GenerateModule,
          ),
      },
      {
        path: 'results',
        loadChildren: () =>
          import('./results/results.module').then(
            ({ ResultsModule }) => ResultsModule,
          ),
      },
      {
        path: '**',
        redirectTo: `/error/${HttpStatusCode.NotFound}`,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
