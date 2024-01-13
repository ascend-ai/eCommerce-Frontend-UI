import {
  ProductCategory
} from '../enums';
import {
  ProductImageInterface
} from './product-image.interface';

export interface ProductInterface {
  // API properties
  _id: string;
  name: string;
  description: string;
  price: number;
  isPopular: boolean;
  quantityInStock: number;
  images: Array<ProductImageInterface>;
  similarProducts: Array<string>;
  category: ProductCategory;

  // UI properties
  displayImage: ProductImageInterface;
};
