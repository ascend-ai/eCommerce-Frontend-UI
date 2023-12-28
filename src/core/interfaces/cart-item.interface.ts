import { ProductInterface } from './product.interface';

export interface CartItemInterface {
  product: ProductInterface,
  qty: number
}