import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuard, AuthGuard } from 'src/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./view-products/view-products.module').then(m => m.ViewProductsModule)
  },
  {
    path: 'products/create',
    loadChildren: () => import('./create-product/create-product.module').then(m => m.CreateProductModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./view-product/view-product.module').then(m => m.ViewProductModule),
  },
  {
    path: 'products/:id/edit',
    loadChildren: () => import('./edit-product/edit-product.module').then(m => m.EditProductModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
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
