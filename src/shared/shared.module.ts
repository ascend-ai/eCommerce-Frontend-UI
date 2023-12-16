import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotificationsComponent
  ]
})
export class SharedModule { }
