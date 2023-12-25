import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductComponent } from './view-product.component';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  declarations: [
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ViewProductComponent
  ]
})
export class ViewProductModule { }
