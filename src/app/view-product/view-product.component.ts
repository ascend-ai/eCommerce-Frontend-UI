import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, of, takeWhile } from 'rxjs';
import { ProductImageModel, ProductModel, ProductsBrokerService } from 'src/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit, OnDestroy {
  public product: ProductModel = new ProductModel();
  private _subscribeMain: boolean = true;
  constructor(private _route: ActivatedRoute,
              private _productsBroker: ProductsBrokerService) {}

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

    this._productsBroker.product$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(product => {
        this.product = product;
      });
  }

  public getImagePath(baseImgPath: string): string {
    return `url('${ baseImgPath }')`;
  }

  public setAsDisplayImage(image: ProductImageModel): void {
    this.product.displayImage = image;
  }

  public isImageDisplayed(image: ProductImageModel): boolean {
    return image._id === this.product.displayImage._id;
  }
}
