import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  takeWhile
} from 'rxjs';
import {
  AuthHelperService,
  CartHelperService,
  LoadingHelperService,
  NotificationHelperService,
  NotificationStatusInterface
} from 'src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public notificationList: Array<NotificationStatusInterface> = [];
  public isAppLoading: boolean = false;
  public isSearchOpen: boolean = false;
  public get totalItemsInCart(): number {
    return this._cartHelper.totalProducts;
  }
  public get canCreateProduct(): boolean {
    return this._authHelper.isLoggedIn() && this._authHelper.isLoggedInUserAdminOrMod();
  }
  private _subscribeMain: boolean = true;
  constructor(private _notificationHelper: NotificationHelperService,
              private _loadingHelper: LoadingHelperService,
              private _cartHelper: CartHelperService,
              private _cdr: ChangeDetectorRef,
              private _authHelper: AuthHelperService) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._cartHelper.loadCart();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  public hideNotification(notificationIndex: number): void {
    this._notificationHelper.removeNotificaiton(notificationIndex);
  }

  private _initSubscriptions(): void {
    this._notificationHelper.notifications$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(list => {
        this.notificationList = list;
      });

    this._loadingHelper.isLoading$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(isLoading => {
        this.isAppLoading = isLoading;
        this._cdr.detectChanges();
      });
  }
}
