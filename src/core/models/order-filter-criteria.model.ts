import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE
} from '../constants';
import {
  OrderStatus,
} from '../enums';
import {
  OrderFilterCriteriaInterface,
} from '../interfaces';
import {
  BaseFilterCriteriaModel
} from './base-filter-criteria.model';

export class OrderFilterCriteriaModel extends BaseFilterCriteriaModel {
  status: OrderStatus | undefined;

  constructor(filterCriteria: Partial<OrderFilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    status: undefined,
  }) {
    super(filterCriteria);
    this.status = filterCriteria.status || undefined;
  }
}
