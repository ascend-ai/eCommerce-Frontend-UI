import {
  ProductModel
} from './';

export class CartItemModel {
  product: ProductModel;
  qtyInCart: number;

  constructor(data = {
    product: new ProductModel(),
    qtyInCart: 0
  }) {
    this.product = data?.product || new ProductModel();
    this.qtyInCart = data?.qtyInCart || 0;
  }
}