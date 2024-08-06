import {
  NgModule
} from '@angular/core';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  BrowserModule
} from '@angular/platform-browser';

import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  FaqComponent
} from './static/faq/faq.component';
import {
  AboutComponent
} from './static/about/about.component';
import {
  NotFoundComponent
} from './static/not-found/not-found.component';
import {
  PaymentProcessingComponent
} from './static/payment-processing/payment-processing.component';
import {
  PrivacyPolicyComponent
} from './static/privacy-policy/privacy-policy.component';
import {
  ReturnPolicyComponent
} from './static/return-policy/return-policy.component';
import {
  ShippingPolicyComponent
} from './static/shipping-policy/shipping-policy.component';
import {
  TermsAndConditionsComponent
} from './static/terms-and-conditions/terms-and-conditions.component';
import {
  CustomizationComponent
} from './static/customization/customization.component';
import {
  SharedModule
} from 'src/shared/shared.module';
import {
  CoreModule
} from 'src/core/core.module';

@NgModule({
  declarations: [
    AppComponent,

    AboutComponent,
    FaqComponent,
    NotFoundComponent,
    PaymentProcessingComponent,
    PrivacyPolicyComponent,
    ReturnPolicyComponent,
    ShippingPolicyComponent,
    TermsAndConditionsComponent,
    CustomizationComponent
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
