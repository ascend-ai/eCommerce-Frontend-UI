import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  DEFAULT_PAGE_INDEX,
  FilterCriteriaModel,
  PaginationModel,
  ProductModel,
  ProductsBrokerService
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
  public pagination: PaginationModel<ProductModel> = new PaginationModel();
  public product: ProductModel = new ProductModel();
  private _filter: FilterCriteriaModel = new FilterCriteriaModel({
    page: DEFAULT_PAGE_INDEX,
    size: 4
  });
  private _subscribeMain: boolean = true;

  constructor(private _productsBroker: ProductsBrokerService,
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
      });

    this._productsBroker.pagination$
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

  public onUpdate(updatedSimilarProductIds: Array<string>): void {
    this._productsBroker.updateSimilarProducts(
      this.product._id,
      updatedSimilarProductIds
    )
  }
}
