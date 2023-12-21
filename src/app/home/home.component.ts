import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { PaginationModel, ProductCategory, ProductModel, ProductsBrokerService } from 'src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public categories: Array<string> = Object.values(ProductCategory).filter(value => typeof value === 'string');
  public pagination: PaginationModel<ProductModel> = new PaginationModel();
  private _subscribeMain: boolean = true;
  private DEFAULT_PAGE_SIZE = 6;
  private DEFAULT_PAGE_INDEX = 0;

  constructor(private _productsBroker: ProductsBrokerService) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._productsBroker.getProducts(
        this.DEFAULT_PAGE_SIZE,
        this.DEFAULT_PAGE_INDEX
    );
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }


  private _initSubscriptions(): void {
    this._productsBroker.pagination$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(val => {
        this.pagination = val;
      });
  }
}
