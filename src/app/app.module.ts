import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared/shared.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { CoreModule } from 'src/core/core.module';
import { CreateProductModule } from './create-product/create-product.module';
import { EditProductModule } from './edit-product/edit-product.module';
import { ViewProductModule } from './view-product/view-product.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ViewProductsModule } from './view-products/view-products.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    SharedModule,
    CoreModule,
    AuthModule,
    HomeModule,
    CreateProductModule,
    EditProductModule,
    ViewProductModule,
    ViewProductsModule,
    CartModule,
    UserProfileModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
