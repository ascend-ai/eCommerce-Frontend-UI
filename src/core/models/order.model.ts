import {
  OrderStatus
} from '../enums';
import {
  OrderInterface
} from '../interfaces';
import {
  TrackingResourceModel,
  UserModel
} from './';

export class OrderModel implements OrderInterface {
  _id: string;
  user: UserModel;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  trackingResource: TrackingResourceModel;
  purchases: Record<string, number>;
  status: OrderStatus;
  isSelfPickup: boolean;
  purchaseAmount: number;
  shippingCharge: number;
  totalAmount: number;
  whenCreated: number;
  whenLastUpdated: number;

  constructor(data: Partial<OrderInterface> | Partial<OrderModel> = {
    _id: '',
    user: new UserModel(),
    razorpayOrderId: '',
    razorpayPaymentId: '',
    razorpaySignature: '',
    trackingResource: new TrackingResourceModel(),
    purchases: {},
    status: OrderStatus.PENDING,
    isSelfPickup: false,
    purchaseAmount: 0,
    shippingCharge: 0,
    totalAmount: 0,
    whenCreated: Date.now(),
    whenLastUpdated: Date.now(),
  }) {
    this._id = data?._id || '';
    this.user = data?.user ? new UserModel(data?.user) : new UserModel();
    this.razorpayOrderId = data?.razorpayOrderId || '';
    this.razorpayPaymentId = data?.razorpayPaymentId || '';
    this.razorpaySignature = data?.razorpaySignature || '';
    this.trackingResource = data?.trackingResource ? new TrackingResourceModel(data?.trackingResource) : new TrackingResourceModel();
    this.purchases = data?.purchases || {};
    this.status = data?.status || OrderStatus.PENDING;
    this.isSelfPickup = data?.isSelfPickup || false;
    this.purchaseAmount = data?.purchaseAmount || 0;
    this.shippingCharge = data?.shippingCharge || 0;
    this.totalAmount = data?.totalAmount || 0;
    this.whenCreated = data?.whenCreated || Date.now();
    this.whenLastUpdated = data?.whenLastUpdated || Date.now();
  }
};
