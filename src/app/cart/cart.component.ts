import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { CartHelperService, CartItemInterface, CartItemModel, ProductModel, ProductsBrokerService } from 'src/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public cartListBluePrint: Array<CartItemInterface> = [];
  public get totalProductsInCart(): number {
    return this._cartHelper.totalProducts;
  }
  public cartList: Array<CartItemModel> = []
  private _subscribeMain: boolean = true;

  constructor(private _cartHelper: CartHelperService,
              private _productsBroker: ProductsBrokerService) {}

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
  }
}
