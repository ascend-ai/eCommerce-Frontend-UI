import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  EditStallScheduleComponent
} from './edit-stall-schedule.component';

const routes: Routes = [
  { path: '', component: EditStallScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditStallScheduleRoutingModule { }
