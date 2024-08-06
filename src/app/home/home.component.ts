import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  takeWhile
} from 'rxjs';
import {
  CartHelperService,
  DEFAULT_PAGE_INDEX,
  ProductFilterCriteriaModel,
  PaginationModel,
  ProductCategory,
  ProductLoaderService,
  ProductModel,
  ProductsBrokerService,
  ProductPaginationType,
  PRODUCT_SORTABLE_COLUMN,
  JewelleryCareInterface,
  JEWELLERY_CARE,
} from 'src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public categories: Array<ProductCategory> = Object.values(ProductCategory).filter(value => typeof value === 'string');
  public pinnedPagination: PaginationModel<ProductModel> = new PaginationModel();
  public latestPagination: PaginationModel<ProductModel> = new PaginationModel();
  public popularPagination: PaginationModel<ProductModel> = new PaginationModel();
  private readonly DEFAULT_PAGE_SIZE = 3;
  private _pinnedPaginationFilter: ProductFilterCriteriaModel = new ProductFilterCriteriaModel({
    page: DEFAULT_PAGE_INDEX,
    size: this.DEFAULT_PAGE_SIZE,
    isPinned: true
  });
  private _latestPaginationFilter: ProductFilterCriteriaModel = new ProductFilterCriteriaModel({
    page: DEFAULT_PAGE_INDEX,
    size: this.DEFAULT_PAGE_SIZE,
  });
  private _popularPaginationFilter: ProductFilterCriteriaModel = new ProductFilterCriteriaModel({
    page: DEFAULT_PAGE_INDEX,
    size: this.DEFAULT_PAGE_SIZE,
    sortColumn: PRODUCT_SORTABLE_COLUMN.totalPurchases,
  });
  public get ProductPaginationType(): typeof ProductPaginationType {
    return ProductPaginationType;
  }
  public readonly JEWELLERY_CARE_DATA: readonly JewelleryCareInterface[] = JEWELLERY_CARE;
  private _subscribeMain: boolean = true;
  @ViewChild('shopByCategory') private _shopByCategory!: ElementRef;


  constructor(private _productsBroker: ProductsBrokerService,
              private _productLoader: ProductLoaderService,
              private _cartHelper: CartHelperService,
              private _router: Router) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._productsBroker.getInitialDataRequiredForHomePage(
      this._pinnedPaginationFilter,
      this._latestPaginationFilter,
      this._popularPaginationFilter
    )
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }


  private _initSubscriptions(): void {
    this._productLoader.pinnedPagination$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(pagination => {
        this.pinnedPagination = pagination;
      });

    this._productLoader.latestPagination$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(pagination => {
        this.latestPagination = pagination;
      });

    this._productLoader.popularPagination$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(pagination => {
        this.popularPagination = pagination;
      });
  }

  public switchPage(pageIndex: number, paginationType: ProductPaginationType): void {
    switch (paginationType) {
      case ProductPaginationType.PINNED:
        this._pinnedPaginationFilter.page = pageIndex;
        this._getProducts(paginationType);
        break;
      case ProductPaginationType.LATEST:
        this._latestPaginationFilter.page = pageIndex;
        this._getProducts(paginationType);
        break;
      case ProductPaginationType.POPULAR:
        this._popularPaginationFilter.page = pageIndex;
        this._getProducts(paginationType);
        break;
    }
  }

  private _getProducts(paginationType: ProductPaginationType): void {
    switch (paginationType) {
      case ProductPaginationType.PINNED:
        this._productsBroker.getProducts(
          this._pinnedPaginationFilter,
          paginationType
        );
        break;
      case ProductPaginationType.LATEST:
        this._productsBroker.getProducts(
          this._latestPaginationFilter,
          paginationType
        );
        break;
      case ProductPaginationType.POPULAR:
        this._productsBroker.getProducts(
          this._popularPaginationFilter,
          paginationType
        );
        break;
    }
  }

  public addProductToCart(product: ProductModel): void {
    if (product.customizationTextRange.min === 0 &&
        product.customizationTextRange.max === 0) {
      this._cartHelper.addProduct(
        product._id,
        product.quantityInStock,
        1,
        ''
      );
    }
  }

  public showProductsOfCategory(category: ProductCategory): void {
    this._router.navigate(['products'], {
      queryParams: {
        category: category
      },
    })
  }

  public scrollToCategory(): void {
    this._shopByCategory?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
