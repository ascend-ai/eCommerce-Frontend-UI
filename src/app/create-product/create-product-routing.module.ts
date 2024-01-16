import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CreateProductComponent
} from './create-product.component';
import {
  CreateBasicDetailsComponent
} from './create-basic-details/create-basic-details.component';
import {
  CreateImagesComponent
} from './create-images/create-images.component';
import {
  CreateSimilarProductsComponent
} from './create-similar-products/create-similar-products.component';


const routes: Routes = [
  {
    path: '',
    component: CreateProductComponent,
    children: [
      {
        path: '',
        redirectTo: 'basic-details',
        pathMatch: 'full'
      },
      {
        path: 'basic-details',
        component: CreateBasicDetailsComponent,
      },
      {
        path: 'images',
        component: CreateImagesComponent
      },
      {
        path: 'similar-products',
        component: CreateSimilarProductsComponent
      }
    ]
  }
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateProductRoutingModule { }
