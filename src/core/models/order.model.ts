import { OrderStatus } from '../enums';
import { OrderInterface } from '../interfaces';

export class OrderModel implements OrderInterface {
  _id: string;
  user: string;
  razorpayOrderId: string;
  purchases: Record<string, number>;
  status: OrderStatus
  whenCreated: Date;

  constructor(data: OrderInterface | OrderModel = {
    _id: '',
    user: '',
    razorpayOrderId: '',
    purchases: {},
    status: OrderStatus.PENDING,
    whenCreated: new Date(),
  }) {
    this._id = data?._id || '';
    this.user = data?.user || '';
    this.razorpayOrderId = data?.razorpayOrderId || '';
    this.purchases = data?.purchases || {};
    this.status = data?.status || OrderStatus.PENDING;
    this.whenCreated = data?.whenCreated || new Date();
  }
};
