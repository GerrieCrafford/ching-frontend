import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { BudgetAssignmentListComponent } from './budget-assignment-list/budget-assignment-list.component';
import { BudgetAssignmentCreatorComponent } from './budget-assignment-creator/budget-assignment-creator.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'budget-assignment', component: BudgetAssignmentListComponent },
  { path: 'create-test', component: BudgetAssignmentCreatorComponent },
];

@NgModule({
  declarations: [],
  imports: [[RouterModule.forRoot(routes)]],
  exports: [RouterModule],
})
export class AppRoutingModule {}
