import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  takeWhile
} from 'rxjs';
import {
  AuthHelperService,
  DEFAULT_PAGE_INDEX,
  PaginationModel,
  STALL_SCHEDULE_SORTABLE_COLUMN,
  SortDirection,
  StallScheduleBrokerService,
  StallScheduleFilterCriteriaModel,
  StallScheduleLoaderService,
  StallScheduleModel
} from 'src/core';

@Component({
  selector: 'app-manage-stall-schedules',
  templateUrl: './manage-stall-schedules.component.html',
  styleUrls: ['./manage-stall-schedules.component.scss']
})
export class ManageStallSchedulesComponent implements OnInit, OnDestroy {
  private _subscribeMain: boolean = true;
  public pagination: PaginationModel<StallScheduleModel> = new PaginationModel();
  private readonly DEFAULT_PAGE_SIZE = 5;
  private _filter: StallScheduleFilterCriteriaModel = new StallScheduleFilterCriteriaModel({
    page: DEFAULT_PAGE_INDEX,
    size: this.DEFAULT_PAGE_SIZE,
    sortColumn: STALL_SCHEDULE_SORTABLE_COLUMN.date,
    sortDirection: SortDirection.asc
  });
  public get isLoggedInUserAdminOrMod(): boolean {
    return this._authHelper.isLoggedIn && this._authHelper.isLoggedInUserAdminOrMod;
  }


  constructor(private _stallScheduleBroker: StallScheduleBrokerService,
              private _stallScheduleLoader: StallScheduleLoaderService,
              private _authHelper: AuthHelperService,
              private _router: Router,
              private _route: ActivatedRoute) {}


  ngOnInit(): void {
    this._initSubscriptions();
    this._getStallSchedules();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._stallScheduleLoader.pagination$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(pagination => this.pagination = pagination);
  }

  public switchPage(pageIndex: number): void {
    this._filter.page = pageIndex;
    this._getStallSchedules();
  }

  private _getStallSchedules(): void {
    this._stallScheduleBroker.getStallSchedules(this._filter);
  }

  public editSchedule(scheduleId: string): void {
    this._router.navigate([ scheduleId, 'edit' ], {
      relativeTo: this._route
    })
  }

  public addNewSchedule(): void {
    this._router.navigate(['create'], {
      relativeTo: this._route,
    })
  }


}
