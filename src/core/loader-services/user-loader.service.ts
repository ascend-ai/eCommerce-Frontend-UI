import { Injectable } from '@angular/core';
import { UserModel } from '../models';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserLoaderService {
  private _user$: Subject<UserModel> = new Subject();
  public user$: Observable<UserModel> = this._user$.asObservable();

  constructor() { }

  public set user(data: UserModel) {
    this._user$.next(data);
  }
}
