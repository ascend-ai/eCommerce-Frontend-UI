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

@Injectable()
export class OrderBrokerService {
  private _order$: Subject<OrderModel> = new Subject();
  public order$: Observable<OrderModel> = this._order$.asObservable();

  constructor(private _loadingHelper: LoadingHelperService,
              private _orderData: OrderDataService,
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
          this._order$.next(order);
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
