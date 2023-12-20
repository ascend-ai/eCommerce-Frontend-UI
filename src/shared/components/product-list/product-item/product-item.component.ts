import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  public baseUrl: string = environment.baseUrl;
  private _imgTimeoutId: any;
  private _imgShuffleDelay: number = 500;
  @Input() product: ProductModel = new ProductModel();

  constructor() {}

  public changeDisplayImage(product: ProductModel): void {
    if (product.images.length > 1) {
      this._imgTimeoutId = setTimeout(() => {
        product.displayImage = product.images[1];
      }, this._imgShuffleDelay)
    }
  }

  public resetDisplayImage(product: ProductModel): void {
    clearTimeout(this._imgTimeoutId);
    product.displayImage = product.images[0];
  }

  public get capitalizedCategoryName(): string {
    return this.product.category
      .split('_')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ')
      .trim();
  }

  public get displayImagePath(): string {
    return `url('${ this.baseUrl + this.product.displayImage.url }')`;
  }

}
