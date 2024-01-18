import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  environment
} from 'src/environments/environment';
import {
  ApiResponseModel,
  SigninModel,
  UserModel
} from '../models';
import {
  Injectable
} from '@angular/core';
import {
  AccessTokenInterface,
  UserInterface
} from '../interfaces';

@Injectable()
export class AuthDataService {
  private readonly API_URL: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public login(siginData: SigninModel): Observable<ApiResponseModel<AccessTokenInterface>> {
    return this._http.post<ApiResponseModel<AccessTokenInterface>>(
      this.API_URL + '/auth/signin',
      siginData
    );
  }

  public register(sigupData: UserModel): Observable<ApiResponseModel<UserInterface>> {
    return this._http.post<ApiResponseModel<UserInterface>>(
      this.API_URL + '/auth/signup',
      sigupData
    );
  }
}
