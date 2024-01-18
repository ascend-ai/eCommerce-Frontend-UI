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
  NotificationHelperService,
  OrderBrokerService,
  ProductModel,
  ProductsBrokerService,
  RazorpayHelperService
} from 'src/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public get totalProductsInCart(): number {
    return this._cartHelper.totalProducts;
  };
  public get totalProductPrice(): number {
    let total = 0;
    this.cartList.forEach(item => total += (item.product.price * item.qtyInCart));
    return total;
  };
  public cartListBluePrint: Array<CartItemInterface> = [];
  public cartList: Array<CartItemModel> = [];
  public readonly MIN_CART_SIZE = MIN_ORDERABLE_QTY;
  private _subscribeMain: boolean = true;

  constructor(private _cartHelper: CartHelperService,
              private _productsBroker: ProductsBrokerService,
              private _orderBroker: OrderBrokerService,
              private _authHelper: AuthHelperService,
              private _notificationHelper: NotificationHelperService,
              private _razorpayHelper: RazorpayHelperService,
              private _router: Router) {}

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

    this._productsBroker.products$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(products => {
        this.cartList = this.cartListBluePrint.map(item => new CartItemModel({
          product: <ProductModel>products.find(product => product._id === item.productId),
          qtyInCart: item.qtyInCart
        }));
      });

    this._orderBroker.order$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(order => {
        if (order._id &&
            order._id.length > 0) {
          this._router.navigate(['payment-processing']);
          this._razorpayHelper.checkout(
            this.totalProductPrice,
            order.razorpayOrderId
          );
        }
      });
  }

  public placeOrder(): void {
    if (this._authHelper.isLoggedIn() &&
        this.totalProductsInCart >= this.MIN_CART_SIZE) {
      if (confirm(`Proceed to place the order for ${this.totalProductsInCart} products? Total: ₹${this.totalProductPrice}`)) {
        this._orderBroker.createOrder(
          this._purchases
        );
      }
    } else if (this.totalProductsInCart >= this.MIN_CART_SIZE) {
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
