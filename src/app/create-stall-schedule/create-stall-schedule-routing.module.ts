import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  CreateStallScheduleComponent
} from './create-stall-schedule.component';

const routes: Routes = [
  { path: '', component: CreateStallScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateStallScheduleRoutingModule { }
