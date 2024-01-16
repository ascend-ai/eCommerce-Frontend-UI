import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  CreateProductComponent
} from './create-product.component';
import {
  CreateProductRoutingModule
} from './create-product-routing.module';
import {
  ReactiveFormsModule
} from '@angular/forms';
import {
  SharedModule
} from 'src/shared/shared.module';
import {
  CreateBasicDetailsComponent
} from './create-basic-details/create-basic-details.component';
import {
  CreateImagesComponent
} from './create-images/create-images.component';
import {
  CreateSimilarProductsComponent
} from './create-similar-products/create-similar-products.component';
import {
  CreateProductHelperService
} from './create-product-helper.service';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    CreateProductComponent,
    CreateBasicDetailsComponent,
    CreateImagesComponent,
    CreateSimilarProductsComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    CreateProductRoutingModule,
    SharedModule,

    ReactiveFormsModule
  ],
  providers: [
    CreateProductHelperService
  ]
})
export class CreateProductModule { }
