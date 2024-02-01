import { Component, Input } from '@angular/core';
import { ProductModel, PushAndPullItemInterface, UseablePushAndPullItemModelType } from 'src/core';

enum PushAndPullItemType {
  PRODUCT = 'PRODUCT',
  USER = 'USER',
}

@Component({
  selector: 'app-pnp-item',
  templateUrl: './pnp-item.component.html',
  styleUrls: ['./pnp-item.component.scss']
})
export class PnpItemComponent {
  @Input() set init(item: PushAndPullItemInterface<UseablePushAndPullItemModelType>) {
    this.item = item;
    if (item.data instanceof ProductModel) {
      this.itemType = PushAndPullItemType.PRODUCT;
    } else {
      this.itemType = PushAndPullItemType.USER
    }
  };
  @Input() isDisabled: boolean = false;
  public get PushAndPullItemType(): typeof PushAndPullItemType {
    return PushAndPullItemType;
  }
  public itemType!: PushAndPullItemType;
  public item!: PushAndPullItemInterface<any>;
}
