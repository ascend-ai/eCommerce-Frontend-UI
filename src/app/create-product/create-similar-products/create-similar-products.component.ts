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
  ProductsBrokerService,
  UseablePushAndPullItemModelType
} from 'src/core';
import {
  CreateProductHelperService
} from '../create-product-helper.service';
import {
  takeWhile
} from 'rxjs';

@Component({
  selector: 'app-create-similar-products',
  templateUrl: './create-similar-products.component.html',
  styleUrls: ['./create-similar-products.component.scss']
})
export class CreateSimilarProductsComponent implements OnInit, OnDestroy {
  public pagination: PaginationModel<UseablePushAndPullItemModelType> = new PaginationModel();
  public get similarProducts(): Array<UseablePushAndPullItemModelType> {
    return this._similarProducts;
  }
  public set similarProducts(assigned: Array<UseablePushAndPullItemModelType>) {
    this._similarProducts = assigned;
    this._createProductHelper.saveSimilarProducts(assigned);
  }
  private readonly DEFAULT_PAGE_SIZE = 4;
  public _similarProducts: Array<UseablePushAndPullItemModelType> = [];
  private _filter: ProductFilterCriteriaModel = new ProductFilterCriteriaModel({
    page: DEFAULT_PAGE_INDEX,
    size: this.DEFAULT_PAGE_SIZE
  });
  private _subscribeMain: boolean = true;

  

  constructor(private _productsBroker: ProductsBrokerService,
              private _productLoader: ProductLoaderService,
              private _createProductHelper: CreateProductHelperService) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._getProducts();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._createProductHelper.similarProducts$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(similarProducts => {
        this._similarProducts = similarProducts
      });

    this._productLoader.pagination$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(pagination => {
        this.pagination = pagination;
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
}
