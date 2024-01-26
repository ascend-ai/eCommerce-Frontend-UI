import {
  NgModule
} from '@angular/core';
import {
  AuthBrokerService,
  OrderBrokerService,
  ProductsBrokerService, 
  UserBrokerService
} from './broker-services';
import {
  AuthDataService,
  OrderDataService,
  ProductsDataService,
  UserDataService
} from './data-services';
import {
  AuthHelperService,
  CartHelperService,
  LoadingHelperService,
  NotificationHelperService,
  OrderHelperService,
  ProductHelperService,
  RazorpayHelperService,
  UserHelperService
} from './helper-services';
import {
  AdminGuard,
  AuthGuard,
  ModGuard,
} from './guards';
import {
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  RequestInterceptor,
  ResponseInterceptor
} from './interceptors';
import {
  AuthLoaderService,
  OrderLoaderService,
  ProductLoaderService,
  UserLoaderService
} from './loader-services';



@NgModule({
  providers: [
    AuthBrokerService,
    ProductsBrokerService,
    OrderBrokerService,
    UserBrokerService,

    AuthLoaderService,
    ProductLoaderService,
    OrderLoaderService,
    UserLoaderService,

    AuthDataService,
    ProductsDataService,
    OrderDataService,
    UserDataService,

    ProductHelperService,
    OrderHelperService,
    UserHelperService,
    AuthHelperService,
    NotificationHelperService,
    LoadingHelperService,
    CartHelperService,
    RazorpayHelperService,

    AuthGuard,
    AdminGuard,
    ModGuard,

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
