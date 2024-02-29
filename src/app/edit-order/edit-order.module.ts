import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  EditOrderRoutingModule
} from './edit-order-routing.module';
import {
  EditOrderComponent
} from './edit-order.component';
import {
  SharedModule
} from 'src/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    EditOrderRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EditOrderModule { }
