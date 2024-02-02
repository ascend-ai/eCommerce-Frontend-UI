import {
  ORDER_SORTABLE_COLUMN
} from '../constants';
import {
  OrderStatus,
} from '../enums';
import {
  BaseFilterCriteriaInterface
} from './base-filter-criteria.interface';

export interface OrderFilterCriteriaInterface extends BaseFilterCriteriaInterface {
  sortColumn: keyof typeof ORDER_SORTABLE_COLUMN,
  status: OrderStatus | undefined,
}
