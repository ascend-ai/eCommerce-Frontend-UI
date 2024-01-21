import {
  Injectable
} from '@angular/core';
import {
  OrderFilterCriteriaModel,
  OrderModel
} from '../models';
import {
  Observable,
  Subject,
  catchError,
  forkJoin,
  of,
  take,
  tap
} from 'rxjs';
import {
  LoadingHelperService,
  NotificationHelperService
} from '../helper-services';
import {
  AddressModel,
  UserModel
} from '../models';
import {
  AddressInterface,
  UserInterface
} from '../interfaces';
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
              private _notificationHelper: NotificationHelperService) { }

  public getUser(userId: string): void {
    this._loadingHelper.startLoading();
    let user: UserModel = new UserModel();
    this._userData.getUser(userId)
      .pipe(
        take(1),
        tap(res => {
          this._loadingHelper.stopLoading();
          user = this._transformUsers([ res.data ])[0];
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

  private _transformUsers(users: Array<UserInterface>): Array<UserModel> {
    return users.map(data => {
      const user = new UserModel(data);
      user.address = this._transformUserAddress(user.address);
      return user;
    })
  }

  private _transformUserAddress(data: AddressInterface): AddressModel {
    const address = new AddressModel(data);
    return address;
  }
}
