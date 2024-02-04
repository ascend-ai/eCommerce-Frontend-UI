import {
  OrderStatus
} from '../enums';
import {
  UserInterface
} from './user.interface';

export interface OrderInterface {
  _id: string;
  user: UserInterface;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  purchases: Record<string, number>;
  status: OrderStatus;
  totalPurchaseAmount: number;
  shippingCharge: number;
  isSelfPickup: boolean;
  whenCreated: number;
  whenLastUpdated: number;
}