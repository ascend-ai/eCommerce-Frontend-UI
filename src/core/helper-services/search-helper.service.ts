import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';

@Injectable()
export class SearchHelperService {
  private _isSearchOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isSearchOpen$: Observable<boolean> = this._isSearchOpen$.asObservable();

  constructor() { }

  public openSearch(): void {
    this._isSearchOpen$.next(true);
  }
  
  public closeSearch(): void {
    this._isSearchOpen$.next(false);
  }
}
