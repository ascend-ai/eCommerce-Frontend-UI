import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelperService } from '../helper-services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authHelper: AuthHelperService,
              private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
    if (state.url.includes('/auth')) {
      if (this._authHelper.isLoggedOut()) {
        return true;
      } else {
        this._router.navigate(['my-profile']);
        return false;
      }
    } else {
      if (this._authHelper.isLoggedIn()) {
        return true;
      } else {
        this._router.navigate(['auth', 'signin']);
        return false;
      }
    }
  }
}
