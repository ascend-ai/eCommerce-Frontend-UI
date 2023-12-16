import { NgModule } from '@angular/core';
import { AuthBrokerService } from './broker-services';
import { AuthDataService } from './data-services';
import { AuthHelperService, NotificationHelperService } from './helper-services';
import { AdminGuard, AuthGuard } from './guards';



@NgModule({
  providers: [
    AuthBrokerService,

    AuthDataService,

    AuthHelperService,
    NotificationHelperService,

    AuthGuard,
    AdminGuard
  ]
})
export class CoreModule { }
