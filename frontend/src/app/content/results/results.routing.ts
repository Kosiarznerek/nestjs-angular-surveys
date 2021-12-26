import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results.component';
import { ResultsResolverService } from './results.resolver';

const routes: Routes = [
  {
    path: '',
    component: ResultsComponent,
    resolve: {
      data: ResultsResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsRoutingModule {}
