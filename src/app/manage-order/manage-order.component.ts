import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ActivatedRoute, Router
} from '@angular/router';
import {
  takeWhile
} from 'rxjs';
import {
  AuthHelperService,
  OrderBrokerService,
  OrderLoaderService,
  OrderModel,
  OrderStatus,
  ProductLoaderService,
  ProductModel,
  UserModel,
} from 'src/core';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit, OnDestroy {
  public order: OrderModel = new OrderModel();
  public user: UserModel = new UserModel();
  public orderedProducts: Array<ProductModel> = [];
  private _subscribeMain: boolean = true;
  public isStatusBeingChanged: boolean = false;
  public statusFC: FormControl<OrderStatus> = <FormControl<OrderStatus>>(new FormControl<OrderStatus>(OrderStatus.PLACED));
  public availableStatuses: Array<OrderStatus> = [
    OrderStatus.PLACED,
    OrderStatus.CONFIRMED,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED
  ];
  public get isStatusEditable(): boolean {
    return this._authHelper.isLoggedIn && this._authHelper.isLoggedInUserAdminOrMod;
  }
  public get isStatusChanged(): boolean {
    return this.statusFC.value !== this.order.status;
  }

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _authHelper: AuthHelperService,
              private _orderBroker: OrderBrokerService,
              private _orderLoader: OrderLoaderService,
              private _productLoader: ProductLoaderService) {}
  ngOnInit(): void {
    this._initSubscriptions();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._route.params
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(params => {
        this._orderBroker.getOrder(params['id']);
      });

    this._orderLoader.order$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(order => {
        this.order = order;
        this.user = order.user;
        this.statusFC.setValue(order.status);
        this.isStatusBeingChanged = false;
      });

    this._productLoader.products$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(products => {
        this.orderedProducts = products;
      });
  }

  public formatAndGetQtyOfProductOrdered(product: ProductModel): string {
    const qty =  this.order.purchases[ product._id ];
    const suffix = (qty > 1) ? 'items': 'item';
    return `${qty} ${suffix}`;
  }

  public viewOrderedProduct(productId: string): void {
    this._router.navigate(['products', productId]);
  }

  public editStatus(): void {
    this.isStatusBeingChanged = true;
  }

  public resetStatus(): void {
    this.statusFC.reset(this.order.status);
    this.isStatusBeingChanged = false;
  }

  public updateStatus(): void {
    if (confirm(`Are you sure you want to update the status?`)) {
      this._orderBroker.updateOrderStatus(
        this.order._id,
        {
          status: this.statusFC.value
        }
      )
    }
  }

  public formatAndGetUserAddress(): string {
    let address = '';
    address += this.user.address.streetAddressLine1 + ', ';
    address += this.user.address.streetAddressLine2 ? this.user.address.streetAddressLine2 + ', ' : '';
    address += this.user.address.streetAddressLine3 ? this.user.address.streetAddressLine3 + ', ' : '';
    address += this.user.address.city + ', ';
    address += this.user.address.state + ', ';
    address += this.user.address.country + ', ';
    address += this.user.address.postalCode;
    return address;
  }
}
