import { Injectable } from '@angular/core';
import { AuthDataService } from '../data-services';
import { SigninModel } from '../models';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthHelperService, LoadingHelperService, NotificationHelperService } from '../helper-services';
import { AuthStateInterface } from '../interfaces';

@Injectable()
export class AuthBrokerService {
  public _authState: BehaviorSubject<AuthStateInterface> = new BehaviorSubject(<AuthStateInterface>{
    isLoggedIn: false
  });

  constructor(private _authData: AuthDataService,
              private _authHelper: AuthHelperService,
              private _notificationHelper: NotificationHelperService,
              private _loadingHelper: LoadingHelperService) { }

  public login(signinData: SigninModel): void {
    this._loadingHelper.startLoading();
    this._authData.login(signinData)
      .subscribe(
        (res) => {
          this._loadingHelper.stopLoading();
          this._authHelper.setSession(res.data.accessToken);
          this._notificationHelper.handleSuccess(`Login successfull!`);
          this._authState.next({
            isLoggedIn: true
          });
        },
        (err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._notificationHelper.handleError(err.error.message)
          this._authState.next({
            isLoggedIn: false
          });
        }
      );
  } 

  public logout() {
    this._authHelper.logout();
    this._authState.next({
      isLoggedIn: false
    })
  }

  public getAuthState(): BehaviorSubject<AuthStateInterface> {
    return this._authState;
  }
}
