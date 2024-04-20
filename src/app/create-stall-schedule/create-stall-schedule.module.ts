import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  CreateStallScheduleRoutingModule
} from './create-stall-schedule-routing.module';
import {
  CreateStallScheduleComponent
} from './create-stall-schedule.component';
import {
  SharedModule
} from 'src/shared/shared.module';
import {
  ReactiveFormsModule
} from '@angular/forms';


@NgModule({
  declarations: [
    CreateStallScheduleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CreateStallScheduleRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateStallScheduleModule { }
