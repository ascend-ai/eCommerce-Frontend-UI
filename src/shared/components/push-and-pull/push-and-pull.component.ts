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
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Input() itemUnderEdit: UseablePushAndPullItemModelType | undefined;
  @Input() set paginator(pagination: PaginationModel<UseablePushAndPullItemModelType>) {
    this.pagination = pagination;
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
    if (Array.isArray(assigned)) {
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
  }
  @Output() assignedChange: EventEmitter<Array<UseablePushAndPullItemModelType>> = new EventEmitter();
  public items: Array<PushAndPullItemInterface<UseablePushAndPullItemModelType>> = [];
  public assignedItems: Array<PushAndPullItemInterface<UseablePushAndPullItemModelType>> = [];
  public pagination: PaginationModel<UseablePushAndPullItemModelType> = new PaginationModel();

  constructor() {}

  public onSearch(searchText: string): void {
    this.search.emit(searchText);
  }

  public get isAnyItemsSelected(): boolean {
    return this.items.some(item => item.isSelected);
  }
  public get isAnyAssignedItemsSelected(): boolean {
    return this.assignedItems.some(item => item.isSelected);
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
    this.assignedChange.emit(this.assignedItems.map(item => item.data));
  }

  public removeFromAssigned(): void {
    this.assignedItems = this.assignedItems.filter(item => !item.isSelected);
    this.assignedChange.emit(this.assignedItems.map(item => item.data));
  }

  public isItemInAssignedItems(item: PushAndPullItemInterface<UseablePushAndPullItemModelType>): boolean {
    const index = this.assignedItems.findIndex(itm => itm.data._id === item.data._id);
    return index >= 0;
  }

  public isItemUnderEdit(item: PushAndPullItemInterface<UseablePushAndPullItemModelType>): boolean {
    return !!this.itemUnderEdit && (item.data._id === this.itemUnderEdit._id);
  }

  public goToPage(pageIndex: number): void {
    this.page.emit(pageIndex);
  }
}
