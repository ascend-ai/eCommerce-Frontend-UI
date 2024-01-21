import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';


const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'edit-info',
        pathMatch: 'full'
      },
      {
        path: 'edit-info',
        component: UserDetailsComponent,
      },
      {
        path: 'my-orders',
        component: UserOrdersComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }