import {
  OrderStatus
} from '../enums';

export interface OrderInterface {
  _id: string;
  user: string;
  razorpayOrderId: string;
  purchases: Record<string, number>;
  status: OrderStatus
  whenCreated: Date;
}