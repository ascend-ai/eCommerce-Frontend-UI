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
  isPopular: boolean | undefined;
  search: string | undefined;

  constructor(filterCriteria: Partial<ProductFilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    category: undefined,
    isPopular: undefined,
    search: ''
  }) {
    super(filterCriteria);
    this.category = filterCriteria.category || undefined;
    this.isPopular = filterCriteria.isPopular || undefined;
    this.search = filterCriteria.search || undefined;
  }
}
