import { Injectable } from '@angular/core';
import { PaginationModel, UserModel } from '../models';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserLoaderService {
  private _pagination$: Subject<PaginationModel<UserModel>> = new Subject();
  public pagination$: Observable<PaginationModel<UserModel>> =  this._pagination$.asObservable();

  private _user$: Subject<UserModel> = new Subject();
  public user$: Observable<UserModel> = this._user$.asObservable();

  private _users$: Subject<Array<UserModel>> = new Subject();
  public users$: Observable<Array<UserModel>> = this._users$.asObservable();

  constructor() { }

  public set user(data: UserModel) {
    this._user$.next(data);
  }

  public set pagination(data: PaginationModel<UserModel>) {
    this._pagination$.next(data);
  }

  public set users(data: Array<UserModel>) {
    this._users$.next(data);
  }
}
