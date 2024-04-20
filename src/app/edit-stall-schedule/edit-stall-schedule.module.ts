import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  EditStallScheduleRoutingModule
} from './edit-stall-schedule-routing.module';
import {
  EditStallScheduleComponent
} from './edit-stall-schedule.component';
import {
  SharedModule
} from 'src/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditStallScheduleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditStallScheduleRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditStallScheduleModule { }
