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

  public get isFirstPage(): boolean { return this.paginator.page === 0; }

  public get isLastPage(): boolean { return this.paginator.page === (this.paginator.totalPages - 1); }

  constructor() {}

  public goToFirstPage(): void {
    this._goToPage(0);
  }

  public goToPreviousPage(): void {
    this._goToPage(this.paginator.page - 1);
  }

  public goToNextPage(): void {
    this._goToPage(this.paginator.page + 1);
  }

  public goToLastPage(): void {
    this._goToPage(this.paginator.totalPages - 1);
  }


  private _goToPage(pageIndex: number): void {
    this.page.emit(pageIndex);
  }

  public addProductToCard(product: ProductModel): void {
    this.addToCart.emit(product)
  }

}
