import { Injectable } from '@angular/core';
import { ProductsDataService } from '../data-services';
import { LoadingHelperService, NotificationHelperService } from '../helper-services';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, of, take, tap } from 'rxjs';
import { ProductImageInterface, ProductInterface } from '../interfaces';
import { PaginationModel, ProductImageModel, ProductModel } from '../models';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductsBrokerService {
  private _baseUrl: string = environment.baseUrl;
  private _pagination$: Subject<PaginationModel<ProductModel>> = new Subject();
  public pagination$: Observable<PaginationModel<ProductModel>> =  this._pagination$.asObservable();


  constructor(private _productsData: ProductsDataService,
              private _notificationHelper: NotificationHelperService,
              private _loadingHelper: LoadingHelperService) { }

  public getProducts(size: number,
                     page: number): void {
    this._loadingHelper.startLoading();
    this._productsData.getProducts(size, page)
      .pipe(
        take(1),
        tap(res => {
          this._loadingHelper.stopLoading();
          const pagination = (new PaginationModel(res.data));
          pagination.content = this._transformProducts(pagination.content);
          this._pagination$.next(<PaginationModel<ProductModel>>pagination);
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();

          return of();
        }),
      )
      .subscribe();
  }

  private _transformProducts(products: Array<ProductInterface>): Array<ProductModel> {
    return products.map(data => {
      const product = new ProductModel(data);
      product.images = this._transformProductImages(product.images);
      product.displayImage = product.images[0];
      return product;
    })
  }

  private _transformProductImages(productImages: Array<ProductImageInterface>): Array<ProductImageModel> {
    return productImages.map(data => {
      const img = new ProductImageModel(data);
      img.url = this._baseUrl + img.url;
      return img;
    });
  }
}
