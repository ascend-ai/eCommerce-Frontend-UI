import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  HeaderComponent
} from './components/header/header.component';
import {
  FooterComponent
} from './components/footer/footer.component';
import {
  RouterModule
} from '@angular/router';
import {
  NotificationsComponent
} from './components/notifications/notifications.component';
import {
  LoadingSpinnerComponent
} from './components/loading-spinner/loading-spinner.component';
import {
  CategoryCardComponent
} from './components/category-card/category-card.component';
import {
  ProductListComponent
} from './components/product-list/product-list.component';
import {
  ProductItemComponent
} from './components/product-list/product-item/product-item.component';
import {
  ProductQtyControllerComponent
} from './components/product-qty-controller/product-qty-controller.component';
import {
  SearchComponent
} from './components/search/search.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  ProductImageCarouselComponent
} from './components/product-image-carousel/product-image-carousel.component';
import { BackgroundImagePipe } from './pipes/background-image.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { PushAndPullComponent } from './components/push-and-pull/push-and-pull.component';
import { PnpItemComponent } from './components/push-and-pull/pnp-item/pnp-item.component';
import { PaginationControllerComponent } from './components/pagination-controller/pagination-controller.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotificationsComponent,
    LoadingSpinnerComponent,
    CategoryCardComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductQtyControllerComponent,
    SearchComponent,
    ProductImageCarouselComponent,
    PushAndPullComponent,
    PnpItemComponent,
    PaginationControllerComponent,

    BackgroundImagePipe,
    CapitalizePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotificationsComponent,
    LoadingSpinnerComponent,
    CategoryCardComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductQtyControllerComponent,
    SearchComponent,
    ProductImageCarouselComponent,
    PushAndPullComponent,
    PaginationControllerComponent,

    BackgroundImagePipe,
    CapitalizePipe,
  ]
})
export class SharedModule { }
