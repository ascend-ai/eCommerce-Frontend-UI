import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationModel, ProductModel } from 'src/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() paginator: PaginationModel<ProductModel> = new PaginationModel();
  @Output() page: EventEmitter<number> = new EventEmitter();
  @Output() addToCart: EventEmitter<ProductModel> = new EventEmitter();

  constructor() {}

  public goToPage(pageIndex: number): void {
    this.page.emit(pageIndex);
  }

  public addProductToCard(product: ProductModel): void {
    this.addToCart.emit(product)
  }

}
