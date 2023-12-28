import { CartItemInterface } from '../interfaces';
import { ProductModel } from './product.model';

export class CartItemModel implements CartItemInterface {
  product: ProductModel;
  qty: number;

  constructor(data: CartItemModel = {
    product: new ProductModel(),
    qty: 1
  }) {
    this.product = data.product || new ProductModel();
    this.qty = data.qty || 1;
  }
}