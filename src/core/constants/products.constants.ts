import {
  BASE_SORTABLE_COLUMN
} from './common.constants';

export const MIN_IMAGES_PER_PRODUCT: number = 1;

export const PRODUCT_CUSTOMIZATION_TEXT_FORMAT = /^[A-Z0-9]+$/;

export const PRODUCT_SORTABLE_COLUMN = {
  ...BASE_SORTABLE_COLUMN,
  sellingPrice: 'sellingPrice',
  totalPurchases: 'totalPurchases',
} as const;
