import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  takeWhile
} from 'rxjs';
import {
  ProductImageModel,
  ProductModel,
  ProductsBrokerService
} from 'src/core';
import {
  EditProductHelperService
} from '../edit-product-helper.service';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-images',
  templateUrl: './edit-images.component.html',
  styleUrls: ['./edit-images.component.scss'],
})
export class EditImagesComponent implements OnInit, OnDestroy {
  public product: ProductModel = new ProductModel();
  public images: Array<ProductImageModel> = [];
  public isCarouselOpen: boolean = false;
  public carouselDisplayImage: ProductImageModel = new ProductImageModel();
  public carouselImages: Array<ProductImageModel> = [];
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
        this.images = product.images.map(img => new ProductImageModel(img));
      });
  }


  public onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      const formData = new FormData();
      formData.append('product-image', file);
      this._productsBroker.addNewProductImage(this.product._id, formData);
    }
  }

  public deleteImage(imageIndex: number): void {
    if (confirm('Are you sure you want to delete this product image?')) {
      this._productsBroker.deleteProductImage(
        this.product._id,
        this.images[imageIndex]._id
      );
    }
  }

  public imageDrop(event: CdkDragDrop<Array<ProductImageModel>>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  public saveProductArrangement(): void {
    this._productsBroker.rearrangeProductImages(
      this.product._id,
      this.images.map(img => img._id)
    );
  }

  public get areImagesShuffled(): boolean {
    for (let i = 0; i < this.product.images.length; i++) {
      if (this.product.images[i]._id !== this.images[i]._id) {
        return true;
      }
    }
    return false;
  }

  public resetImageOrder(): void {
    this.images = this.product.images.map(img => new ProductImageModel(img));
  }

  public updateImageOrder(): void {
    this._productsBroker.rearrangeProductImages(
      this.product._id,
      this.images.map(img => img._id)
    );
  }

  public openCarousel(image: ProductImageModel): void {
    this.carouselDisplayImage = new ProductImageModel(image);
    this.carouselImages = this.images.map(img => new ProductImageModel(img));
    this.isCarouselOpen = true;
  }
}
