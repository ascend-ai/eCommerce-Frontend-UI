import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  takeWhile
} from 'rxjs';
import {
  ProductCategory,
  ProductModel,
  ProductsBrokerService
} from 'src/core';
import {
  EditProductHelperService
} from '../edit-product-helper.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-edit-basic-details',
  templateUrl: './edit-basic-details.component.html',
  styleUrls: ['./edit-basic-details.component.scss']
})
export class EditBasicDetailsComponent implements OnInit, OnDestroy {
  public product: ProductModel = new ProductModel();
  public categories: Array<ProductCategory> = Object.values(ProductCategory).filter(value => typeof value === 'string');
  public basicDetailsFG!: FormGroup;
  public nameFC!: FormControl;
  public descriptionFC!: FormControl;
  public qtyInStockFC!: FormControl;
  public categoryFC!: FormControl;
  public priceFC!: FormControl;
  public isPinnedFC!: FormControl;
  private _subscribeMain: boolean = true;

  constructor(private _productsBroker: ProductsBrokerService,
              private _editProductHelper: EditProductHelperService,
              private _fb: FormBuilder) {}

  ngOnInit(): void {
    this._createForm();
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
        this.resetForm();
      });

    this._editProductHelper.tab$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(tab => {
        if (tab &&
            tab !== 'basic-details' &&
            this.basicDetailsFG.dirty) {
          this._editProductHelper.isTabChangeAllowed = confirm('All the changes will be discarded, are you sure you want to continue?');
        }
      });
  }

  private _createForm(): void {
    this.basicDetailsFG = this._fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantityInStock: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      isPinned: [false],
    });
    this.nameFC = this.basicDetailsFG.controls['name'] as FormControl;
    this.descriptionFC = this.basicDetailsFG.controls['description'] as FormControl;
    this.qtyInStockFC = this.basicDetailsFG.controls['quantityInStock'] as FormControl;
    this.categoryFC = this.basicDetailsFG.controls['category'] as FormControl;
    this.priceFC = this.basicDetailsFG.controls['price'] as FormControl;
    this.isPinnedFC = this.basicDetailsFG.controls['isPinned'] as FormControl;
  }

  public isInputValid(inputName: string): boolean {
    let formControl: FormControl;
    switch(inputName) {
      case 'name':
        formControl = this.nameFC;
        break;
      case 'description':
        formControl = this.descriptionFC;
        break;
      case 'quantityInStock':
        formControl = this.qtyInStockFC;
        break;
      case 'category':
        formControl = this.categoryFC;
        break;
      case 'price':
        formControl = this.priceFC;
        break;
      case 'isPinned':
        formControl = this.isPinnedFC;
        break;
      default:
        formControl = new FormControl();
        break;
    }
    return formControl.touched || formControl.dirty;
  }

  public getInputValidationClasses(inputName: string): Record<string, boolean> {
    let formControl: FormControl;
    switch(inputName) {
      case 'name':
        formControl = this.nameFC;
        break;
      case 'description':
        formControl = this.descriptionFC;
        break;
      case 'quantityInStock':
        formControl = this.qtyInStockFC;
        break;
      case 'category':
        formControl = this.categoryFC;
        break;
      case 'price':
        formControl = this.priceFC;
        break;
      case 'isPinned':
        formControl = this.isPinnedFC;
        break;
      default:
        formControl = new FormControl();
        break;
    }
    return {
      'is-invalid': (formControl.touched || formControl.dirty) && !!formControl.errors,
      'is-valid': (formControl.touched || formControl.dirty) && !formControl.errors
     };
  }

  public submit(): void {
    this._productsBroker.editProductBasicDetails(this.product._id, this.basicDetailsFG.value);
  }

  public resetForm(): void {
    this.basicDetailsFG.reset(this.product);
    this._editProductHelper.isTabChangeAllowed = true;
  }
}
