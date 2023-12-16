import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { NotificationHelperService, NotificationStatusInterface } from 'src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public notificationList: Array<NotificationStatusInterface> = [];
  private _subscribeMain: boolean = true;
  constructor(private _notificationHelper: NotificationHelperService) {}

  ngOnInit(): void {
    this._notificationHelper.fetchNotification()
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(value => {
        this.notificationList = value;
      });
  }

  ngOnDestroy(): void {
    this._subscribeMain = false
  }

  public hideNotification(notificationIndex: number): void {
    this._notificationHelper.removeNotificaiton(notificationIndex);
  }
}
