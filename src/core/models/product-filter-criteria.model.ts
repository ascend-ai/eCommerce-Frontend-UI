import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE
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

export class ProductFilterCriteriaModel extends BaseFilterCriteriaModel {
  category: ProductCategory | undefined;
  isPinned: boolean | undefined;
  search: string | undefined;

  constructor(filterCriteria: Partial<ProductFilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    category: undefined,
    isPinned: undefined,
    search: ''
  }) {
    super(filterCriteria);
    this.category = filterCriteria.category || undefined;
    this.isPinned = filterCriteria.isPinned || undefined;
    this.search = filterCriteria.search || undefined;
  }
}
