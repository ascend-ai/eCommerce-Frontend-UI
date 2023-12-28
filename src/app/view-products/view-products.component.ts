import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, of, takeWhile, tap } from 'rxjs';
import { CartHelperService, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, FilterCriteriaModel, PaginationModel, ProductModel, ProductsBrokerService } from 'src/core';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit, OnDestroy {
  private _subscribeMain: boolean = true;
  public pagination: PaginationModel<ProductModel> = new PaginationModel();
  private _filter: FilterCriteriaModel = new FilterCriteriaModel({
    page: DEFAULT_PAGE_INDEX,
    size: DEFAULT_PAGE_SIZE
  });

  constructor(private _productsBroker: ProductsBrokerService,
              private _cartHelper: CartHelperService,
              private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._initSubscription();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscription(): void {
    this._productsBroker.pagination$
    .pipe(takeWhile(() => this._subscribeMain))
    .subscribe(pagination => {
      this.pagination = pagination;
    });

    this._route.queryParams
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(query => {
        const {category} = query;
        if (category) {
          this._filter.category = category;
        }
        this._getProducts();
      });
  }

  public switchPage(pageIndex: number): void {
    this._filter.page = pageIndex;
    this._getProducts();
  }

  private _getProducts(): void {
    this._productsBroker.getProducts(this._filter);
  }

  public addProductToCart(product: ProductModel): void {
    this._cartHelper.addProduct(product, 1);
  }
}
