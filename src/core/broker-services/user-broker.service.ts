import {
  Injectable
} from '@angular/core';
import {
  catchError,
  finalize,
  forkJoin,
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
  PaginationModel,
  UserFilterCriteriaModel,
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
          user = this._userHelper.transformUsers([ res.data ])[0];
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message);
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._userLoader.user = user;
        })
      )
      .subscribe();
  }

  public getUsers(filterCriteria: UserFilterCriteriaModel): void {
    this._loadingHelper.startLoading();
    let pagination: PaginationModel<UserModel> = new PaginationModel();
    this._userData.getUsers(filterCriteria)
      .pipe(
        take(1),
        tap(res => {
          pagination = new PaginationModel(res.data);
          pagination.content = this._userHelper.transformUsers(pagination.content);
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message)
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._userLoader.pagination = pagination;
        })
      )
      .subscribe();
  }

  public getModeratorList(): void {
    this._loadingHelper.startLoading();
    let users: Array<UserModel> = [];
    this._userData.getModeratorList()
      .pipe(
        take(1),
        tap(res => {
          users = this._userHelper.transformUsers(res.data);
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message);
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._userLoader.users = users;
        })
      )
      .subscribe();
  }

  public updateModeratorList(newModeratorList: Array<string>): void {
    this._loadingHelper.startLoading();
    let users: Array<UserModel> = [];
    this._userData.updateModeratorList(newModeratorList)
      .pipe(
        take(1),
        tap(res => {
          users = this._userHelper.transformUsers(res.data);
          this._notificationHelper.handleSuccess(`Moderators updated!`);
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message);
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._userLoader.users = users;
        })
      )
      .subscribe();
  }

  public getInitialDataRequiredForManagingMods(userId: string, filterCriteria: UserFilterCriteriaModel): void {
    this._loadingHelper.startLoading();
    let user: UserModel = new UserModel();
    let users: Array<UserModel> = [];
    let pagination: PaginationModel<UserModel> = new PaginationModel();
    forkJoin({
      loggedInUser: this._userData.getUser(userId),
      moderators: this._userData.getModeratorList(),
      pagination: this._userData.getUsers(filterCriteria)
    })
      .pipe(
      take(1),
      tap(res => {
        user = this._userHelper.transformUsers([ res.loggedInUser.data ])[0];
        users = this._userHelper.transformUsers(res.moderators.data);
        pagination = new PaginationModel(res.pagination.data);
        pagination.content = this._userHelper.transformUsers(pagination.content);
      }),
      catchError((err: HttpErrorResponse) => {
        this._notificationHelper.handleError(err.error.message);
        
        return of();
      }),
      finalize(() => {
        this._loadingHelper.stopLoading();
        this._userLoader.user = user;
        this._userLoader.users = users;
        this._userLoader.pagination = pagination;
      })
    )
    .subscribe();
  }

  public updateUserBasicDetails(userId: string, data: Record<string, any>): void {
    this._loadingHelper.startLoading();
    let user: UserModel = new UserModel();
    this._userData.updateUserBasicDetails(userId, data)
      .pipe(
        take(1),
        tap(res => {
          user = this._userHelper.transformUsers([ res.data ])[0];
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message);
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._userLoader.user = user;
        })
      )
      .subscribe();
  }
}
