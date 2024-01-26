import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  takeWhile
} from 'rxjs';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  OrderBrokerService,
  OrderFilterCriteriaModel,
  OrderLoaderService,
  OrderModel,
  OrderStatus,
  PaginationModel
} from 'src/core';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {
  public views: Array<OrderStatus> = [
    OrderStatus.PLACED,
    OrderStatus.CONFIRMED,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
  ];
  public pagination: PaginationModel<OrderModel> = new PaginationModel();
  private _currentView: OrderStatus = this.views[0];
  private _subscribeMain: boolean = true;
  private _filter: OrderFilterCriteriaModel = new OrderFilterCriteriaModel({
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE
  });


  constructor(private _orderBroker: OrderBrokerService,
              private _orderLoader: OrderLoaderService,
              private _router: Router,
              private _route: ActivatedRoute) {}

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

  public switchView(index: number): void {
    this._filter.status = this.views[index];
    this._filter.page = DEFAULT_PAGE_INDEX;
    this._currentView = this.views[index];
    this._getOrders();
  }

  public switchPage(pageIndex: number): void {
    this._filter.page = pageIndex;
    this._getOrders();
  }

  public isViewActive(index: number): boolean {
    return this._currentView === this.views[index];
  }

  public viewOrder(orderId: string): void {
    this._router.navigate([orderId], {
      relativeTo: this._route
    })
  }

  private _getOrders(): void {
    this._orderBroker.getOrders(this._filter);
  }
}
