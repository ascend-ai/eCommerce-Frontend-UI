import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponseModel, SigninModel } from '../models';
import { Injectable } from '@angular/core';
import { AccessTokenInterface } from '../interfaces';

@Injectable()
export class AuthDataService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public login(siginData: SigninModel): Observable<ApiResponseModel<AccessTokenInterface>> {
    return this._http.post<ApiResponseModel<AccessTokenInterface>>(
      this._apiUrl + '/auth/signin',
      siginData
    );
  }
}
