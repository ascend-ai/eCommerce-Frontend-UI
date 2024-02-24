import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  ProductCategory
} from 'src/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() categoryName: ProductCategory = ProductCategory.OTHERS;
  @Output() filterByCategory: EventEmitter<ProductCategory> = new EventEmitter();
  constructor() {}

  public onClickCard(): void {
    this.filterByCategory.emit(this.categoryName);
  }
}
