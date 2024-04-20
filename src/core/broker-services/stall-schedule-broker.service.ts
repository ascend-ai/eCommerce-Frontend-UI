import {
  Injectable
} from '@angular/core';
import {
  StallScheduleDataService
} from '../data-services';
import {
  StallScheduleLoaderService
} from '../loader-services';
import {
  LoadingHelperService,
  NotificationHelperService,
  StallScheduleHelperService
} from '../helper-services';
import {
  PaginationModel,
  StallScheduleFilterCriteriaModel,
  StallScheduleModel
} from '../models';
import {
  catchError,
  finalize,
  of,
  take,
  tap
} from 'rxjs';
import {
  HttpErrorResponse
} from '@angular/common/http';

@Injectable()
export class StallScheduleBrokerService {
constructor(private _stallScheduleData: StallScheduleDataService,
            private _stallScheduleLoader: StallScheduleLoaderService,
            private _stallScheduleHelper: StallScheduleHelperService,
            private _notificationHelper: NotificationHelperService,
            private _loadingHelper: LoadingHelperService) { }

  public getStallSchedules(filterCriteria: StallScheduleFilterCriteriaModel): void {
    this._loadingHelper.startLoading();
    let pagination: PaginationModel<StallScheduleModel> = new PaginationModel();
    this._stallScheduleData.getStallSchedules(filterCriteria)
      .pipe(
        take(1),
        tap(res => {
          pagination = new PaginationModel(res.data);
          pagination.content = this._stallScheduleHelper.transformStallSchedules(pagination.content);
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message)
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._stallScheduleLoader.pagination = pagination;
        })
      )
      .subscribe();
  }

  public createStallSchedule(stallScheduleData: StallScheduleModel): void {
    this._loadingHelper.startLoading();
    let stallSchedule: StallScheduleModel = new StallScheduleModel();
    this._stallScheduleData.createStallSchedule(stallScheduleData)
      .pipe(
        take(1),
        tap(res => {
          stallSchedule = this._stallScheduleHelper.transformStallSchedules([ res.data ])[0];
          this._notificationHelper.handleSuccess('Stall created successfully!');
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message);
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._stallScheduleLoader.stallSchedule = stallSchedule;
        })
      )
      .subscribe();
  }

  public getStallSchedule(stallScheduleId: string): void {
    this._loadingHelper.startLoading();
    let stallSchedule: StallScheduleModel = new StallScheduleModel();
    this._stallScheduleData.getStallSchedule(stallScheduleId)
      .pipe(
        take(1),
        tap(res => {
          stallSchedule = this._stallScheduleHelper.transformStallSchedules([ res.data ])[0];
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message)
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._stallScheduleLoader.stallSchedule = stallSchedule;
        })
      )
      .subscribe();
  }

  public deleteStallSchedule(stallScheduleId: string): void {
    this._loadingHelper.startLoading();
    let stallSchedule: StallScheduleModel = new StallScheduleModel();
    this._stallScheduleData.deleteStallSchedule(stallScheduleId)
      .pipe(
        take(1),
        tap(res => {
          stallSchedule = this._stallScheduleHelper.transformStallSchedules([ res.data ])[0];
          this._notificationHelper.handleSuccess('Stall deleted successfully!');
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message)
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
          this._stallScheduleLoader.deletedStallSchedule = stallSchedule;
        })
      )
      .subscribe();
  }

  public updateStallScheduleBasicDetails(stallScheduleId: string, basicDetails: StallScheduleModel): void {
    this._loadingHelper.startLoading();
    let stallSchedule: StallScheduleModel = new StallScheduleModel();
    this._stallScheduleData.updateStallScheduleBasicDetails(stallScheduleId, basicDetails)
      .pipe(
        take(1),
        tap(res => {
          stallSchedule = this._stallScheduleHelper.transformStallSchedules([ res.data ])[0];
          this._notificationHelper.handleSuccess('Stall updated successfully!');
        }),
        catchError((err: HttpErrorResponse) => {
          this._notificationHelper.handleError(err.error.message);
          return of();
        }),
        finalize(() => {
          this._loadingHelper.stopLoading();
        })
      )
      .subscribe();
  }
}
