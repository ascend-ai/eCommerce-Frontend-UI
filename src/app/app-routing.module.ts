import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthComponent } from './auth/auth.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminGuard, AuthGuard } from 'src/core';
import { ViewProductsComponent } from './view-products/view-products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ViewProductsComponent,
  },
  {
    path: 'products/create',
    component: CreateProductComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'products/:id',
    component: ViewProductComponent,
  },
  {
    path: 'products/:id/edit',
    component: EditProductComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'my-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
