import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject
} from 'rxjs';
import {
  ProductModel
} from 'src/core';

@Injectable()
export class EditProductHelperService {
  private _productForEdit$: BehaviorSubject<ProductModel> = new BehaviorSubject(new ProductModel());
  public productForEdit$: Observable<ProductModel> = this._productForEdit$.asObservable();

  private _isTabChangeAllowed$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isTabChangeAllowed$: Observable<boolean> = this._isTabChangeAllowed$.asObservable();

  private _tab$: Subject<string> = new Subject();
  public tab$: Observable<string> = this._tab$.asObservable();


  constructor() { }

  public set productForEdit(product: ProductModel) {
    this._productForEdit$.next(product);
  }

  public set isTabChangeAllowed(val: boolean) {
    this._isTabChangeAllowed$.next(val);
  }

  public set tab(val: string) {
    this._tab$.next(val);
  }
}
