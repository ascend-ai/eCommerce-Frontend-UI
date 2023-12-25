import { ProductCategory } from '../enums';

export interface FilterCriteriaInterface {
  page: number;
  size: number;
  category: ProductCategory | null;
  isPopular: boolean | null;
  search: string;
}
