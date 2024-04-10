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
  private readonly IMG_SHUFFLE_EDELAY: number = 700;
  private _imgTimeoutId: any;
  @Input() product: ProductModel = new ProductModel();
  @Output() addToCart: EventEmitter<ProductModel> = new EventEmitter();
  public get isDiscountAvailable(): boolean {
    return this.product.maxRetailPrice > this.product.sellingPrice;
  }
  public get discountPercentage(): string {
    const ratio: number = (this.product.maxRetailPrice - this.product.sellingPrice) / this.product.maxRetailPrice;
    const percentage: number = Math.floor(ratio * 100);
    return `-${percentage}%`;
  }
  public get isProductCustomizable(): boolean {
    return !(this.product.customizationTextRange.min === 0 &&
           this.product.customizationTextRange.max === 0)
  }

  constructor(private _router: Router) {}

  public changeDisplayImage(product: ProductModel): void {
    if (product.images.length > 1) {
      this._imgTimeoutId = setTimeout(() => {
        product.displayImage = product.images[1];
      }, this.IMG_SHUFFLE_EDELAY)
    }
  }

  public resetDisplayImage(product: ProductModel): void {
    clearTimeout(this._imgTimeoutId);
    product.displayImage = product.images[0];
  }

  public viewProduct(): void {
    this._router.navigate(['products', this.product._id]);
  }

  public addProductToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  public customizeProduct(event: Event): void {
    event.stopPropagation();
    this.viewProduct();
  }
}
