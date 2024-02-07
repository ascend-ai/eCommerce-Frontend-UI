import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  takeWhile
} from 'rxjs';
import {
  AuthHelperService,
  CartHelperService,
  CartItemInterface,
  CartItemModel,
  MIN_ORDERABLE_QTY,
  NO_SHIPPING_CHARGE_THRESHOLD,
  NotificationHelperService,
  OrderBrokerService,
  OrderLoaderService,
  OrderModel,
  ProductLoaderService,
  ProductModel,
  ProductsBrokerService,
  RazorpayHelperService,
  SHIPPING_CHARGE
} from 'src/core';
import {
  InrPipe
} from 'src/shared/pipes';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [ InrPipe ]
})
export class CartComponent implements OnInit, OnDestroy {
  public get totalProductsInCart(): number {
    return this._cartHelper.totalProducts;
  };
  public get totalProductPrice(): number {
    let total = 0;
    this.cartList.forEach(item => total += (item.product.sellingPrice * item.qtyInCart));
    return total;
  };
  public isSelfPickup: boolean = false;
  public get shippingCharge(): number {
    return (!this.isSelfPickup && (this.totalProductPrice < NO_SHIPPING_CHARGE_THRESHOLD)) ? SHIPPING_CHARGE : 0;

  }
  public get totalAmount(): number  {
    return this.totalProductPrice + this.shippingCharge;
  }
  public cartListBluePrint: Array<CartItemInterface> = [];
  public cartList: Array<CartItemModel> = [];
  public get isCartEmpty(): boolean {
    return this.totalProductsInCart < MIN_ORDERABLE_QTY;
  }
  private _subscribeMain: boolean = true;

  constructor(private _cartHelper: CartHelperService,
              private _productsBroker: ProductsBrokerService,
              private _productsLoader: ProductLoaderService,
              private _orderBroker: OrderBrokerService,
              private _orderLoader: OrderLoaderService,
              private _authHelper: AuthHelperService,
              private _notificationHelper: NotificationHelperService,
              private _razorpayHelper: RazorpayHelperService,
              private _router: Router,
              private _inrPipe: InrPipe) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._cartHelper.getCart();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._cartHelper.cartList$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(list => {
        if (list.length > 0) {
          this.cartListBluePrint = list;
          const productIds = list.map(item => item.productId);
          this._productsBroker.getProductsWithIds(productIds);
        } else {
          this.cartListBluePrint = [];
          this.cartList = [];
        }
      });

    this._productsLoader.products$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(products => {
        this.cartList = this.cartListBluePrint.map(item => new CartItemModel({
          product: <ProductModel>products.find(product => product._id === item.productId),
          qtyInCart: item.qtyInCart
        }));
      });

    this._orderLoader.order$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(order => {
        if (order._id &&
            order._id.length > 0) {
          this._router.navigate(['payment-processing']);
          this._razorpayHelper.checkout(
            order.totalAmount,
            order.razorpayOrderId
          );
        }
      });
  }

  public placeOrder(): void {
    if (this._authHelper.isLoggedIn &&
        this.totalProductsInCart >= MIN_ORDERABLE_QTY) {
      if (confirm(`Proceed to place the order for ${this.totalProductsInCart} products? Total: ${ this._inrPipe.transform(this.totalAmount) }`)) {
        this._orderBroker.createOrder(new OrderModel({
          purchases: this._purchases,
          isSelfPickup: this.isSelfPickup
        }));
      }
    } else if (this.totalProductsInCart >= MIN_ORDERABLE_QTY) {
      this._notificationHelper.handleError('Please log in before placing order');
    }
  }

  private get _purchases(): Record<string, number> {
    const purhases: Record<string, number> = {};
    this.cartList.forEach(item => {
      purhases[item.product._id] = item.qtyInCart
    });
    return purhases;
  }
}
