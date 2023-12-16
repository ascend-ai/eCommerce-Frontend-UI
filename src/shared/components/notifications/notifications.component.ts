import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationStatusInterface } from 'src/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  @Input() notificationList: Array<NotificationStatusInterface> = [];
  @Output() hideNotification: EventEmitter<number> = new EventEmitter();


  constructor() {}

  public getNofificationClasses(notification: NotificationStatusInterface): Record<string, boolean> {
    return {
      'show': notification.isNotificationShown,
      'bg-success': !!notification.isSuccess,
      'bg-danger': !notification.isSuccess
    };
  }

  public onClose(notificationIndex: number): void {
    this.hideNotification.emit(notificationIndex);
  }
}
