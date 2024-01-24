import {
  Injectable
} from '@angular/core';
import {
  OrderInterface
} from '../interfaces';
import {
  OrderModel
} from '../models';

@Injectable()
export class OrderHelperService {

  constructor() { }

  public transformOrders(orders: Array<OrderInterface>): Array<OrderModel> {
    return orders.map(data => {
      const order = new OrderModel(data);
      return order;
    })
  }
}
