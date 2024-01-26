import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  takeWhile
} from 'rxjs';
import {
  AuthHelperService,
  DEFAULT_PAGE_INDEX,
  PaginationModel,
  UseablePushAndPullItemModelType,
  UserBrokerService,
  UserFilterCriteriaModel,
  UserLoaderService,
  UserModel
} from 'src/core';

@Component({
  selector: 'app-manage-mods',
  templateUrl: './manage-mods.component.html',
  styleUrls: ['./manage-mods.component.scss']
})
export class ManageModsComponent implements OnInit, OnDestroy {
  public pagination: PaginationModel<UseablePushAndPullItemModelType> = new PaginationModel();
  public moderators: Array<UseablePushAndPullItemModelType> = [];
  public admin: UseablePushAndPullItemModelType = new UserModel();
  private _filter: UserFilterCriteriaModel = new UserFilterCriteriaModel({
    page: DEFAULT_PAGE_INDEX,
    size: 4
  });

  /**
   * Initializing moderators
   */
  private _moderators: Array<UseablePushAndPullItemModelType> = [];
  private get _loggedInUserId(): string {
    return this._authHelper.isLoggedIn ? this._authHelper.loggedInUserId : '';
  }
  private _subscribeMain: boolean = true;

  constructor(private _userBroker: UserBrokerService,
              private _userLoader: UserLoaderService,
              private _authHelper: AuthHelperService) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._userBroker.getInitialDataRequiredForManagingMods(
      this._loggedInUserId,
      this._filter
    );
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._userLoader.user$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(user => {
        this.admin = user;
      });
    
    this._userLoader.users$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(users => {
        this._moderators = users;
        this.moderators = users;
      });

    this._userLoader.pagination$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(pagination => {
        this.pagination = pagination;
      });
  }

  public onSearch(searchedValue: string): void {
    this._filter.search = searchedValue;
    this._filter.page = DEFAULT_PAGE_INDEX;
    this._getUsers();
  }

  private _getUsers(): void {
    this._userBroker.getUsers(this._filter);
  }


  public goToPage(pageIndex: number): void {
    this._filter.page = pageIndex;
    this._getUsers();
  }

  public onUpdate(): void {
    this._userBroker.updateModeratorList(
      this.moderators.map(user => user._id)
    )
  }

  public resetSimilarProductsItems(): void {
    this.moderators = this._moderators;
  }

  public get areSimilarProductsChanged(): boolean {
    if (this.moderators.length === this._moderators.length) {
      for (let i = 0; i < this._moderators.length; i++) {
        if (this._moderators[i]._id !== this.moderators[i]._id) {
          return true;
        }
      }
      return false;
    }
    return true
  }
}
