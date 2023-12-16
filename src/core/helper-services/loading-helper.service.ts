import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationStatusInterface } from '../interfaces';

@Injectable()
export class LoadingHelperService {
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  public getLoadingStatus(): BehaviorSubject<boolean> {
    return this._isLoading;
  }

  public startLoading(): void {
    this._isLoading.next(true);
  }
  
  public stopLoading(): void {
    this._isLoading.next(false);
  }
}
