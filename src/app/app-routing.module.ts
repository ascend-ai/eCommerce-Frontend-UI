import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  NotFoundComponent
} from './static/not-found/not-found.component';
import {
  ModGuard,
  AuthGuard,
  AdminGuard
} from 'src/core';
import {
  PaymentProcessingComponent
} from './static/payment-processing/payment-processing.component';

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
    path: 'orders',
    loadChildren: () => import('./manage-orders/manage-orders.module').then(m => m.ManageOrdersModule),
    canActivate: [AuthGuard, ModGuard]
  },
  {
    path: 'orders/:id',
    loadChildren: () => import('./view-order/view-order.module').then(m => m.ViewOrderModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/:id/edit',
    loadChildren: () => import('./edit-order/edit-order.module').then(m => m.EditOrderModule),
    canActivate: [AuthGuard, ModGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./view-products/view-products.module').then(m => m.ViewProductsModule)
  },
  {
    path: 'products/create',
    loadChildren: () => import('./create-product/create-product.module').then(m => m.CreateProductModule),
    canActivate: [AuthGuard, ModGuard]
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./view-product/view-product.module').then(m => m.ViewProductModule),
  },
  {
    path: 'products/:id/edit',
    loadChildren: () => import('./edit-product/edit-product.module').then(m => m.EditProductModule),
    canActivate: [AuthGuard, ModGuard]
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-mods',
    loadChildren: () => import('./manage-mods/manage-mods.module').then(m => m.ManageModsModule),
    canActivate: [AuthGuard, AdminGuard]
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
    path: 'payment-processing',
    component: PaymentProcessingComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
