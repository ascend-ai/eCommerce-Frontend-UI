import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_COLUMN,
  DEFAULT_SORT_DIRECTION,
  USER_SORTABLE_COLUMN
} from '../constants';
import {
  UserRole
} from '../enums';
import {
  UserFilterCriteriaInterface
} from '../interfaces';
import {
  BaseFilterCriteriaModel
} from './';

export class UserFilterCriteriaModel extends BaseFilterCriteriaModel implements UserFilterCriteriaInterface {
  role: UserRole | undefined;
  search: string | undefined;
  sortColumn: keyof typeof USER_SORTABLE_COLUMN;

  constructor(filterCriteria: Partial<UserFilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    sortColumn: DEFAULT_SORT_COLUMN,
    sortDirection: DEFAULT_SORT_DIRECTION,
    role: undefined,
    search: undefined
  }) {
    super(filterCriteria);
    this.sortColumn = filterCriteria.sortColumn || DEFAULT_SORT_COLUMN;
    this.role = filterCriteria.role || undefined;
    this.search = filterCriteria.search || undefined;
  }
}
