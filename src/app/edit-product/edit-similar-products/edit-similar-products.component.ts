import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  DEFAULT_PAGE_INDEX,
  ProductFilterCriteriaModel,
  PaginationModel,
  ProductLoaderService,
  ProductModel,
  ProductsBrokerService,
  UseablePushAndPullItemModelType
} from 'src/core';
import {
  EditProductHelperService
} from '../edit-product-helper.service';
import {
  takeWhile
} from 'rxjs';

@Component({
  selector: 'app-edit-similar-products',
  templateUrl: './edit-similar-products.component.html',
  styleUrls: ['./edit-similar-products.component.scss']
})
export class EditSimilarProductsComponent implements OnInit, OnDestroy {
  public pagination: PaginationModel<UseablePushAndPullItemModelType> = new PaginationModel();
  public product: ProductModel = new ProductModel();
  public similarProducts: Array<UseablePushAndPullItemModelType> = [];
  private readonly DEFAULT_PAGE_SIZE = 4;
  private _filter: ProductFilterCriteriaModel = new ProductFilterCriteriaModel({
    page: DEFAULT_PAGE_INDEX,
    size: this.DEFAULT_PAGE_SIZE
  });
  private _subscribeMain: boolean = true;

  constructor(private _productsBroker: ProductsBrokerService,
              private _productLoader: ProductLoaderService,
              private _editProductHelper: EditProductHelperService) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._getProducts();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._editProductHelper.productForEdit$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(product => {
        this.product = product;
        this.resetSimilarProductsItems();
      });

    this._productLoader.pagination$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(pagination => {
        this.pagination = pagination;
      });

    this._editProductHelper.tab$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(tab => {
        if (tab &&
            tab !== 'similar-products' &&
            this.areSimilarProductsChanged) {
          this._editProductHelper.isTabChangeAllowed = confirm('All the changes will be discarded, are you sure you want to continue?');
        }
      });
  }

  public onSearch(searchedValue: string): void {
    this._filter.search = searchedValue;
    this._filter.page = DEFAULT_PAGE_INDEX;
    this._getProducts();
  }

  private _getProducts(): void {
    this._productsBroker.getProducts(this._filter);
  }


  public goToPage(pageIndex: number): void {
    this._filter.page = pageIndex;
    this._getProducts();
  }

  public onUpdate(): void {
    this._productsBroker.updateSimilarProducts(
      this.product._id,
      this.similarProducts.map(product => product._id)
    )
  }

  public resetSimilarProductsItems(): void {
    this.similarProducts = this.product.similarProducts;
    this._editProductHelper.isTabChangeAllowed = true;
  }

  public get areSimilarProductsChanged(): boolean {
    if (this.product.similarProducts.length === this.similarProducts.length) {
      for (let i = 0; i < this.product.similarProducts.length; i++) {
        if (this.product.similarProducts[i]._id !== this.similarProducts[i]._id) {
          return true;
        }
      }
      return false;
    }
    return true
  }
}
