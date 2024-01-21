import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  ApiResponseInterface,
  UserInterface
} from '../interfaces';
import {
  HttpClient
} from '@angular/common/http';
import {
  environment
} from 'src/environments/environment';

@Injectable()
export class UserDataService {
  private readonly API_URL: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  public getUser(userId: string): Observable<ApiResponseInterface<UserInterface>> {
    return this._http.get<ApiResponseInterface<UserInterface>>(
      this.API_URL + `/users/${userId}`
    );
  }
}
