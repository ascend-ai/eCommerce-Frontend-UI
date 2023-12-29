import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductsComponent } from './view-products.component';
import { SharedModule } from 'src/shared/shared.module';
import { ViewProductsRoutingModule } from './view-products-routing.module';



@NgModule({
  declarations: [
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ViewProductsRoutingModule
  ],
})
export class ViewProductsModule { }
