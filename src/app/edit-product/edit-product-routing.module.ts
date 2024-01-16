import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  EditProductComponent
} from './edit-product.component';
import {
  EditBasicDetailsComponent
} from './edit-basic-details/edit-basic-details.component';
import {
  EditImagesComponent
} from './edit-images/edit-images.component';
import {
  EditSimilarProductsComponent
} from './edit-similar-products/edit-similar-products.component';


const routes: Routes = [
  {
    path: '',
    component: EditProductComponent,
    children: [
      {
        path: '',
        redirectTo: 'basic-details',
        pathMatch: 'full'
      },
      {
        path: 'basic-details',
        component: EditBasicDetailsComponent,
      },
      {
        path: 'images',
        component: EditImagesComponent
      },
      {
        path: 'similar-products',
        component: EditSimilarProductsComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProductRoutingModule { }