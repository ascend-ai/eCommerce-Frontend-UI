import {
  PRODUCT_SORTABLE_COLUMN
} from '../constants';
import {
  ProductCategory
} from '../enums';
import {
  BaseFilterCriteriaInterface
} from './base-filter-criteria.interface';

export interface ProductFilterCriteriaInterface extends BaseFilterCriteriaInterface {
  sortColumn: keyof typeof PRODUCT_SORTABLE_COLUMN,
  category: ProductCategory | undefined,
  isPinned: boolean | undefined,
  search: string | undefined
}
