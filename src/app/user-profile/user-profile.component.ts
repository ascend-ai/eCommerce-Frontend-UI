import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { AuthBrokerService, AuthHelperService, CartHelperService } from 'src/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public get isLoggedInUserAdminOrMod(): boolean {
    return this._authHelper.isLoggedInUserAdminOrMod
  }

  public get isLoggedInUserAdmin(): boolean {
    return this._authHelper.isLoggedInUserAdmin
  }
  private _subscribeMain: boolean = true;

  constructor(private _authBroker: AuthBrokerService,
              private _authHelper: AuthHelperService,
              private _cartHelper: CartHelperService,
              private _router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
      this._subscribeMain = false;
  }

  public logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      this._cartHelper.emptyCart();
      this._authBroker.logout();
      this._router.navigate(['home']);
    }
  }

  public goToOrdersManager(): void {
    this._router.navigate(['orders']);
  }

  public goToModManager(): void {
    this._router.navigate(['manage-mods']);
  }

}
