import {
  BASE_SORTABLE_COLUMN
} from './common.constants';

export const MIN_ORDERABLE_QTY = 1;

export const ACCEPTED_CURRENCY = 'INR';

/**
 * INR 1 = 100 paise
 */
export const INR_SUBUNIT = 100;

export const ORDER_SORTABLE_COLUMN = {
  ...BASE_SORTABLE_COLUMN,
  totalPurchaseAmount: 'totalPurchaseAmount',
} as const;
