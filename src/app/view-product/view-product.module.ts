import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductComponent } from './view-product.component';
import { SharedModule } from 'src/shared/shared.module';
import { ViewProductRoutingModule } from './view-product-routing.module';



@NgModule({
  declarations: [
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ViewProductRoutingModule
  ],
})
export class ViewProductModule { }
