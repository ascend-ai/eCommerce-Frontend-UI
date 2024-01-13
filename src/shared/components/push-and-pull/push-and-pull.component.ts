import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  PaginationModel,
  ProductModel,
  PushAndPullItemInterface,
  UseablePushAndPullItemModelType,
  UserModel
} from 'src/core';

@Component({
  selector: 'app-push-and-pull',
  templateUrl: './push-and-pull.component.html',
  styleUrls: ['./push-and-pull.component.scss']
})
export class PushAndPullComponent {
  @Output() page: EventEmitter<number> = new EventEmitter();
  @Output() update: EventEmitter<Array<string>> = new EventEmitter();
  @Input() itemUnderEdit!: UseablePushAndPullItemModelType;
  @Input() set paginator(pagination: PaginationModel<UseablePushAndPullItemModelType>) {
    this._pagination = pagination;
    this.items = pagination.content.map(item => {
      if (item instanceof ProductModel) {
        return {
          data: new ProductModel(item),
          isSelected: false,
        };
      }
      return {
        data: new UserModel(item),
        isSelected: false,
      };
    });
  }
  @Input() set assigned(assigned: Array<UseablePushAndPullItemModelType>) {
    this._initiallyAssignedData = assigned;
    this.assignedItems = assigned.map(item => {
      if (item instanceof ProductModel) {
        return {
          data: new ProductModel(item),
          isSelected: false,
        };
      }
      return {
        data: new UserModel(item),
        isSelected: false,
      };
    });
  }
  public items: Array<PushAndPullItemInterface<UseablePushAndPullItemModelType>> = [];
  public assignedItems: Array<PushAndPullItemInterface<UseablePushAndPullItemModelType>> = [];
  private _pagination: PaginationModel<UseablePushAndPullItemModelType> = new PaginationModel();
  private _initiallyAssignedData: Array<UseablePushAndPullItemModelType> = [];

  constructor() {}

  public updateAssignedItems(): void {
    this.update.emit(this.assignedItems.map(item => item.data._id));
  }

  public resetAssignedItems(): void {
    this.assignedItems = this._initiallyAssignedData.map(item => {
      if (item instanceof ProductModel) {
        return {
          data: new ProductModel(item),
          isSelected: false,
        };
      }
      return {
        data: new UserModel(item),
        isSelected: false,
      };
    });
  }

  public get isAnyItemsSelected(): boolean {
    return this.items.some(item => item.isSelected);
  }
  public get isAnyAssignedItemsSelected(): boolean {
    return this.assignedItems.some(item => item.isSelected);
  }

  public get areAssignedItemsChanged(): boolean {
    if (this._initiallyAssignedData.length === this.assignedItems.length) {
      for (let i = 0; i < this._initiallyAssignedData.length; i++) {
        if (this._initiallyAssignedData[i]._id !== this.assignedItems[i].data._id) {
          return true;
        }
      }
      return false;
    }
    return true
  }

  public addToAssigned(): void {
    for (let item of this.items) {
      if (item.isSelected && !this.isItemInAssignedItems(item) && !this.isItemUnderEdit(item)) {
        if (item.data instanceof ProductModel) {
          item.isSelected = false;
          this.assignedItems.push({
            data: new ProductModel(item.data),
            isSelected: false,
          });
        } else if (item.data instanceof UserModel) {
          item.isSelected = false;
          this.assignedItems.push({
            data: new UserModel(item.data),
            isSelected: false,
          });
        }
      }
    }
  }

  public isItemInAssignedItems(item: PushAndPullItemInterface<UseablePushAndPullItemModelType>): boolean {
    const index = this.assignedItems.findIndex(itm => itm.data._id === item.data._id);
    return index >= 0;
  }

  public isItemUnderEdit(item: PushAndPullItemInterface<UseablePushAndPullItemModelType>): boolean {
    return item.data._id === this.itemUnderEdit._id;
  }

  public removeFromAssigned(): void {
    this.assignedItems = this.assignedItems.filter(item => !item.isSelected);
  }

  public get isFirstPage(): boolean {
    return this._pagination.page === 0;
  }

  public get isLastPage(): boolean {
    return (this._pagination.totalPages > 0) ? (this._pagination.page === (this._pagination.totalPages - 1)) : true;
  }

  public get pageIndicator(): string {
    let currentPage = this._pagination.page;
    (this._pagination.totalPages > 0) ? (currentPage++) : null
    return `${currentPage} / ${this._pagination.totalPages}`;
  }

  public goToFirstPage(): void {
    this._goToPage(0);
  }

  public goToPreviousPage(): void {
    this._goToPage(this._pagination.page - 1);
  }

  public goToNextPage(): void {
    this._goToPage(this._pagination.page + 1);
  }

  public goToLastPage(): void {
    this._goToPage(this._pagination.totalPages - 1);
  }

  private _goToPage(pageIndex: number): void {
    this.page.emit(pageIndex);
  }
}
