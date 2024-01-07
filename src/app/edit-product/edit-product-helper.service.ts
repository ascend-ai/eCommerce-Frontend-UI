import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  ProductModel
} from 'src/core';

@Injectable()
export class EditProductHelperService {
  private _productForEdit$: BehaviorSubject<ProductModel> = new BehaviorSubject(new ProductModel());
  public productForEdit$: Observable<ProductModel> = this._productForEdit$.asObservable();


  constructor() { }

  public setProductForEdit(product: ProductModel): void {
    this._productForEdit$.next(product);
  }
}
