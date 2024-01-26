import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE
} from '../constants';
import {
  UserRole
} from '../enums';
import {
  UserFilterCriteriaInterface
} from '../interfaces';
import {
  BaseFilterCriteriaModel
} from './base-filter-criteria.model';

export class UserFilterCriteriaModel extends BaseFilterCriteriaModel {
  role: UserRole | undefined;
  search: string | undefined;

  constructor(filterCriteria: Partial<UserFilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    role: undefined,
    search: undefined
  }) {
    super(filterCriteria);
    this.role = filterCriteria.role || undefined;
    this.search = filterCriteria.search || undefined;
  }
}
