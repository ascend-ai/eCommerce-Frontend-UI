import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { AuthBrokerService } from 'src/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private _subscribeMain: boolean = true;

  constructor(private _authBroker: AuthBrokerService,
              private _router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
      this._subscribeMain = false;
  }

  logout(): void {
    this._authBroker.logout();
    this._router.navigate(['/home']);
  }
}
