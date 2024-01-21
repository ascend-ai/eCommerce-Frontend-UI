import {
  Component
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  takeWhile
} from 'rxjs';
import {
  ProductLoaderService,
  ProductsBrokerService
} from 'src/core';
import {
  EditProductHelperService
} from './edit-product-helper.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  private _subscribeMain: boolean = true;
  public isCarouselOpen: boolean = false;

  constructor(private _route: ActivatedRoute,
              private _productsBroker: ProductsBrokerService,
              private _productLoader: ProductLoaderService,
              private _editProductHelper: EditProductHelperService) {}

  ngOnInit(): void {
    this._initSubscriptions();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._route.params
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(params => {
        this._productsBroker.getProduct(params['id']);
      });

    this._productLoader.product$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(product => {
        this._editProductHelper.setProductForEdit(product);
      });
  }
}
