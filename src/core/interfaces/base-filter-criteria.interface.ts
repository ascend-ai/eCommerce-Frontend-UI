import {
  BASE_SORTABLE_COLUMN
} from '../constants';
import {
  SortDirection
} from '../enums';

export interface BaseFilterCriteriaInterface {
  page: number;
  size: number;
  sortDirection: SortDirection;
}
