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
  trackingResource: string;
  purchases: Record<string, number>;
  status: OrderStatus;
  purchaseAmount: number;
  shippingCharge: number;
  totalAmount: number;
  isSelfPickup: boolean;
  whenCreated: number;
  whenLastUpdated: number;
}