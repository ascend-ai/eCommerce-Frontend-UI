import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_COLUMN,
  DEFAULT_SORT_DIRECTION,
  ORDER_SORTABLE_COLUMN
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

export class OrderFilterCriteriaModel extends BaseFilterCriteriaModel implements OrderFilterCriteriaInterface {
  sortColumn: keyof typeof ORDER_SORTABLE_COLUMN;
  status: OrderStatus | undefined;

  constructor(filterCriteria: Partial<OrderFilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    sortColumn: DEFAULT_SORT_COLUMN,
    sortDirection: DEFAULT_SORT_DIRECTION,
    status: undefined,
  }) {
    super(filterCriteria);
    this.sortColumn = filterCriteria.sortColumn || DEFAULT_SORT_COLUMN;
    this.status = filterCriteria.status || undefined;
  }
}
