import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from 'src/core/core.module';
import { PaymentSuccessComponent } from './static/payment-success/payment-success.component';
import { PaymentProcessingComponent } from './static/payment-processing/payment-processing.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentSuccessComponent,
    PaymentProcessingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    SharedModule,
    CoreModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
