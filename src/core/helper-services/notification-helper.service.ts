import {
  Injectable
} from '@angular/core';
import {
  Observable,
  Subject
} from 'rxjs';
import {
  NotificationStatusInterface
} from '../interfaces';

@Injectable()
export class NotificationHelperService {
  private _notifications$: Subject<Array<NotificationStatusInterface>> = new Subject();
  public notifications$: Observable<Array<NotificationStatusInterface>> = this._notifications$.asObservable();
  private _notifications: Array<NotificationStatusInterface> = [];
  private readonly NOTIFICATION_DURATION: number = 6000;
  private readonly MAX_NOTIFICATIONS = 3;


  constructor() { }

  public handleSuccess(message: string): void {
    const notification: NotificationStatusInterface = {
      isNotificationShown: true,
      isSuccess: true,
      message: message
    };
    this._addNotification(notification);
  }

  public handleError(message: string): void {
    const notification: NotificationStatusInterface = {
      isNotificationShown: true,
      isSuccess: false,
      message: message
    };
    this._addNotification(notification);
  }

  private _addNotification(notification: NotificationStatusInterface): void {
    if (this._notifications.length === this.MAX_NOTIFICATIONS) {
      this._notifications.pop();
    }
    this._notifications.unshift(notification);
    this._notifications$.next(this._notifications);
    setTimeout(() => {
      this._notifications.pop();
      this._notifications$.next(this._notifications);
    }, this.NOTIFICATION_DURATION);
  }

  public removeNotificaiton(notificationIndex: number): void {
    this._notifications.splice(notificationIndex, 1);
    this._notifications$.next(this._notifications);
  }
}
