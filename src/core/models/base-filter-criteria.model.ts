import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_COLUMN,
  DEFAULT_SORT_DIRECTION
} from '../constants';
import { SortDirection } from '../enums';
import {
  BaseFilterCriteriaInterface
} from '../interfaces';

export class BaseFilterCriteriaModel implements BaseFilterCriteriaInterface {
  page: number;
  size: number;
  sortDirection: SortDirection;

  constructor(filterCriteria: Partial<BaseFilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    sortDirection: DEFAULT_SORT_DIRECTION
  }) {
    this.page = filterCriteria.page || DEFAULT_PAGE_INDEX;
    this.size = filterCriteria.size || DEFAULT_PAGE_SIZE;
    this.sortDirection = filterCriteria.sortDirection || DEFAULT_SORT_DIRECTION;
  }
}
