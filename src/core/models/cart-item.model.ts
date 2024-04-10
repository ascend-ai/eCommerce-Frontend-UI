import {
  ProductModel
} from './';

export class CartItemModel {
  product: ProductModel;
  qtyInCart: number;
  customizationText: string

  constructor(data = {
    product: new ProductModel(),
    qtyInCart: 0,
    customizationText: ''
  }) {
    this.product = data?.product || new ProductModel();
    this.qtyInCart = data?.qtyInCart || 0;
    this.customizationText = data?.customizationText || '';
  }
}