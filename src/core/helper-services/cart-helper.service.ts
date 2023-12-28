import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItemModel, ProductModel } from '../models';
import { NotificationHelperService } from './notification-helper.service';

@Injectable()
export class CartHelperService {
  private _cartList: Array<CartItemModel> = [];
  private _cartList$: Subject<Array<CartItemModel>> = new Subject();
  public cartList$: Observable<Array<CartItemModel>> = this._cartList$.asObservable();
  public get totalProducts(): number {
    let total = 0;
    this._cartList.forEach(item => total += item.qty);
    return total;
  }

  constructor(private _notificationHelper: NotificationHelperService) {}

  public getCart(): void {
    this._cartList$.next(this._cartList);
  }

  private _saveCart(): void {
    const encodedCartData = btoa(JSON.stringify(this._cartList));
    localStorage.setItem('cart', encodedCartData);
  }

  public loadCart(): void {
    try {
      const encodedCartData = localStorage.getItem('cart');
      if (encodedCartData) {
        const cartJsonString = atob(encodedCartData);
        this._cartList = JSON.parse(cartJsonString);
      } else {
        this._cartList = [];
      }
    } catch (error: any) {
      this._cartList = [];
    }
  }

  public addProduct(product: ProductModel, qty: number): void {
    const item = this._cartList.find(item => item.product._id === product._id);

    if (item) {
      if ((item.qty + qty) <= item.product.quantityInStock) {
        item.qty += qty;
        this._saveCart();
        this._cartList$.next(this._cartList);
        this._notificationHelper.handleSuccess('Cart updated');
      } else {
        this._notificationHelper.handleError('Product limit exceeded');
      }
    } else {
      if (qty <= product.quantityInStock) {
        this._cartList.push(new CartItemModel({ product, qty }));
        this._saveCart();
        this._cartList$.next(this._cartList);
        this._notificationHelper.handleSuccess('Product added to cart');
      } else {
        this._notificationHelper.handleError('Product limit exceeded');
      }
    }
  }

  public subtractProduct(product: ProductModel, qty: number): void {
    const item = this._cartList.find(item => item.product._id === product._id);

    if (item) {
      if ((item.qty - qty) > 0) {
        item.qty -= qty;
        this._saveCart();
        this._cartList$.next(this._cartList);
      } else {
        this.removeProduct(product);
      }
    }
  }

  public removeProduct(product: ProductModel): void {
    const index = this._cartList.findIndex(item => item.product._id === product._id);
    if (index >= 0) {
      this._cartList.splice(index, 1);
      this._saveCart();
      this._cartList$.next(this._cartList);
    }
  }

  public getProductQtyInCart(product: ProductModel): number {
    const item = this._cartList.find(item => item.product._id === product._id);
    if (item) {
      return item.qty;
    } else {
      return 0;
    }
  }
}
