import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  takeWhile
} from 'rxjs';
import {
  ProductCategory
} from 'src/core';
import {
  CreateProductHelperService
} from '../create-product-helper.service';

@Component({
  selector: 'app-create-basic-details',
  templateUrl: './create-basic-details.component.html',
  styleUrls: ['./create-basic-details.component.scss']
})
export class CreateBasicDetailsComponent implements OnInit, OnDestroy {
  public categories: Array<ProductCategory> = Object.values(ProductCategory).filter(value => typeof value === 'string');
  public basicDetailsFG!: FormGroup;
  public nameFC!: FormControl;
  public descriptionFC!: FormControl;
  public qtyInStockFC!: FormControl;
  public categoryFC!: FormControl;
  public sellingPriceFC!: FormControl;
  public maxRetailPriceFC!: FormControl;
  public isPinnedFC!: FormControl;
  private _subscribeMain: boolean = true;
  private get _isFormNewlyInitialized(): boolean {
    return this._subscribeMain && this.basicDetailsFG.untouched && this.basicDetailsFG.pristine;
  }

  constructor(private _createProductHelper: CreateProductHelperService,
              private _fb: FormBuilder) {}

  ngOnInit(): void {
    this._createForm();
    this._initSubscriptions();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._createProductHelper.basicDetails$
      .pipe(takeWhile(() => this._isFormNewlyInitialized))
      .subscribe(basicDetails => {
        this.basicDetailsFG.reset(basicDetails);
      });

    this.basicDetailsFG.valueChanges
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(basicDetails => {
        this._createProductHelper.saveBasicDetails(basicDetails);
        this._createProductHelper.setBasicDetailsValidity(this.basicDetailsFG.valid);
      });
  }

  private _createForm(): void {
    this.basicDetailsFG = this._fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantityInStock: ['', [Validators.required]],
      category: ['', [Validators.required]],
      sellingPrice: ['', [Validators.required]],
      maxRetailPrice: ['', [Validators.required]],
      isPinned: [false],
    });
    this.nameFC = this.basicDetailsFG.controls['name'] as FormControl;
    this.descriptionFC = this.basicDetailsFG.controls['description'] as FormControl;
    this.qtyInStockFC = this.basicDetailsFG.controls['quantityInStock'] as FormControl;
    this.categoryFC = this.basicDetailsFG.controls['category'] as FormControl;
    this.sellingPriceFC = this.basicDetailsFG.controls['sellingPrice'] as FormControl;
    this.maxRetailPriceFC = this.basicDetailsFG.controls['maxRetailPrice'] as FormControl;
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
      case 'sellingPrice':
        formControl = this.sellingPriceFC;
        break;
      case 'maxRetailPrice':
        formControl = this.maxRetailPriceFC;
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
      case 'sellingPrice':
        formControl = this.sellingPriceFC;
        break;
      case 'maxRetailPrice':
        formControl = this.maxRetailPriceFC;
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
}
