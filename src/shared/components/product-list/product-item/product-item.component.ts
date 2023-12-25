import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  private _imgTimeoutId: any;
  private _imgShuffleDelay: number = 700;
  @Input() product: ProductModel = new ProductModel();

  constructor(private _router: Router,
              private _route: ActivatedRoute) {}

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
    return `url('${ this.product.displayImage.url }')`;
  }

  public viewProduct(): void {
    this._router.navigate(['products', this.product._id])
  }

  public addProductToCard(event: Event): void {
    event.stopPropagation();
  }

}
