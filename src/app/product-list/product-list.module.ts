import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductListModule { }
