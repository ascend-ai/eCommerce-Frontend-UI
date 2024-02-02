import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  ApiResponseInterface,
  PaginationInterface,
  UserInterface
} from '../interfaces';
import {
  HttpClient, HttpParams
} from '@angular/common/http';
import {
  environment
} from 'src/environments/environment';
import { UserFilterCriteriaModel } from '../models';

@Injectable()
export class UserDataService {
  private readonly API_URL: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  public getUser(userId: string): Observable<ApiResponseInterface<UserInterface>> {
    return this._http.get<ApiResponseInterface<UserInterface>>(
      this.API_URL + `/users/${userId}`
    );
  }

  public getUsers(filterCriteria: UserFilterCriteriaModel): Observable<ApiResponseInterface<PaginationInterface<UserInterface>>> {
    const params = this._getQueryParamsForUserFilter(filterCriteria);
    return this._http.get<ApiResponseInterface<PaginationInterface<UserInterface>>>(
      this.API_URL + '/users',
      { params }
    );
  }

  public getModeratorList(): Observable<ApiResponseInterface<Array<UserInterface>>> {
    return this._http.get<ApiResponseInterface<Array<UserInterface>>>(
      this.API_URL + '/users/moderators'
    );
  }

  public updateModeratorList(newModerators: Array<string>): Observable<ApiResponseInterface<Array<UserInterface>>> {
    return this._http.put<ApiResponseInterface<Array<UserInterface>>>(
      this.API_URL + '/users/moderators',
      newModerators
    );
  }

  public updateUserBasicDetails(userId: string, data: Record<string, any>): Observable<ApiResponseInterface<UserInterface>> {
    return this._http.put<ApiResponseInterface<UserInterface>>(
      this.API_URL + `/users/${userId}/basic-details`,
      data
    );
  }

  private _getQueryParamsForUserFilter(filterCriteria: UserFilterCriteriaModel): HttpParams {
    let params = new HttpParams()
      .set('size', filterCriteria.size)
      .set('page', filterCriteria.page)
      .set('sort', `${filterCriteria.sortColumn},${filterCriteria.sortDirection}`);

    if (filterCriteria.role !== undefined) {
      params = params.set('role', filterCriteria.role);
    }

    if (filterCriteria.search) {
      params = params.set('search', filterCriteria.search);
    }

    return params;
  }
}
