import {
  Component,
  OnDestroy,
  OnInit
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
  ProductsBrokerService
} from 'src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public categories: Array<ProductCategory> = Object.values(ProductCategory).filter(value => typeof value === 'string');
  public pagination: PaginationModel<ProductModel> = new PaginationModel();
  private _subscribeMain: boolean = true;
  private DEFAULT_PAGE_SIZE = 3;
  private _currentPage: number = DEFAULT_PAGE_INDEX;

  constructor(private _productsBroker: ProductsBrokerService,
              private _productLoader: ProductLoaderService,
              private _cartHelper: CartHelperService,
              private _router: Router) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._getProducts();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }


  private _initSubscriptions(): void {
    this._productLoader.pagination$
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
    this._productsBroker.getProducts(new ProductFilterCriteriaModel({
      page: this._currentPage,
      size: this.DEFAULT_PAGE_SIZE,
      isPinned: true,
    }));
  }

  public addProductToCart(product: ProductModel): void {
    this._cartHelper.addProduct(product._id, product.quantityInStock, 1);
  }

  public showProductsOfCategory(category: ProductCategory): void {
    this._router.navigate(['products'], {
      queryParams: {
        category: category
      },
    })
  }
}
