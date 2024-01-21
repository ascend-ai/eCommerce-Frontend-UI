import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthStateInterface } from '../interfaces';

@Injectable()
export class AuthLoaderService {
  private _authState$: Subject<AuthStateInterface> = new Subject();
  public authState$: Observable<AuthStateInterface> = this._authState$.asObservable();
  constructor() { }

  public set authState(authState: AuthStateInterface) {
    this._authState$.next(authState);
  }
}
