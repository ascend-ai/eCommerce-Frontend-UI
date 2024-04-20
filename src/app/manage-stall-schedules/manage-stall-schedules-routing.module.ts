import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  ManageStallSchedulesComponent
} from './manage-stall-schedules.component';

const routes: Routes = [
  { path: '', component: ManageStallSchedulesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageStallSchedulesRoutingModule { }
