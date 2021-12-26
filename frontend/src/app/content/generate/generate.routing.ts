import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatorComponent } from './creator/creator.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {
    path: '',
    component: CreatorComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateRoutingModule {}
