import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { CartHelperService, CartItemModel } from 'src/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public cartList: Array<CartItemModel> = [];
  public get totalProductsInCart(): number {
    return this._cartHelper.totalProducts;
  }
  private _subscribeMain: boolean = true;

  constructor(private _cartHelper: CartHelperService) {}

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
        this.cartList = list;
      });
  }
}
