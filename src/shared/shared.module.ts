import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-list/product-item/product-item.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotificationsComponent,
    LoadingSpinnerComponent,
    CategoryCardComponent,
    ProductListComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotificationsComponent,
    LoadingSpinnerComponent,
    CategoryCardComponent,
    ProductListComponent,
    ProductItemComponent
  ]
})
export class SharedModule { }
