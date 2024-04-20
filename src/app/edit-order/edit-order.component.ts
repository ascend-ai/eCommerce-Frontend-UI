import {
  Component
} from '@angular/core';
import {
  FormBuilder,
  FormControl, FormGroup, Validators
} from '@angular/forms';
import {
  ActivatedRoute
} from '@angular/router';
import {
  takeWhile
} from 'rxjs';
import {
  OrderBrokerService,
  OrderLoaderService,
  OrderModel,
  OrderStatus,
  ProductLoaderService,
  ProductModel,
  UserModel,
} from 'src/core';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent {
  public order: OrderModel = new OrderModel();
  public user: UserModel = new UserModel();
  public orderedProducts: Array<ProductModel> = [];
  private _subscribeMain: boolean = true;

  public orderDetailsFormGroup!: FormGroup;
  public trackingResourceFormGroup!: FormGroup;
  public statusFormControl!: FormControl;
  public trackingIdFormControl!: FormControl;
  public trackingUrlFormControl!: FormControl;
  public readonly AVAILABLE_STATUS = Object.freeze([
    OrderStatus.PLACED,
    OrderStatus.CONFIRMED,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
  ]);
  public get formatedUserAddress(): string {
    let address = '';
    address += this.user.address.streetAddressLine1 + ', ';
    address += this.user.address.streetAddressLine2 ? this.user.address.streetAddressLine2 + ', ' : '';
    address += this.user.address.streetAddressLine3 ? this.user.address.streetAddressLine3 + ', ' : '';
    address += this.user.address.city + ', ';
    address += this.user.address.state + ', ';
    address += this.user.address.country + ', ';
    address += this.user.address.postalCode;
    return address;
  }

  constructor(private _route: ActivatedRoute,
              private _fb: FormBuilder,
              private _orderBroker: OrderBrokerService,
              private _orderLoader: OrderLoaderService,
              private _productLoader: ProductLoaderService) {}
  ngOnInit(): void {
    this._createOrderDetailsForm();
    this._initSubscriptions();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._route.params
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(params => {
        this._orderBroker.getOrder(params['id']);
      });

    this._orderLoader.order$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(order => {
        this.order = order;
        this.user = order.user;
        this._initOrderDetailsForm(order);
      });

    this._productLoader.products$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(products => {
        this.orderedProducts = products;
      });

    this.trackingIdFormControl.valueChanges
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(value => {
        if (value.trim() && !this.trackingUrlFormControl.value) {
          this.trackingUrlFormControl.markAsTouched();
          this.trackingUrlFormControl.setErrors({ required: true });
        } else if (!value.trim() && this.trackingUrlFormControl.value) {
          this.trackingIdFormControl.setErrors({ required: true });
        } else {
          this.trackingIdFormControl.setErrors(null);
          this.trackingUrlFormControl.setErrors(null);
        }
      });

    this.trackingUrlFormControl.valueChanges
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(value => {
        if (value.trim() && !this.trackingIdFormControl.value) {
          this.trackingIdFormControl.markAsTouched();
          this.trackingIdFormControl.setErrors({ required: true });
        } else if (!value.trim() && this.trackingIdFormControl.value) {
          this.trackingUrlFormControl.setErrors({ required: true });
        } else {
          this.trackingIdFormControl.setErrors(null);
          this.trackingUrlFormControl.setErrors(null);
        }
      });
  }

  private _createOrderDetailsForm(): void {
    this.trackingResourceFormGroup = this._fb.group({
      trackingId: [''],
      trackingUrl: ['']
    });
    this.orderDetailsFormGroup = this._fb.group({
      status: ['', [Validators.required]],
      trackingResource: this.trackingResourceFormGroup
    });

    this.statusFormControl = this.orderDetailsFormGroup.controls['status'] as FormControl;
    this.trackingIdFormControl = this.trackingResourceFormGroup.controls['trackingId'] as FormControl;
    this.trackingUrlFormControl = this.trackingResourceFormGroup.controls['trackingUrl'] as FormControl;
  }

  private _initOrderDetailsForm(data: OrderModel): void {
    this.orderDetailsFormGroup.reset(data);
    this.trackingResourceFormGroup.reset(data.trackingResource);
  }

  public isInputValid(inputName: string): boolean {
    let formControl: FormControl;
    switch(inputName) {
      case 'status':
        formControl = this.statusFormControl;
        break;
      case 'trackingId':
        formControl = this.trackingIdFormControl;
        break;
      case 'trackingUrl':
        formControl = this.trackingUrlFormControl;
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
      case 'status':
        formControl = this.statusFormControl;
        break;
      case 'trackingId':
        formControl = this.trackingIdFormControl;
        break;
      case 'trackingUrl':
        formControl = this.trackingUrlFormControl;
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

  public update(): void {
    this._orderBroker.updateOrderBasicDetails(
      this.order._id,
      new OrderModel(this.orderDetailsFormGroup.value)
    )
  }

  public reset(): void {
    this._initOrderDetailsForm(this.order);
  }
}
