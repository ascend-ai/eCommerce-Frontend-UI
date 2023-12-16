import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationStatusInterface } from '../interfaces';

@Injectable()
export class NotificationHelperService {
  private _notifications: Subject<Array<NotificationStatusInterface>> = new Subject();
  private _notificationStack: Array<NotificationStatusInterface> = [];
  private NOTIFICATION_DURATION: number = 6000;


  constructor() { }

  public handleSuccess(message: string): void {
    const notification = {
      isNotificationShown: true,
      isSuccess: true,
      message: message
    };
    this._notificationStack.push(notification);
    this._notifications.next(this._notificationStack);
    setTimeout(() => {
      this._notificationStack.shift();
      this._notifications.next(this._notificationStack);
    }, this.NOTIFICATION_DURATION);
  }

  public handleError(message: string): void {
    const notification = {
      isNotificationShown: true,
      isSuccess: false,
      message: message
    };
    this._notificationStack.push(notification);
    this._notifications.next(this._notificationStack);
    setTimeout(() => {
      this._notificationStack.shift();
      this._notifications.next(this._notificationStack);
    }, this.NOTIFICATION_DURATION);
  }

  public removeNotificaiton(notificationIndex: number): void {
    this._notificationStack.splice(notificationIndex, 1);
    this._notifications.next(this._notificationStack);
  }

  public getNotifications(): Subject<Array<NotificationStatusInterface>> {
    return this._notifications;
  }
}
