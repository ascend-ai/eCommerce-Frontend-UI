import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponseModel, SigninModel } from '../models';
import { Injectable } from '@angular/core';
import { AccessTokenInterface, PaginationInterface, ProductInterface } from '../interfaces';

@Injectable()
export class ProductsDataService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getProducts(size: number,
                     page: number): Observable<ApiResponseModel<PaginationInterface<ProductInterface>>> {
    const params = new HttpParams()
      .set('size', size)
      .set('page', page);
    return this._http.get<ApiResponseModel<PaginationInterface<ProductInterface>>>(
      this._apiUrl + '/products',
      { params }
    );
  }
}
