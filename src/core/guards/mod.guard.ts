import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  AuthHelperService
} from '../helper-services';

@Injectable()
export class ModGuard implements CanActivate {
  constructor(private _authHelper: AuthHelperService,
              private _router: Router) {}

  /**
   * Following guard assumes AuthGuard is executed first.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
    if (this._authHelper.isLoggedInUserAdminOrMod) {
      return true;
    } else {
      this._router.navigate(['home']);
      return false;
    }
  }
}
