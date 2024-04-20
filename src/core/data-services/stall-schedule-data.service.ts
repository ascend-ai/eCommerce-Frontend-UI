import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  environment
} from 'src/environments/environment';
import {
  StallScheduleFilterCriteriaModel,
  StallScheduleModel
} from '../models';
import { Observable } from 'rxjs';
import { ApiResponseInterface, PaginationInterface, StallScheduleInterface } from '../interfaces';

@Injectable()
export class StallScheduleDataService {
  private readonly API_URL: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  public createStallSchedule(stallScheduleData: StallScheduleModel): Observable<ApiResponseInterface<StallScheduleInterface>> {
    return this._http.post<ApiResponseInterface<StallScheduleInterface>>(
      this.API_URL + '/stall-schedules',
      stallScheduleData
    );
  }

  public updateStallScheduleBasicDetails(stallScheduleId: string, basicDetails: StallScheduleModel): Observable<ApiResponseInterface<StallScheduleInterface>> {
    return this._http.put<ApiResponseInterface<StallScheduleInterface>>(
      this.API_URL + `/stall-schedules/${stallScheduleId}/basic-details`,
      basicDetails
    );
  }

  public deleteStallSchedule(stallScheduleId: string): Observable<ApiResponseInterface<StallScheduleInterface>> {
    return this._http.delete<ApiResponseInterface<StallScheduleInterface>>(
      this.API_URL + `/stall-schedules/${stallScheduleId}`,
    );
  }

  public getStallSchedule(stallScheduleId: string): Observable<ApiResponseInterface<StallScheduleInterface>> {
    return this._http.get<ApiResponseInterface<StallScheduleInterface>>(
      this.API_URL + `/stall-schedules/${stallScheduleId}`,
    );
  }

  public getStallSchedules(filterCriteria: StallScheduleFilterCriteriaModel): Observable<ApiResponseInterface<PaginationInterface<StallScheduleInterface>>> {
    const params = this._getQueryParamsForStallScheduleFilter(filterCriteria);
    return this._http.get<ApiResponseInterface<PaginationInterface<StallScheduleInterface>>>(
      this.API_URL + `/stall-schedules`,
      { params }
    );
  }

  private _getQueryParamsForStallScheduleFilter(filterCriteria: StallScheduleFilterCriteriaModel): HttpParams {
    let params = new HttpParams()
      .set('size', filterCriteria.size)
      .set('page', filterCriteria.page)
      .set('sort', `${filterCriteria.sortColumn},${filterCriteria.sortDirection}`);

    return params;
  }
}
