import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import {
  AuthHelperService,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  OrderBrokerService,
  OrderFilterCriteriaModel,
  OrderLoaderService,
  OrderModel,
  PaginationModel
} from 'src/core';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit, OnDestroy {
  private _subscribeMain: boolean = true;
  private _filter: OrderFilterCriteriaModel = new OrderFilterCriteriaModel({
    size: DEFAULT_PAGE_SIZE,
    page: DEFAULT_PAGE_INDEX
  });
  private get _loggedInUserId(): string {
    return this._authHelper.isLoggedIn ? this._authHelper.loggedInUserId : '';
  }
  public pagination: PaginationModel<OrderModel> = new PaginationModel();


  constructor(private _orderBroker: OrderBrokerService,
              private _authHelper: AuthHelperService,
              private _orderLoader: OrderLoaderService,
              private _router: Router) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._getOrders();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._orderLoader.pagination$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(pagination => {
        this.pagination = pagination;
      });
  }

  public switchPage(pageIndex: number): void {
    this._filter.page = pageIndex;
    this._getOrders();
  }

  public viewOrder(orderId: string): void {
    this._router.navigate(['orders', orderId]);
  }

  private _getOrders(): void {
    this._orderBroker.getOrdersOfUser(
      this._loggedInUserId,
      this._filter
    );
  }

}
