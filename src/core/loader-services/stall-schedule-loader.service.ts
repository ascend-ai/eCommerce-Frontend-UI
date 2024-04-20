import {
  Injectable
} from '@angular/core';
import {
  PaginationModel,
  StallScheduleModel
} from '../models';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StallScheduleLoaderService {
  private _pagination$: Subject<PaginationModel<StallScheduleModel>> = new Subject();
  public pagination$: Observable<PaginationModel<StallScheduleModel>> =  this._pagination$.asObservable();

  private _stallSchedule$: Subject<StallScheduleModel> = new Subject();
  public stallSchedule$: Observable<StallScheduleModel> = this._stallSchedule$.asObservable();

  private _deletedStallSchedule$: Subject<StallScheduleModel> = new Subject();
  public deletedStallSchedule$: Observable<StallScheduleModel> = this._deletedStallSchedule$.asObservable();

  constructor() { }

  public set stallSchedule(stallSchedule: StallScheduleModel) {
    this._stallSchedule$.next(stallSchedule);
  }

  public set deletedStallSchedule(stallSchedule: StallScheduleModel) {
    this._deletedStallSchedule$.next(stallSchedule);
  }

  public set pagination(data: PaginationModel<StallScheduleModel>) {
    this._pagination$.next(data);
  }
}
