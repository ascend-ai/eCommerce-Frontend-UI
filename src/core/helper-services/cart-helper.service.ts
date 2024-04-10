import {
  Injectable
} from '@angular/core';
import {
  Observable,
  Subject
} from 'rxjs';
import {
  NotificationHelperService
} from './notification-helper.service';
import {
  CartItemInterface
} from '../interfaces';

@Injectable()
export class CartHelperService {
  private _cartList: Array<CartItemInterface> = [];
  private _cartList$: Subject<Array<CartItemInterface>> = new Subject();
  public cartList$: Observable<Array<CartItemInterface>> = this._cartList$.asObservable();
  public get totalProducts(): number {
    let total = 0;
    this._cartList.forEach(item => total += item.qtyInCart);
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

  public addProduct(productId: string,
                    qtyInStock: number,
                    qtyToAdd: number,
                    customizationText: string): void {
    const item = this._getCartItem(productId);

    if (item) {
      if ((item.qtyInCart + qtyToAdd) <= qtyInStock) {
        item.qtyInCart += qtyToAdd;
        this._saveCart();
        this._cartList$.next(this._cartList);
        this._notificationHelper.handleSuccess('Cart updated');
      } else {
        this._notificationHelper.handleError('Product limit exceeded');
      }
    } else {
      if (qtyToAdd <= qtyInStock) {
        this._cartList.push({
          productId,
          qtyInCart: qtyToAdd,
          customizationText
        });
        this._saveCart();
        this._cartList$.next(this._cartList);
        this._notificationHelper.handleSuccess('Product added to cart');
      } else {
        this._notificationHelper.handleError('Product limit exceeded');
      }
    }
  }

  private _getCartItem(productId: string): CartItemInterface | undefined {
    return this._cartList.find(item => item.productId === productId);
  }

  public subtractProduct(productId: string, qtyToSubtract: number): void {
    const item = this._getCartItem(productId);

    if (item) {
      if ((item.qtyInCart - qtyToSubtract) > 0) {
        item.qtyInCart -= qtyToSubtract;
        this._saveCart();
        this._cartList$.next(this._cartList);
      } else {
        this.removeProduct(productId);
      }
    }
  }

  public removeProduct(productId: string): void {
    const index = this._cartList.findIndex(item => item.productId === productId);
    if (index >= 0) {
      this._cartList.splice(index, 1);
      this._saveCart();
      this._cartList$.next(this._cartList);
    }
  }

  public emptyCart(): void {
    this._cartList = [];
    this._saveCart();
    this._cartList$.next(this._cartList);
  }

  public getProductQtyInCart(productId: string): number {
    const item = this._getCartItem(productId);
    if (item) {
      return item.qtyInCart;
    } else {
      return 0;
    }
  }

  public getCustomizationTextOfProductInCart(productId: string): string {
    const item = this._getCartItem(productId);
    if (item) {
      return item.customizationText;
    } else {
      return '';
    }
  }

  public updateCustomizationTextOfProductInCart(productId: string, newCustomizationText: string): void {
    const item = this._getCartItem(productId);

    if (item) {
      item.customizationText = newCustomizationText;
      this._saveCart();
      this._cartList$.next(this._cartList);
      this._notificationHelper.handleSuccess('Customization text updated!');
    }
  }
}
