import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { SharedModule } from 'src/shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CartRoutingModule
  ]
})
export class CartModule { }
