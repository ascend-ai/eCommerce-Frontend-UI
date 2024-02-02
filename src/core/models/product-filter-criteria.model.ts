import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_COLUMN,
  DEFAULT_SORT_DIRECTION,
  PRODUCT_SORTABLE_COLUMN
} from '../constants';
import {
  ProductCategory
} from '../enums';
import {
  ProductFilterCriteriaInterface
} from '../interfaces';
import {
  BaseFilterCriteriaModel
} from './base-filter-criteria.model';

export class ProductFilterCriteriaModel extends BaseFilterCriteriaModel implements ProductFilterCriteriaInterface {
  sortColumn: keyof typeof PRODUCT_SORTABLE_COLUMN
  category: ProductCategory | undefined;
  isPinned: boolean | undefined;
  search: string | undefined;

  constructor(filterCriteria: Partial<ProductFilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    sortColumn: DEFAULT_SORT_COLUMN,
    sortDirection: DEFAULT_SORT_DIRECTION,
    category: undefined,
    isPinned: undefined,
    search: ''
  }) {
    super(filterCriteria);
    this.sortColumn = filterCriteria.sortColumn || DEFAULT_SORT_COLUMN;
    this.category = filterCriteria.category || undefined;
    this.isPinned = filterCriteria.isPinned || undefined;
    this.search = filterCriteria.search || undefined;
  }
}
