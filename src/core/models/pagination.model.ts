import {
  BASE_SORTABLE_COLUMN,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_COLUMN,
  ORDER_SORTABLE_COLUMN,
  PRODUCT_SORTABLE_COLUMN,
  USER_SORTABLE_COLUMN
} from '../constants';
import {
  SortDirection
} from '../enums';
import {
  PaginationInterface
} from '../interfaces';

export class PaginationModel<T> implements PaginationInterface<T> {
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
  constructor(data: Partial<PaginationInterface<T>> | Partial<PaginationModel<T>> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    page: DEFAULT_PAGE_SIZE,
    size: DEFAULT_PAGE_INDEX,
    sortColumn: DEFAULT_SORT_COLUMN,
    sortDirection: SortDirection.desc
  }) {
    this.content = data?.content || [];
    this.totalElements = data?.totalElements || 0;
    this.totalPages = data?.totalPages || 0;
    this.page = data?.page || DEFAULT_PAGE_INDEX;
    this.size = data?.size || DEFAULT_PAGE_SIZE;
    this.sortColumn = data?.sortColumn || DEFAULT_SORT_COLUMN;
    this.sortDirection = data?.sortDirection || SortDirection.desc;
  }
};
