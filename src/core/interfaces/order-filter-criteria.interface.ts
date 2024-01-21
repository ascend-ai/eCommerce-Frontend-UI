import {
  OrderStatus,
} from '../enums';

export interface OrderFilterCriteriaInterface {
  page: number,
  size: number,
  status: OrderStatus,
}
