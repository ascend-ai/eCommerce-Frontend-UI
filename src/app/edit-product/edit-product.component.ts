import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
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
  private _productId: string = '';
  private _isTabChangeAllowed: boolean = false;
  private _subscribeMain: boolean = true;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
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
        this._productId = params['id'];
        this._productsBroker.getProduct(params['id']);
      });

    this._productLoader.product$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(product => {
        this._editProductHelper.productForEdit =product;
      });

    this._editProductHelper.isTabChangeAllowed$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(val => {
        this._isTabChangeAllowed = val;
      });
  }

  public navigate(relativePath: string): void {
    this._editProductHelper.tab = relativePath;
    if (this._isTabChangeAllowed) {
      this._router.navigate([ relativePath ], {
        relativeTo: this._route
      });
    }
  }

  public isRouterLinkActive(relativePath: string): boolean {
    return this._router.isActive(
      `products/${this._productId}/edit/${relativePath}`,
      {
        paths: 'subset',
        queryParams: 'ignored',
        fragment: 'ignored',
        matrixParams: 'ignored'
      }
    );
  }
}
