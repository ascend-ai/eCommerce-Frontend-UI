import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../constants';
import { ProductCategory } from '../enums';
import { FilterCriteriaInterface } from '../interfaces';

export class FilterCriteriaModel implements FilterCriteriaInterface {
  page: number;
  size: number;
  category: ProductCategory | undefined;
  isPopular: boolean | undefined;
  search: string | undefined;

  constructor(filterCriteria: Partial<FilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    category: undefined,
    isPopular: undefined,
    search: ''
  }) {
    this.page = filterCriteria.page || DEFAULT_PAGE_INDEX;
    this.size = filterCriteria.size || DEFAULT_PAGE_SIZE;
    this.category = filterCriteria.category || undefined;
    this.isPopular = filterCriteria.isPopular || undefined;
    this.search = filterCriteria.search || undefined;
  }
}
