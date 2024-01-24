import {
  OrderStatus
} from '../enums';
import {
  OrderInterface
} from '../interfaces';
import {
  UserModel
} from './user.model';

export class OrderModel implements OrderInterface {
  _id: string;
  user: UserModel;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  purchases: Record<string, number>;
  status: OrderStatus;
  totalPurchaseAmount: number;
  whenCreated: number;

  constructor(data: OrderInterface | OrderModel = {
    _id: '',
    user: new UserModel(),
    razorpayOrderId: '',
    razorpayPaymentId: '',
    razorpaySignature: '',
    purchases: {},
    status: OrderStatus.PENDING,
    whenCreated: Date.now(),
    totalPurchaseAmount: 0
  }) {
    this._id = data?._id || '';
    this.user = data?.user ? new UserModel(data?.user) : new UserModel();
    this.razorpayOrderId = data?.razorpayOrderId || '';
    this.razorpayPaymentId = data?.razorpayPaymentId || '';
    this.razorpaySignature = data?.razorpaySignature || '';
    this.purchases = data?.purchases || {};
    this.status = data?.status || OrderStatus.PENDING;
    this.whenCreated = data?.whenCreated || Date.now();
    this.totalPurchaseAmount = data?.totalPurchaseAmount || 0;
  }
};
