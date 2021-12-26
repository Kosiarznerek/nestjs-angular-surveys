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
    path: 'surveys',
    loadChildren: () =>
      import('./content/content.module').then(
        ({ ContentModule }) => ContentModule,
      ),
  },
  {
    path: 'authenticate',
    loadChildren: () =>
      import('./authenticate/authenticate.module').then(
        ({ AuthenticateModule }) => AuthenticateModule,
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
