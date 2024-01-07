import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductModel, ProductsBrokerService } from 'src/core';
import { EditProductHelperService } from '../edit-product-helper.service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-edit-similar-products',
  templateUrl: './edit-similar-products.component.html',
  styleUrls: ['./edit-similar-products.component.scss']
})
export class EditSimilarProductsComponent implements OnInit, OnDestroy {
  public product: ProductModel = new ProductModel();
  private _subscribeMain: boolean = true;

  constructor(private _productsBroker: ProductsBrokerService,
              private _editProductHelper: EditProductHelperService) {}

  ngOnInit(): void {
    this._initSubscriptions();
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
  }
}
