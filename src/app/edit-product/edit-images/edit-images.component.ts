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
  private _subscribeMain: boolean = true;
  public list = [1, 2, 3, 4]

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

  public getImagePath(baseImgPath: string): string {
    return `url('${ baseImgPath }')`;
  }

  public deleteImage(imageIndex: number): void {
    this._productsBroker.deleteProductImage(
      this.product._id,
      this.product.images[imageIndex]._id
    );
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
      this.product.images.map(img => img._id)
    );
  }
}
