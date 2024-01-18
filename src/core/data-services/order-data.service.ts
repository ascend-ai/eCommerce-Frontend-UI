import {
  Injectable
} from '@angular/core';
import {
  environment
} from 'src/environments/environment';
import {
  ApiResponseInterface,
  OrderInterface
} from '../interfaces';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

@Injectable()
export class OrderDataService {
  private readonly API_URL: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  public createOrder(purchases: Record<string, number>): Observable<ApiResponseInterface<OrderInterface>> {
    return this._http.post<ApiResponseInterface<OrderInterface>>(
      this.API_URL + '/orders',
      purchases
    );
  }


}
