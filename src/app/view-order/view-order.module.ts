import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  ViewOrderRoutingModule
} from './view-order-routing.module';
import {
  SharedModule
} from 'src/shared/shared.module';
import {
  ReactiveFormsModule
} from '@angular/forms';
import {
  ViewOrderComponent
} from './view-order.component';


@NgModule({
  declarations: [
    ViewOrderComponent
  ],
  imports: [
    CommonModule,
    ViewOrderRoutingModule,
    SharedModule,

    ReactiveFormsModule
  ]
})
export class ViewOrderModule { }
