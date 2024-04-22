import {
  BASE_SORTABLE_COLUMN
} from './';

export const STALL_SCHEDULE_VENUE_LENGTH_RANGE = {
  MIN: 5,
} as const;

export const STALL_SCHEDULE_SORTABLE_COLUMN = {
  ...BASE_SORTABLE_COLUMN,
  date: 'date',
} as const;