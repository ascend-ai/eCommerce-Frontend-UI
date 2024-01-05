import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './edit-product.component';
import { EditProductRoutingModule } from './edit-product-routing.module';
import { EditImagesComponent } from './edit-images/edit-images.component';
import { EditBasicDetailsComponent } from './edit-basic-details/edit-basic-details.component';
import { EditSimilarProductsComponent } from './edit-similar-products/edit-similar-products.component';



@NgModule({
  declarations: [
    EditProductComponent,
    EditImagesComponent,
    EditBasicDetailsComponent,
    EditSimilarProductsComponent,
  ],
  imports: [
    CommonModule,
    EditProductRoutingModule
  ]
})
export class EditProductModule { }
