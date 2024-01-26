import {
  UserRole
} from '../enums';

export interface UserFilterCriteriaInterface {
  page: number,
  size: number,
  role: UserRole,
  search: string,
}
