import {
  STALL_SCHEDULE_SORTABLE_COLUMN
} from '../constants';
import {
  BaseFilterCriteriaInterface
} from './';

export interface StallScheduleFilterCriteriaInterface extends BaseFilterCriteriaInterface {
  sortColumn: keyof typeof STALL_SCHEDULE_SORTABLE_COLUMN,
}
