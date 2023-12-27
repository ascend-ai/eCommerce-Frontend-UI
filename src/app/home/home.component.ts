import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { FilterCriteriaModel, PaginationModel, ProductCategory, ProductModel, ProductsBrokerService } from 'src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public categories: Array<string> = Object.values(ProductCategory).filter(value => typeof value === 'string');
  public pagination: PaginationModel<ProductModel> = new PaginationModel();
  private _subscribeMain: boolean = true;
  private DEFAULT_PAGE_SIZE = 3;
  private DEFAULT_PAGE_INDEX = 0;
  private _currentPage: number = this.DEFAULT_PAGE_INDEX;

  constructor(private _productsBroker: ProductsBrokerService) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._getProducts();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }


  private _initSubscriptions(): void {
    this._productsBroker.pagination$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(pagination => {
        this.pagination = pagination;
      });
  }

  public switchPage(pageIndex: number): void {
    this._currentPage = pageIndex;
    this._getProducts()
  }

  private _getProducts(): void {
    this._productsBroker.getProducts(new FilterCriteriaModel({
      page: this._currentPage,
      size: this.DEFAULT_PAGE_SIZE,
      isPopular: true,
    }));
  }
}
