import {
  Injectable
} from '@angular/core';
import {
  OrderFilterCriteriaModel,
  OrderModel,
  PaginationModel,
  ProductModel
} from '../models';
import {
  catchError,
  mergeMap,
  of,
  take,
  tap
} from 'rxjs';
import {
  LoadingHelperService,
  NotificationHelperService,
  OrderHelperService,
  ProductHelperService
} from '../helper-services';
import {
  OrderDataService,
  ProductsDataService
} from '../data-services';
import {
  OrderInterface
} from '../interfaces';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  OrderLoaderService,
  ProductLoaderService
} from '../loader-services';
import { OrderStatus } from '../enums';

@Injectable()
export class OrderBrokerService {

  constructor(private _loadingHelper: LoadingHelperService,
              private _orderData: OrderDataService,
              private _orderLoader: OrderLoaderService,
              private _orderHelper: OrderHelperService,
              private _productData: ProductsDataService,
              private _productLoader: ProductLoaderService,
              private _productHelper: ProductHelperService,
              private _notificationHelper: NotificationHelperService) { }

  public createOrder(purchases: Record<string, number>): void {
    this._loadingHelper.startLoading();
    let order: OrderModel = new OrderModel();
    this._orderData.createOrder(purchases)
      .pipe(
        take(1),
        tap(res => {
          this._loadingHelper.stopLoading();
          order = this._orderHelper.transformOrders([ res.data ])[0];
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

  public getOrders(filterCriteria: OrderFilterCriteriaModel): void {
    this._loadingHelper.startLoading();
    this._orderData.getOrders(filterCriteria)
      .pipe(
        take(1),
        tap(res => {
          this._loadingHelper.stopLoading();
          const pagination = new PaginationModel(res.data);
          pagination.content = this._orderHelper.transformOrders(pagination.content);
          this._orderLoader.pagination = pagination;
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._orderLoader.pagination = new PaginationModel();
          this._notificationHelper.handleError(err.error.message)
          return of();
        })
      )
      .subscribe();
  }

  public getOrder(orderId: string): void {
    this._loadingHelper.startLoading();
    let order: OrderModel = new OrderModel();
    let products: Array<ProductModel> = [];
    this._orderData.getOrder(orderId)
      .pipe(
        take(1),
        mergeMap(res => {
          order = this._orderHelper.transformOrders([res.data])[0];
          return this._productData.getProductsWithIds(
            this._extractProductIdsFromPurchases(order.purchases)
          )
        }),
        tap(res => {
          this._loadingHelper.stopLoading();
          products = this._productHelper.transformProducts(res.data);
          this._orderLoader.order = order;
          this._productLoader.products = products;
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._orderLoader.order = order;
          this._productLoader.products = products;
          this._notificationHelper.handleError(err.error.message)
          return of();
        })
      )
      .subscribe();
  }

  public updateOrderStatus(orderId: string, newOrderStatus: { status: OrderStatus }): void {
    this._loadingHelper.startLoading();
    let order: OrderModel = new OrderModel();
    let products: Array<ProductModel> = [];
    this._orderData.updateOrderStatus(orderId, newOrderStatus)
      .pipe(
        take(1),
        mergeMap(res => {
          order = this._orderHelper.transformOrders([res.data])[0];
          return this._productData.getProductsWithIds(
            this._extractProductIdsFromPurchases(order.purchases)
          )
        }),
        tap(res => {
          this._loadingHelper.stopLoading();
          products = this._productHelper.transformProducts(res.data);
          this._orderLoader.order = order;
          this._productLoader.products = products;
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._orderLoader.order = order;
          this._productLoader.products = products;
          this._notificationHelper.handleError(err.error.message)
          return of();
        })
      )
      .subscribe();
  }

  private _extractProductIdsFromPurchases(purchases: Record<string, number>): Array<string> {
    return Object.keys(purchases);
  }
}
