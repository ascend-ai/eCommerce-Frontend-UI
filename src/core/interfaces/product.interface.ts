import {
  ProductCategory
} from '../enums';
import {
  CustomizationTextRangeInterface,
  ProductImageInterface
} from './';

export interface ProductInterface {
  // API properties
  _id: string;
  name: string;
  description: string;
  sellingPrice: number;
  maxRetailPrice: number;
  isPinned: boolean;
  quantityInStock: number;
  images: Array<ProductImageInterface>;
  similarProducts: Array<string>;
  category: ProductCategory;
  totalPurchases: number;
  customizationTextRange: CustomizationTextRangeInterface;
  whenCreated: number;
  whenLastUpdated: number;

  // UI properties
  displayImage: ProductImageInterface;
};
