import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductsComponent } from './view-products.component';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  declarations: [
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ViewProductsComponent
  ]
})
export class ViewProductsModule { }
