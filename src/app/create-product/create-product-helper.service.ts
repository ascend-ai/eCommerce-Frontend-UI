import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  ProductModel,
  UseablePushAndPullItemModelType
} from 'src/core';

@Injectable()
export class CreateProductHelperService {
  private _basicDetails$: BehaviorSubject<ProductModel> = new BehaviorSubject(new ProductModel());
  public basicDetails$: Observable<ProductModel> = this._basicDetails$.asObservable();

  private _areBasicDetailsValid$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public areBasicDetailsValid$: Observable<boolean> = this._areBasicDetailsValid$.asObservable();

  private _similarProducts$: BehaviorSubject<Array<UseablePushAndPullItemModelType>> = new BehaviorSubject<Array<UseablePushAndPullItemModelType>>([]);
  public similarProducts$: Observable<Array<UseablePushAndPullItemModelType>> = this._similarProducts$.asObservable();

  private _images$: BehaviorSubject<Array<File>> = new BehaviorSubject<Array<File>>([]);
  public images$: Observable<Array<File>> = this._images$.asObservable();


  constructor() { }

  public load(): void {
    this._basicDetails$.next(new ProductModel());
    this._areBasicDetailsValid$.next(false);
    this._similarProducts$.next([]);
    this._images$.next([]);
  }

  public saveBasicDetails(details: any): void {
    this._basicDetails$.next(new ProductModel(details));
  }

  public setBasicDetailsValidity(validity: boolean): void {
    this._areBasicDetailsValid$.next(validity);
  }

  public saveSimilarProducts(similarProducts: Array<UseablePushAndPullItemModelType>): void {
    this._similarProducts$.next(similarProducts);
  }

  public saveImages(images: Array<File>): void {
    this._images$.next(images);
  }
}
