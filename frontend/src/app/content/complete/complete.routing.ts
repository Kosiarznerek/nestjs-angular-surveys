import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteComponent } from './complete.component';
import { CompleteResolverService } from './complete.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      survey: CompleteResolverService,
    },
    component: CompleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteRoutingModule {}
