import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetComponent } from './sheet/sheet.component';
import { SheetResolverService } from './sheet/sheet.resolver';
import { SummaryComponent } from './summary/summary.component';
import { SummaryGuard } from './summary/summary.guard';

const routes: Routes = [
  {
    path: '',
    resolve: {
      survey: SheetResolverService,
    },
    component: SheetComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
    canActivate: [SummaryGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteRoutingModule {}
