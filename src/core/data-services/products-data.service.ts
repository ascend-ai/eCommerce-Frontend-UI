import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  environment
} from 'src/environments/environment';
import {
  FilterCriteriaModel
} from '../models';
import {
  Injectable
} from '@angular/core';
import {
  ApiResponseInterface,
  PaginationInterface,
  ProductInterface
} from '../interfaces';

@Injectable()
export class ProductsDataService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getProducts(filterCriteria: FilterCriteriaModel): Observable<ApiResponseInterface<PaginationInterface<ProductInterface>>> {
    const params = this._getQueryParamsForProductFilter(filterCriteria);
    return this._http.get<ApiResponseInterface<PaginationInterface<ProductInterface>>>(
      this._apiUrl + '/products',
      { params }
    );
  }

  public getProductsWithIds(productIds: Array<string>): Observable<ApiResponseInterface<Array<ProductInterface>>> {
    return this._http.post<ApiResponseInterface<Array<ProductInterface>>>(
      this._apiUrl + '/products/with-ids',
      productIds
    );
  }

  public getProduct(productId: string): Observable<ApiResponseInterface<ProductInterface>> {
    return this._http.get<ApiResponseInterface<ProductInterface>>(
      this._apiUrl + `/products/${productId}`);
  }

  public editProductBasicDetails(productId: string, data: Record<string, any>): Observable<ApiResponseInterface<ProductInterface>> {
    return this._http.put<ApiResponseInterface<ProductInterface>>(
      this._apiUrl + `/products/${productId}/basic-details`,
      data
    );
  }

  public addNewProductImage(productId: string, imageData: FormData): Observable<ApiResponseInterface<ProductInterface>> {
    return this._http.post<ApiResponseInterface<ProductInterface>>(
      this._apiUrl + `/products/${productId}/images`,
      imageData
    );
  }

  public deleteProductImage(productId: string, imageId: string): Observable<ApiResponseInterface<ProductInterface>> {
    return this._http.delete<ApiResponseInterface<ProductInterface>>(
      this._apiUrl + `/products/${productId}/images/${imageId}`,
    );
  }

  public reaggangeProductImages(productId: string, imageIds: Array<string>): Observable<ApiResponseInterface<ProductInterface>> {
    return this._http.put<ApiResponseInterface<ProductInterface>>(
      this._apiUrl + `/products/${productId}/images`,
      imageIds
    );
  }

  public updateSimilarProducts(productId: string, similarProducts: Array<string>): Observable<ApiResponseInterface<ProductInterface>> {
    return this._http.put<ApiResponseInterface<ProductInterface>>(
      this._apiUrl + `/products/${productId}/similar-products`,
      similarProducts
    );
  }

  public createProduct(productData: FormData): Observable<ApiResponseInterface<ProductInterface>> {
    return this._http.post<ApiResponseInterface<ProductInterface>>(
      this._apiUrl + '/products',
      productData
    );
  }

  private _getQueryParamsForProductFilter(filterCriteria: FilterCriteriaModel): HttpParams {
    let params = new HttpParams()
      .set('size', filterCriteria.size)
      .set('page', filterCriteria.page);

    if (filterCriteria.category !== undefined) {
      params = params.set('category', filterCriteria.category);
    }

    if (filterCriteria.isPopular !== undefined) {
      params = params.set('isPopular', filterCriteria.isPopular);
    }

    if (filterCriteria.search) {
      params = params.set('search', filterCriteria.search);
    }

    return params;
  }
}
