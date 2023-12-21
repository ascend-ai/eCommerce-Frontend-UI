import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingHelperService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoading$: Observable<boolean> = this._isLoading$.asObservable();

  constructor() { }

  public startLoading(): void {
    this._isLoading$.next(true);
  }
  
  public stopLoading(): void {
    this._isLoading$.next(false);
  }
}
