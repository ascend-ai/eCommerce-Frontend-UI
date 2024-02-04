import {
  BASE_SORTABLE_COLUMN,
  ORDER_SORTABLE_COLUMN,
  PRODUCT_SORTABLE_COLUMN,
  USER_SORTABLE_COLUMN
} from '../constants';
import {
  SortDirection
} from '../enums';

export interface PaginationInterface<T> {
  content: Array<T>;
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  sortColumn: (keyof typeof BASE_SORTABLE_COLUMN) |
              (keyof typeof PRODUCT_SORTABLE_COLUMN) |
              (keyof typeof ORDER_SORTABLE_COLUMN) |
              (keyof typeof USER_SORTABLE_COLUMN)
  sortDirection: SortDirection;
};
