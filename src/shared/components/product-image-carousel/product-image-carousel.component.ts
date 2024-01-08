import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  ProductImageModel
} from 'src/core';

@Component({
  selector: 'app-product-image-carousel',
  templateUrl: './product-image-carousel.component.html',
  styleUrls: ['./product-image-carousel.component.scss']
})
export class ProductImageCarouselComponent {
  @Input() carouselDisplayImage: ProductImageModel = new ProductImageModel();
  @Input() carouselImages: Array<ProductImageModel> = [];

  @Input() isCarouselOpen: boolean = false;
  @Output() isCarouselOpenChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  public closeCarousel(): void {
    this.isCarouselOpenChange.emit(false);
  }

  public prevImage(): void {
    const displayImageIndex = this._getImageIndex(this.carouselDisplayImage._id);
    if (displayImageIndex !== 0) {
      this.setAsDisplayImage(this.carouselImages[displayImageIndex - 1]);
    }
  }

  public nextImage(): void {
    const displayImageIndex = this._getImageIndex(this.carouselDisplayImage._id);
    if (displayImageIndex !== (this.carouselImages.length - 1)) {
      this.setAsDisplayImage(this.carouselImages[displayImageIndex + 1]);
    }
  }

  public setAsDisplayImage(image: ProductImageModel): void {
    this.carouselDisplayImage = image;
  }

  private _getImageIndex(imageId: string): number {
    return this.carouselImages.findIndex(img => img._id === imageId);
  }

  public getImagePath(baseImgPath: string): string {
    return `url('${ baseImgPath }')`;
  }

  public isImageDisplayed(image: ProductImageModel): boolean {
    return image._id === this.carouselDisplayImage._id;
  }
}
