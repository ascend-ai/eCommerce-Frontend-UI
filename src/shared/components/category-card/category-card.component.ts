import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCategory } from 'src/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() categoryName: ProductCategory = ProductCategory.OTHERS;
  @Output() filterByCategory: EventEmitter<ProductCategory> = new EventEmitter();
  constructor() {}

  public capitalizeCategoryName(categoryName: string): string {
    return categoryName
      .split('_')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ')
      .trim();
  }

  public getCategoryImagePath(categoryName: string): string {
    return `url('/assets/images/category-${categoryName}.jpg')`;
  }

  public onClickCard(): void {
    this.filterByCategory.emit(this.categoryName);
  }
}
