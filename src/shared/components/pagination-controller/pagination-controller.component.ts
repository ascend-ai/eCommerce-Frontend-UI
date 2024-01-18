import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationModel } from 'src/core';

@Component({
  selector: 'app-pagination-controller',
  templateUrl: './pagination-controller.component.html',
  styleUrls: ['./pagination-controller.component.scss']
})
export class PaginationControllerComponent {
  @Input() paginator: PaginationModel<any> = new PaginationModel();
  @Output() page: EventEmitter<number> = new EventEmitter();

  public get isFirstPage(): boolean {
    return this.paginator.page === 0;
  }

  public get isLastPage(): boolean {
    return (this.paginator.totalPages > 0) ? (this.paginator.page === (this.paginator.totalPages - 1)) : true;
  }

  public get pageIndicator(): string {
    let currentPage = this.paginator.page;
    (this.paginator.totalPages > 0) ? (currentPage++) : null
    return `${currentPage} / ${this.paginator.totalPages}`;
  }

  constructor() {}

  public goToFirstPage(): void {
    if (!this.isFirstPage) {
      this._goToPage(0);
    }
  }

  public goToPreviousPage(): void {
    if (!this.isFirstPage) {
      this._goToPage(this.paginator.page - 1);
    }
  }

  public goToNextPage(): void {
    if (!this.isLastPage) {
      this._goToPage(this.paginator.page + 1);
    }
  }

  public goToLastPage(): void {
    if (!this.isLastPage) {
      this._goToPage(this.paginator.totalPages - 1);
    }
  }

  private _goToPage(pageIndex: number): void {
    this.page.emit(pageIndex);
  }
}
