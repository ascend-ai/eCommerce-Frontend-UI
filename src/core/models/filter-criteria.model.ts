import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../constants';
import { ProductCategory } from '../enums';
import { FilterCriteriaInterface } from '../interfaces';

export class FilterCriteriaModel implements FilterCriteriaInterface {
  page: number;
  size: number;
  category: ProductCategory | null;
  isPopular: boolean | null;
  search: string;

  constructor(filterCriteria: Partial<FilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    category: null,
    isPopular: null,
    search: ''
  }) {
    this.page = filterCriteria.page || DEFAULT_PAGE_INDEX;
    this.size = filterCriteria.size || DEFAULT_PAGE_SIZE;
    this.category = filterCriteria.category || null;
    this.isPopular = filterCriteria.isPopular || null;
    this.search = filterCriteria.search || '';
  }
}
