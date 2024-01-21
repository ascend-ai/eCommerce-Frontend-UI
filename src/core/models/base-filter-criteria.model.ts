import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE
} from '../constants';
import {
  BaseFilterCriteriaInterface
} from '../interfaces';

export class BaseFilterCriteriaModel implements BaseFilterCriteriaInterface {
  page: number;
  size: number;

  constructor(filterCriteria: Partial<BaseFilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
  }) {
    this.page = filterCriteria.page || DEFAULT_PAGE_INDEX;
    this.size = filterCriteria.size || DEFAULT_PAGE_SIZE;
  }
}
