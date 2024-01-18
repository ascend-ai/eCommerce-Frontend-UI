import {
  Component,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  CartHelperService,
  CartItemModel
} from 'src/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() cartItem: CartItemModel = new CartItemModel();

  constructor(private _router: Router,
              private _cartHelper: CartHelperService) {}

  public viewProduct(): void {
    this._router.navigate(['products', this.cartItem.product._id]);
  }

  public removeProduct(event: Event): void {
    event.stopPropagation();
    this._cartHelper.removeProduct(this.cartItem.product._id);
  }

  public addProduct(qtyToAdd: number): void {
    this._cartHelper.addProduct(this.cartItem.product._id, this.cartItem.product.quantityInStock, qtyToAdd);
  }

  public subtractProduct(qtyToSubtract: number): void {
    this._cartHelper.subtractProduct(this.cartItem.product._id, qtyToSubtract);
  }
}
