import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  CreateProductHelperService
} from './create-product-helper.service';
import {
  takeWhile
} from 'rxjs';
import {
  MIN_IMAGES_PER_PRODUCT,
  ProductLoaderService,
  ProductModel,
  ProductsBrokerService,
  UseablePushAndPullItemModelType
} from 'src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  private _subscribeMain: boolean = true;
  private _basicDetails: any = new ProductModel();
  private _areBasicDetailsValid: boolean = false;
  private _images: Array<File> = [];
  private _similarProducts: Array<UseablePushAndPullItemModelType> = [];

  constructor(private _createProductHelper: CreateProductHelperService,
              private _router: Router,
              private _productLoader: ProductLoaderService,
              private _productBroker: ProductsBrokerService) {}

  ngOnInit(): void {
    this._initSubscriptions();
    this._createProductHelper.load();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._createProductHelper.basicDetails$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(basicDetails => {
        this._basicDetails = basicDetails;
      });

    this._createProductHelper.areBasicDetailsValid$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(validity => {
        this._areBasicDetailsValid = validity;
      });

    this._createProductHelper.images$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(images => {
        this._images = images;
      });

    this._createProductHelper.similarProducts$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(similarProducts => {
        this._similarProducts = similarProducts;
      });

    this._productLoader.product$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(product => {
        if (product &&
            product._id &&
            product._id.length > 0) {
          this._router.navigate(['products', product._id]);
        }
      });
  }

  public createProduct(): void {
    this._productBroker.createProduct(
      this._createProductFormData
    );
  }

  private get _createProductFormData(): FormData {
    const formData = new FormData();

    this._basicDetails.similarProducts = JSON.stringify(this._similarProducts.map(product => product._id));

    this._basicDetails.customizationTextRange = JSON.stringify(this._basicDetails.customizationTextRange);

    for (let key in this._basicDetails) {
      formData.append(key, this._basicDetails[key]);
    }

    for (let file of this._images) {
      formData.append('product-images', file);
    }

    return formData;
  }

  public get isCreateProductValid(): boolean {
    return this._areBasicDetailsValid &&
           this._images.length >= MIN_IMAGES_PER_PRODUCT
  }

}
