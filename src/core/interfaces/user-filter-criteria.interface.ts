import {
  USER_SORTABLE_COLUMN
} from '../constants';
import {
  UserRole
} from '../enums';
import {
  BaseFilterCriteriaInterface
} from './base-filter-criteria.interface';

export interface UserFilterCriteriaInterface extends BaseFilterCriteriaInterface {
  sortColumn: keyof typeof USER_SORTABLE_COLUMN,
  role: UserRole | undefined,
  search: string | undefined,
}
