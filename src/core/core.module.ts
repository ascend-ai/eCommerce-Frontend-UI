import {
  NgModule
} from '@angular/core';
import {
  AuthBrokerService,
  OrderBrokerService,
  ProductsBrokerService 
} from './broker-services';
import {
  AuthDataService,
  OrderDataService,
  ProductsDataService
} from './data-services';
import {
  AuthHelperService,
  CartHelperService,
  LoadingHelperService,
  NotificationHelperService,
  RazorpayHelperService
} from './helper-services';
import {
  AdminGuard,
  AuthGuard
} from './guards';
import {
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  RequestInterceptor,
  ResponseInterceptor
} from './interceptors';



@NgModule({
  providers: [
    AuthBrokerService,
    ProductsBrokerService,
    OrderBrokerService,

    AuthDataService,
    ProductsDataService,
    OrderDataService,

    AuthHelperService,
    NotificationHelperService,
    LoadingHelperService,
    CartHelperService,
    RazorpayHelperService,

    AuthGuard,
    AdminGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
