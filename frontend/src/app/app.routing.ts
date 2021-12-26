import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then(
        ({ LandingModule }) => LandingModule,
      ),
  },
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
    path: 'not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then(
        ({ NotFoundModule }) => NotFoundModule,
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
