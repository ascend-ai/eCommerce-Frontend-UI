import {
  PurchaseInterface
} from '../interfaces';

export class PurchaseModel implements PurchaseInterface {
  productId: string;
  productOrderQty: number;
  productCustomizationText: string;

  constructor(data: Partial<PurchaseInterface> | Partial<PurchaseModel> = {
    productId: '',
    productOrderQty: 0,
    productCustomizationText: '',
  }) {
    this.productId = data.productId || '';
    this.productOrderQty = data.productOrderQty || 0;
    this.productCustomizationText = data.productCustomizationText || '';
  }
}