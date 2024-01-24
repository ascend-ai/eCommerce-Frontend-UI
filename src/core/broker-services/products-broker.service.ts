import {
  Injectable
} from '@angular/core';
import {
  ProductsDataService
} from '../data-services';
import {
  LoadingHelperService,
  NotificationHelperService,
  ProductHelperService
} from '../helper-services';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  catchError,
  mergeMap,
  of,
  take,
  tap
} from 'rxjs';
import {
  ProductFilterCriteriaModel,
  PaginationModel,
  ProductModel
} from '../models';
import {
  ProductLoaderService
} from '../loader-services';

@Injectable()
export class ProductsBrokerService {

  constructor(private _productsData: ProductsDataService,
              private _productLoader: ProductLoaderService,
              private _productHelper: ProductHelperService,
              private _notificationHelper: NotificationHelperService,
              private _loadingHelper: LoadingHelperService) { }

  public getProducts(filterCriteria: ProductFilterCriteriaModel): void {
    this._loadingHelper.startLoading();
    this._productsData.getProducts(filterCriteria)
      .pipe(
        take(1),
        tap(res => {
          this._loadingHelper.stopLoading();
          const pagination = new PaginationModel(res.data);
          pagination.content = this._productHelper.transformProducts(pagination.content);
          this._productLoader.pagination = pagination;
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._productLoader.pagination = new PaginationModel();
          this._notificationHelper.handleError(err.error.message)
          return of();
        })
      )
      .subscribe();
  }

  public getProductsWithIds(productIds: Array<string>): void {
    this._loadingHelper.startLoading();
    let products: Array<ProductModel> = [];
    this._productsData.getProductsWithIds(productIds)
      .pipe(
        take(1),
        tap(res => {
          this._loadingHelper.stopLoading();
          products = this._productHelper.transformProducts(res.data);
          this._productLoader.products = products;
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._productLoader.products = products;
          this._notificationHelper.handleError(err.error.message);
          return of();
        })
      )
      .subscribe();
  }

  public editProductBasicDetails(productId: string, data: Record<string, any>): void {
    this._loadingHelper.startLoading();
    let product: ProductModel = new ProductModel();
    this._productsData.editProductBasicDetails(productId, data)
      .pipe(
        take(1),
        mergeMap(res => {
          product = this._productHelper.transformProducts([res.data])[0];
          return this._productsData.getProductsWithIds(product.similarProducts);
        }),
        tap(res => {
          this._loadingHelper.stopLoading();
          product.similarProducts = this._productHelper.transformProducts(res.data);
          this._productLoader.product = product;
          this._notificationHelper.handleSuccess('Product updated!');
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._notificationHelper.handleError(err.error.message);
          return of();
        })
      )
      .subscribe();
  }

  public addNewProductImage(productId: string, imageData: FormData): void {
    this._loadingHelper.startLoading();
    let product: ProductModel = new ProductModel();
    this._productsData.addNewProductImage(productId, imageData)
      .pipe(
        take(1),
        mergeMap(res => {
          product = this._productHelper.transformProducts([res.data])[0];
          return this._productsData.getProductsWithIds(product.similarProducts);
        }),
        tap(res => {
          this._loadingHelper.stopLoading();
          product.similarProducts = this._productHelper.transformProducts(res.data);
          this._productLoader.product = product;
          this._notificationHelper.handleSuccess('Product updated!');
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._notificationHelper.handleError(err.error.message);
          return of();
        })
      )
      .subscribe();
  }

  public deleteProductImage(productId: string, imageId: string): void {
    this._loadingHelper.startLoading();
    let product: ProductModel = new ProductModel();
    this._productsData.deleteProductImage(productId, imageId)
      .pipe(
        take(1),
        mergeMap(res => {
          product = this._productHelper.transformProducts([res.data])[0];
          return this._productsData.getProductsWithIds(product.similarProducts);
        }),
        tap(res => {
          this._loadingHelper.stopLoading();
          product.similarProducts = this._productHelper.transformProducts(res.data);
          this._productLoader.product = product;
          this._notificationHelper.handleSuccess('Product updated!');
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._notificationHelper.handleError(err.error.message);
          return of();
        })
      )
      .subscribe();
  }

  public rearrangeProductImages(productId: string, imageIds: Array<string>): void {
    this._loadingHelper.startLoading();
    let product: ProductModel = new ProductModel();
    this._productsData.reaggangeProductImages(productId, imageIds)
      .pipe(
        take(1),
        mergeMap(res => {
          product = this._productHelper.transformProducts([res.data])[0];
          return this._productsData.getProductsWithIds(product.similarProducts);
        }),
        tap(res => {
          this._loadingHelper.stopLoading();
          product.similarProducts = this._productHelper.transformProducts(res.data);
          this._productLoader.product = product;
          this._notificationHelper.handleSuccess('Product updated!');
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._notificationHelper.handleError(err.error.message);
          return of();
        })
      )
      .subscribe();
  }

  public updateSimilarProducts(productId: string, similarProductIds: Array<string>): void {
    this._loadingHelper.startLoading();
    let product: ProductModel = new ProductModel();
    this._productsData.updateSimilarProducts(productId, similarProductIds)
      .pipe(
        take(1),
        mergeMap(res => {
          product = this._productHelper.transformProducts([res.data])[0];
          return this._productsData.getProductsWithIds(product.similarProducts);
        }),
        tap(res => {
          this._loadingHelper.stopLoading();
          product.similarProducts = this._productHelper.transformProducts(res.data);
          this._productLoader.product = product;
          this._notificationHelper.handleSuccess('Product updated!');
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._notificationHelper.handleError(err.error.message);
          return of();
        })
      )
      .subscribe();
  }

  public createProduct(productData: FormData): void {
    this._loadingHelper.startLoading();
    let product: ProductModel = new ProductModel();
    this._productsData.createProduct(productData)
      .pipe(
        take(1),
        mergeMap(res => {
          product = this._productHelper.transformProducts([res.data])[0];
          return this._productsData.getProductsWithIds(product.similarProducts);
        }),
        tap(res => {
          this._loadingHelper.stopLoading();
          product.similarProducts = this._productHelper.transformProducts(res.data);
          this._productLoader.product = product;
          this._notificationHelper.handleSuccess('Product created successfully!');
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._notificationHelper.handleError(err.error.message);
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
          product = this._productHelper.transformProducts([res.data])[0];
          return this._productsData.getProductsWithIds(product.similarProducts);
        }),
        tap(res => {
          this._loadingHelper.stopLoading();
          product.similarProducts = this._productHelper.transformProducts(res.data);
          this._productLoader.product = product;
        }),
        catchError((err: HttpErrorResponse) => {
          this._loadingHelper.stopLoading();
          this._productLoader.product = product;
          this._notificationHelper.handleError(err.error.message)
          return of();
        })
      )
      .subscribe();
  }
}
