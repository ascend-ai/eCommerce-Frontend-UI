import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  ManageStallSchedulesRoutingModule,
} from './manage-stall-schedules-routing.module';
import {
  ManageStallSchedulesComponent,
} from './manage-stall-schedules.component';
import {
  SharedModule
} from 'src/shared/shared.module';


@NgModule({
  declarations: [
    ManageStallSchedulesComponent
  ],
  imports: [
    CommonModule,
    ManageStallSchedulesRoutingModule,
    SharedModule
  ]
})
export class ManageStallSchedulesModule { }
