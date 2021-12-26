import { HttpStatusCode } from '@angular/common/http';
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
    path: 'error',
    loadChildren: () =>
      import('./error/error.module').then(({ ErrorModule }) => ErrorModule),
  },
  {
    path: '**',
    redirectTo: `error/${HttpStatusCode.NotFound}`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
