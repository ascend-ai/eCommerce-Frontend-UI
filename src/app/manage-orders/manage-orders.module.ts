import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrdersRoutingModule } from './manage-orders-routing.module';
import { ManageOrdersComponent } from './manage-orders.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    ManageOrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManageOrdersRoutingModule
  ]
})
export class ManageOrdersModule { }
