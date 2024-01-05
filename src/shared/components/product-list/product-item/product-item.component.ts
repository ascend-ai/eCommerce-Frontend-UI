import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  ProductModel
} from 'src/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  private _imgTimeoutId: any;
  private _imgShuffleDelay: number = 700;
  @Input() product: ProductModel = new ProductModel();
  @Output() addToCart: EventEmitter<ProductModel> = new EventEmitter();
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

  constructor(private _router: Router) {}

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

  public viewProduct(): void {
    this._router.navigate(['products', this.product._id])
  }

  public addProductToCard(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }
}
