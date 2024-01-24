import {
  Injectable
} from '@angular/core';
import {
  Observable,
  Subject
} from 'rxjs';
import {
  PaginationModel,
  ProductModel
} from '../models';

@Injectable()
export class ProductLoaderService {
  private _pagination$: Subject<PaginationModel<ProductModel>> = new Subject();
  public pagination$: Observable<PaginationModel<ProductModel>> =  this._pagination$.asObservable();

  private _product$: Subject<ProductModel> = new Subject();
  public product$: Observable<ProductModel> = this._product$.asObservable();

  private _products$: Subject<Array<ProductModel>> = new Subject();
  public products$: Observable<Array<ProductModel>> = this._products$.asObservable();
  constructor() { }

  public set pagination(data: PaginationModel<ProductModel>) {
    this._pagination$.next(data);
  }

  public set product(data: ProductModel) {
    this._product$.next(data);
  }

  public set products(data: Array<ProductModel>) {
    this._products$.next(data);
  }
}
