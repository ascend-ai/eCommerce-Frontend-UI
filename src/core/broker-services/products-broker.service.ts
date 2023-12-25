import { Injectable } from '@angular/core';
import { ProductsDataService } from '../data-services';
import { LoadingHelperService, NotificationHelperService } from '../helper-services';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, mergeMap, of, take, tap } from 'rxjs';
import { ProductImageInterface, ProductInterface } from '../interfaces';
import { FilterCriteriaModel, PaginationModel, ProductImageModel, ProductModel } from '../models';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductsBrokerService {
  private _baseUrl: string = environment.baseUrl;
  private _pagination$: Subject<PaginationModel<ProductModel>> = new Subject();
  public pagination$: Observable<PaginationModel<ProductModel>> =  this._pagination$.asObservable();

  private _product$: Subject<ProductModel> = new Subject();
  public product$: Observable<ProductModel> = this._product$.asObservable();


  constructor(private _productsData: ProductsDataService,
              private _notificationHelper: NotificationHelperService,
              private _loadingHelper: LoadingHelperService) { }

  public getProducts(filterCriteria: FilterCriteriaModel): void {
    this._loadingHelper.startLoading();
    this._productsData.getProducts(filterCriteria)
      .pipe(
        take(1),
        tap(res => {
          this._loadingHelper.stopLoading();
          const pagination = new PaginationModel(res.data);
          pagination.content = this._transformProducts(pagination.content);
          this._pagination$.next(<PaginationModel<ProductModel>>pagination);
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._pagination$.next(new PaginationModel());
          this._notificationHelper.handleError(err.error.message)
          return of();
        })
      )
      .subscribe();
  }

  public getProduct(productId: string): void {
    this._loadingHelper.startLoading();
    let product: ProductModel = new ProductModel();
    this._productsData.getProduct(productId)
      .pipe(
        take(1),
        mergeMap(res => {
          product = this._transformProducts([res.data])[0];
          return this._productsData.getProductsWithIds(product.similarProducts);
        }),
        tap(res => {
          this._loadingHelper.stopLoading();
          product.similarProducts = this._transformProducts(res.data);
          this._product$.next(product);
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._product$.next(product);
          this._notificationHelper.handleError(err.error.message)
          return of();
        })
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
