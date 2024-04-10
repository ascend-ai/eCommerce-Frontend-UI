import {
  Component
} from '@angular/core';
import {
  FormControl
} from '@angular/forms';
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
  ProductLoaderService,
  ProductModel,
  UserModel,
} from 'src/core';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {
  public order: OrderModel = new OrderModel();
  public user: UserModel = new UserModel();
  public orderedProducts: Array<ProductModel> = [];
  private _subscribeMain: boolean = true;
  public get isOrderEditable(): boolean {
    return this._authHelper.isLoggedInUserAdminOrMod;
  }
  public get formatedUserAddress(): string {
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

  public get isTrackingResourceAvailable(): boolean {
    return !!this.order.trackingResource?.trackingId.trim() &&
           !!this.order.trackingResource?.trackingUrl.trim()
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
      });

    this._productLoader.products$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(products => {
        this.orderedProducts = products;
      });
  }

  public formatAndGetQtyOfProductOrdered(product: ProductModel): string {
    const qty =  <number>this.order.purchases.find(purchase => purchase.productId === product._id)?.productOrderQty;
    const suffix = (qty > 1) ? 'items': 'item';
    return `${qty} ${suffix}`;
  }

  public getProductCustomizationText(product: ProductModel): string {
    const customizationText = <string>(this.order.purchases.find(purchase => purchase.productId === product._id)?.productCustomizationText);
    return customizationText ? customizationText : '--';
  }

  public viewOrderedProduct(productId: string): void {
    this._router.navigate(['products', productId]);
  }

  public updateOrder(): void {
    this._router.navigate(['edit'], {
      relativeTo: this._route
    })
  }
}
