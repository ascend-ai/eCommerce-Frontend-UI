import { ProductCategory } from '../enums';

export interface FilterCriteriaInterface {
  page: number;
  size: number;
  category: ProductCategory | undefined;
  isPopular: boolean | undefined;
  search: string | undefined;
}
