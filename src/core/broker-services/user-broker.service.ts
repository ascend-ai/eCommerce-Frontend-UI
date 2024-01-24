import {
  Injectable
} from '@angular/core';
import {
  catchError,
  of,
  take,
  tap
} from 'rxjs';
import {
  LoadingHelperService,
  NotificationHelperService,
  UserHelperService
} from '../helper-services';
import {
  UserModel
} from '../models';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  UserDataService
} from '../data-services';
import {
  UserLoaderService
} from '../loader-services';

@Injectable()
export class UserBrokerService {

  constructor(private _loadingHelper: LoadingHelperService,
              private _userData: UserDataService,
              private _userLoader: UserLoaderService,
              private _userHelper: UserHelperService,
              private _notificationHelper: NotificationHelperService) { }

  public getUser(userId: string): void {
    this._loadingHelper.startLoading();
    let user: UserModel = new UserModel();
    this._userData.getUser(userId)
      .pipe(
        take(1),
        tap(res => {
          this._loadingHelper.stopLoading();
          user = this._userHelper.transformUsers([ res.data ])[0];
          this._userLoader.user = user;
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._userLoader.user = user;
          this._notificationHelper.handleError(err.error.message);
          return of();
        })
      )
      .subscribe();
  }
}
