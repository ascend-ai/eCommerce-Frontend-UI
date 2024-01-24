import {
  Injectable
} from '@angular/core';
import {
  OrderModel,
  PaginationModel
} from '../models';
import {
  Observable,
  Subject
} from 'rxjs';

@Injectable()
export class OrderLoaderService {
  private _pagination$: Subject<PaginationModel<OrderModel>> = new Subject();
  public pagination$: Observable<PaginationModel<OrderModel>> =  this._pagination$.asObservable();

  private _order$: Subject<OrderModel> = new Subject();
  public order$: Observable<OrderModel> = this._order$.asObservable();

  constructor() { }

  public set order(order: OrderModel) {
    this._order$.next(order);
  }

  public set pagination(data: PaginationModel<OrderModel>) {
    this._pagination$.next(data);
  }
}
