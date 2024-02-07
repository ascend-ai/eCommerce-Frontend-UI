import {
  SortDirection
} from '../enums';

export const COMPANY_NAME = {
  part1: 'Style It by',
  part2: 'Rose'
} as const;

export const DEFAULT_PAGE_INDEX: number = 0;

export const DEFAULT_PAGE_SIZE: number = 12;

export const BASE_SORTABLE_COLUMN = {
  whenCreated: 'whenCreated',
  whenLastUpdated: 'whenLastUpdated',
} as const;

export const DEFAULT_SORT_COLUMN: keyof typeof BASE_SORTABLE_COLUMN = BASE_SORTABLE_COLUMN.whenCreated;

export const DEFAULT_SORT_DIRECTION: SortDirection  = SortDirection.desc;
