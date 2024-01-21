import {
  Injectable
} from '@angular/core';
import {
  OrderModel
} from '../models';
import {
  Observable,
  Subject,
  catchError,
  of,
  take,
  tap
} from 'rxjs';
import {
  LoadingHelperService,
  NotificationHelperService
} from '../helper-services';
import {
  OrderDataService
} from '../data-services';
import {
  OrderInterface
} from '../interfaces';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  OrderLoaderService
} from '../loader-services';

@Injectable()
export class OrderBrokerService {

  constructor(private _loadingHelper: LoadingHelperService,
              private _orderData: OrderDataService,
              private _orderLoader: OrderLoaderService,
              private _notificationHelper: NotificationHelperService) { }

  public createOrder(purchases: Record<string, number>): void {
    this._loadingHelper.startLoading();
    let order: OrderModel = new OrderModel();
    this._orderData.createOrder(purchases)
      .pipe(
        take(1),
        tap(res => {
          this._loadingHelper.stopLoading();
          order = this._transformOrders([ res.data ])[0];
          this._orderLoader.order = order;
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._notificationHelper.handleError(err.error.message);
          return of();
        })
      )
      .subscribe();
  }

  private _transformOrders(orders: Array<OrderInterface>): Array<OrderModel> {
    return orders.map(data => {
      const order = new OrderModel(data);
      return order;
    })
  }
}
