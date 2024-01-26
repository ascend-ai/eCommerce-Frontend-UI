import {
  Injectable
} from '@angular/core';
import {
  AuthDataService
} from '../data-services';
import {
  SigninModel,
  UserModel
} from '../models';
import {
  catchError,
  finalize,
  of,
  take,
  tap
} from 'rxjs';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  AuthHelperService,
  LoadingHelperService,
  NotificationHelperService
} from '../helper-services';
import {
  AuthState
} from '../enums';
import {
  AuthLoaderService
} from '../loader-services';
import { AuthStateInterface } from '../interfaces';

@Injectable()
export class AuthBrokerService {
  constructor(private _authData: AuthDataService,
              private _authLoader: AuthLoaderService,
              private _authHelper: AuthHelperService,
              private _notificationHelper: NotificationHelperService,
              private _loadingHelper: LoadingHelperService) { }

  public login(signinData: SigninModel): void {
    this._loadingHelper.startLoading();
    const authState: AuthStateInterface = {
      name: AuthState.LOGIN,
      isSuccessful: false
    };
    this._authData.login(signinData)
      .pipe(
        take(1),
        tap(res => {
          this._authHelper.session = res.data.accessToken;
          this._notificationHelper.handleSuccess(`Login successfull!`);
          authState.isSuccessful = true;
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message);
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._authLoader.authState = authState
        })
      )
      .subscribe();
  }

  public register(signupData: UserModel): void {
    this._loadingHelper.startLoading();
    const authState: AuthStateInterface = {
      name: AuthState.REGISTER,
      isSuccessful: false
    }
    this._authData.register(signupData)
      .pipe(
        take(1),
        tap(res => {
          if (res) {
            this._notificationHelper.handleSuccess(`Login with registered credentials`);
            authState.isSuccessful = true;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message)
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._authLoader.authState = authState
        })
      )
      .subscribe();
  }

  public logout() {
    this._authHelper.logout();
    this._notificationHelper.handleSuccess(`Logout successfull!`);
  }
}
