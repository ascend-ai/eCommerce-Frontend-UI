import {
  Component
} from '@angular/core';
import {
  CreateProductHelperService
} from '../create-product-helper.service';
import {
  takeWhile
} from 'rxjs';
import {
  NotificationHelperService
} from 'src/core';
import {
  CdkDragDrop,
  moveItemInArray
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-images',
  templateUrl: './create-images.component.html',
  styleUrls: ['./create-images.component.scss']
})
export class CreateImagesComponent {
  public files: Array<File> = [];
  private _subscribeMain: boolean = true;
  public readonly KILOBYTES = 1000;

  constructor(private _createProductHelper: CreateProductHelperService,
              private _notificationHelper: NotificationHelperService) {}

  ngOnInit(): void {
    this._initSubscriptions();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._createProductHelper.images$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(files => {
        this.files = files.map(item => item);
      });
  }


  public onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement?.files &&
        inputElement.files.length > 0 &&
        (inputElement.files.length + this.files.length) <= 3) {
      const files: FileList = inputElement.files;
      for (let i = 0; i < files.length; i++) {
        this.files.push(files[i]);
      }
      this._createProductHelper.saveImages(this.files);
    } else if (inputElement?.files && inputElement.files.length > 0) {
      this._notificationHelper.handleError(`Maximum 3 files`);
    }
  }

  public getInKb(sizeInBytes: number): string {
    return `${Math.ceil(sizeInBytes / this.KILOBYTES)} KB`;
  }

  public drop(event: CdkDragDrop<Array<File>>):void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this._createProductHelper.saveImages(this.files);
  }

  public deleteFile(fileIndex: number) {
    if (confirm('Are you sure you want to delete this file?')) {
      this.files.splice(fileIndex, 1);
      this._createProductHelper.saveImages(this.files);
    }
  }
}
