import {
  NgModule
} from '@angular/core';
import {
  AuthBrokerService,
  ProductsBrokerService 
} from './broker-services';
import {
  AuthDataService,
  ProductsDataService
} from './data-services';
import {
  AuthHelperService,
  CartHelperService,
  LoadingHelperService,
  NotificationHelperService
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

    AuthDataService,
    ProductsDataService,

    AuthHelperService,
    NotificationHelperService,
    LoadingHelperService,
    CartHelperService,

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
