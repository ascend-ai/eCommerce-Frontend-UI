import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_COLUMN,
  DEFAULT_SORT_DIRECTION,
  STALL_SCHEDULE_SORTABLE_COLUMN
} from '../constants';
import {
  StallScheduleFilterCriteriaInterface
} from '../interfaces';
import {
  BaseFilterCriteriaModel
} from './';

export class StallScheduleFilterCriteriaModel extends BaseFilterCriteriaModel implements StallScheduleFilterCriteriaInterface {
  sortColumn: keyof typeof STALL_SCHEDULE_SORTABLE_COLUMN;

  constructor(filterCriteria: Partial<StallScheduleFilterCriteriaInterface> = {
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE,
    sortColumn: DEFAULT_SORT_COLUMN,
    sortDirection: DEFAULT_SORT_DIRECTION,
  }) {
    super(filterCriteria);
    this.sortColumn = filterCriteria.sortColumn || DEFAULT_SORT_COLUMN;
  }
}