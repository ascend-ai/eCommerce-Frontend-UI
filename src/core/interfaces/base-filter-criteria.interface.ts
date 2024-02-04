import {
  SortDirection
} from '../enums';

export interface BaseFilterCriteriaInterface {
  page: number;
  size: number;
  sortDirection: SortDirection;
}
