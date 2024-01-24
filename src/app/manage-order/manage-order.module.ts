import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrderRoutingModule } from './manage-order-routing.module';
import { ManageOrderComponent } from './manage-order.component';
import { SharedModule } from 'src/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageOrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManageOrderRoutingModule,

    ReactiveFormsModule
  ]
})
export class ManageOrderModule { }
