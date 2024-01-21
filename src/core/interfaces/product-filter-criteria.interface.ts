import {
  ProductCategory
} from '../enums';

export interface ProductFilterCriteriaInterface {
  page: number,
  size: number,
  category: ProductCategory,
  isPopular: boolean,
  search: string
}
