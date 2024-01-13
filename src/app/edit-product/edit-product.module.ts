import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  EditProductComponent
} from './edit-product.component';
import {
  EditProductRoutingModule
} from './edit-product-routing.module';
import {
  EditImagesComponent
} from './edit-images/edit-images.component';
import {
  EditBasicDetailsComponent
} from './edit-basic-details/edit-basic-details.component';
import {
  EditSimilarProductsComponent
} from './edit-similar-products/edit-similar-products.component';
import {
  EditProductHelperService
} from './edit-product-helper.service';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  DragDropModule
} from '@angular/cdk/drag-drop';
import {
  SharedModule
} from 'src/shared/shared.module';



@NgModule({
  declarations: [
    EditProductComponent,
    EditImagesComponent,
    EditBasicDetailsComponent,
    EditSimilarProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    EditProductRoutingModule,

  ],
  providers: [
    EditProductHelperService
  ]
})
export class EditProductModule { }
