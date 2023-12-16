import { NgModule } from '@angular/core';
import { AuthBrokerService } from './broker-services';
import { AuthDataService } from './data-services';
import { AuthHelperService, LoadingHelperService, NotificationHelperService } from './helper-services';
import { AdminGuard, AuthGuard } from './guards';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor, ResponseInterceptor } from './interceptors';



@NgModule({
  providers: [
    AuthBrokerService,

    AuthDataService,

    AuthHelperService,
    NotificationHelperService,
    LoadingHelperService,

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
