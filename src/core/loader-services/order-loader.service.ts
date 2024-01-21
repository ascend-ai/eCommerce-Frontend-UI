import { Injectable } from '@angular/core';
import { OrderModel } from '../models';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class OrderLoaderService {
  private _order$: Subject<OrderModel> = new Subject();
  public order$: Observable<OrderModel> = this._order$.asObservable();
  constructor() { }

  public set order(order: OrderModel) {
    this._order$.next(order);
  }
}
