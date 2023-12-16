import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { LoadingHelperService, NotificationHelperService, NotificationStatusInterface } from 'src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public notificationList: Array<NotificationStatusInterface> = [];
  public isAppLoading: boolean = false;
  private _subscribeMain: boolean = true;
  constructor(private _notificationHelper: NotificationHelperService,
              private _loadingHelper: LoadingHelperService) {}

  ngOnInit(): void {
    this._initSubscriptions();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false
  }

  public hideNotification(notificationIndex: number): void {
    this._notificationHelper.removeNotificaiton(notificationIndex);
  }

  private _initSubscriptions(): void {
    this._notificationHelper.getNotifications()
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(value => {
        this.notificationList = value;
      });

    this._loadingHelper.getLoadingStatus()
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(value => {
        this.isAppLoading = value;
      });
  }
}
