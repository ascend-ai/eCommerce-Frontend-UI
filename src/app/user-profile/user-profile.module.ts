import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { SharedModule } from 'src/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserDetailsComponent,
    UserOrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileRoutingModule,

    ReactiveFormsModule
  ]
})
export class UserProfileModule { }
