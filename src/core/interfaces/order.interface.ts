import {
  OrderStatus
} from '../enums';
import {
  PurchaseInterface,
  TrackingResourceInterface,
  UserInterface
} from './';

export interface OrderInterface {
  _id: string;
  user: UserInterface;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  trackingResource: TrackingResourceInterface;
  purchases: Array<PurchaseInterface>;
  status: OrderStatus;
  purchaseAmount: number;
  shippingCharge: number;
  totalAmount: number;
  isSelfPickup: boolean;
  whenCreated: number;
  whenLastUpdated: number;
}