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
  Observable,
  Subject,
  catchError,
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
  AuthStateInterface
} from '../interfaces';
import {
  AuthState
} from '../enums';

@Injectable()
export class AuthBrokerService {
  private _authState$: Subject<AuthStateInterface> = new Subject();
  public authState$: Observable<AuthStateInterface> = this._authState$.asObservable();


  constructor(private _authData: AuthDataService,
              private _authHelper: AuthHelperService,
              private _notificationHelper: NotificationHelperService,
              private _loadingHelper: LoadingHelperService) { }

  public login(signinData: SigninModel): void {
    this._loadingHelper.startLoading();
    this._authData.login(signinData)
      .pipe(
        take(1),
        tap(res => {
          this._loadingHelper.stopLoading();
          this._authHelper.setSession(res.data.accessToken);
          this._notificationHelper.handleSuccess(`Login successfull!`);
          this._authState$.next({
            name: AuthState.LOGIN,
            isSuccessful: true
          });
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._notificationHelper.handleError(err.error.message)
          this._authState$.next({
            name: AuthState.LOGIN,
            isSuccessful: false
          });
          return of();
        }),
      )
      .subscribe();
  }

  public register(signupData: UserModel): void {
    this._loadingHelper.startLoading();
    this._authData.register(signupData)
      .pipe(
        take(1),
        tap(res => {
          if (res) {
            this._loadingHelper.stopLoading();
            this._notificationHelper.handleSuccess(`Login with registered credentials`);
            this._authState$.next({
              name: AuthState.REGISTER,
              isSuccessful: true
            });
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._notificationHelper.handleError(err.error.message)
          this._authState$.next({
            name: AuthState.REGISTER,
            isSuccessful: false
          });
          return of();
        }),
      )
      .subscribe();
  }

  public logout() {
    this._authHelper.logout();
    this._notificationHelper.handleSuccess(`Logout successfull!`);
  }
}
