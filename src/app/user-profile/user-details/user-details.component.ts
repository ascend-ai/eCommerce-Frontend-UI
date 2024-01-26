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
import { takeWhile } from 'rxjs';
import {
  AuthHelperService,
  COUNTRY_DATA,
  EMAIL_REGEX,
  UserBrokerService,
  UserLoaderService,
  UserModel
} from 'src/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public userDetailsFormGroup!: FormGroup;
  public addressFormGroup!: FormGroup;
  public emailFormControl!: FormControl;
  public phoneNumberFormControl!: FormControl;
  public streetAddressLine1FormControl!: FormControl;
  public streetAddressLine2FormControl!: FormControl;
  public streetAddressLine3FormControl!: FormControl;
  public cityFormControl!: FormControl;
  public stateFormControl!: FormControl;
  public countryFormControl!: FormControl;
  public postalCodeFormControl!: FormControl;
  public countries: Array<string> = [];
  public states: Array<string> = [];
  public cities: Array<string> = [];
  private _stateData: Record<string, Array<string>> = {};
  private _subscribeMain: boolean = true;
  private _user: UserModel = new UserModel();
  private get _loggedInUserId(): string {
    return this._authHelper.isLoggedIn ? this._authHelper.loggedInUserId : '';
  }
  constructor(private _fb: FormBuilder,
              private _userBroker: UserBrokerService,
              private _userLoader: UserLoaderService,
              private _authHelper: AuthHelperService,) {}

  ngOnInit(): void {
    this._createUserDetailsFormForm();
    this._initSubscriptions();
    this._userBroker.getUser(
      this._loggedInUserId
    );
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  public update(): void {
    if (confirm(`Are you sure you want to update the details?`)) {
      this._userBroker.updateUserBasicDetails(
        this._loggedInUserId,
        this.userDetailsFormGroup.value
      );
    }
  }

  public reset(): void {
    this._initUserDetailsForm(this._user);
  }

  private _initSubscriptions(): void {
    this._userLoader.user$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(user => {
        this._user = user;
        this._initUserDetailsForm(user);
      });

    this.countryFormControl.valueChanges
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(val => {
        if (val) {
          this.stateFormControl.patchValue('');
          this.stateFormControl.markAsUntouched();
          this.stateFormControl.markAsPristine();
          this._stateData = COUNTRY_DATA[val] ?  COUNTRY_DATA[val] : COUNTRY_DATA[''];
          this.states = COUNTRY_DATA[val] ? Object.keys(COUNTRY_DATA[val]) : Object.keys(COUNTRY_DATA['']);
        }
      });

    this.stateFormControl.valueChanges
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(val => {
        if (val) {
          this.cityFormControl.patchValue('');
          this.cityFormControl.markAsUntouched();
          this.cityFormControl.markAsPristine();
          this.cities = this._stateData[val] ? this._stateData[val] : this._stateData[''];
        }
      });

    this.cityFormControl.valueChanges
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(val => {
        if (val) {
          this.postalCodeFormControl.patchValue('');
          this.postalCodeFormControl.markAsUntouched();
          this.postalCodeFormControl.markAsPristine();
        }
      });
  }

  private _createUserDetailsFormForm(): void {
    this.countries = Object.keys(COUNTRY_DATA);
    this.addressFormGroup = this._fb.group({
      streetAddressLine1: ['', [Validators.required]],
      streetAddressLine2: [''],
      streetAddressLine3: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]]
    });

    this.userDetailsFormGroup = this._fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      phoneNumber: ['', [Validators.required]],
      address: this.addressFormGroup,
    });

    this.emailFormControl = this.userDetailsFormGroup.controls['email'] as FormControl;
    this.phoneNumberFormControl = this.userDetailsFormGroup.controls['phoneNumber'] as FormControl;
    this.streetAddressLine1FormControl = this.addressFormGroup.controls['streetAddressLine1'] as FormControl;
    this.streetAddressLine2FormControl = this.addressFormGroup.controls['streetAddressLine2'] as FormControl;
    this.streetAddressLine3FormControl = this.addressFormGroup.controls['streetAddressLine3'] as FormControl;
    this.cityFormControl = this.addressFormGroup.controls['city'] as FormControl;
    this.stateFormControl = this.addressFormGroup.controls['state'] as FormControl;
    this.countryFormControl = this.addressFormGroup.controls['country'] as FormControl;
    this.postalCodeFormControl = this.addressFormGroup.controls['postalCode'] as FormControl;
  }

  private _initUserDetailsForm(data: UserModel): void {
    this.userDetailsFormGroup.reset(data);
    this.addressFormGroup.reset(data.address);
  }

  public isInputValid(inputName: string): boolean {
    let formControl: FormControl;
    switch(inputName) {
      case 'email':
        formControl = this.emailFormControl;
        break;
      case 'phoneNumber':
        formControl = this.phoneNumberFormControl;
        break;
      case 'streetAddressLine1':
        formControl = this.streetAddressLine1FormControl;
        break;
      case 'streetAddressLine2':
        formControl = this.streetAddressLine2FormControl;
        break;
      case 'streetAddressLine3':
        formControl = this.streetAddressLine3FormControl;
        break;
      case 'country':
        formControl = this.countryFormControl;
        break;
      case 'state':
        formControl = this.stateFormControl;
        break;
      case 'city':
        formControl = this.cityFormControl;
        break;
      case 'postalCode':
        formControl = this.postalCodeFormControl;
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
      case 'email':
        formControl = this.emailFormControl;
        break;
      case 'phoneNumber':
        formControl = this.phoneNumberFormControl;
        break;
      case 'streetAddressLine1':
        formControl = this.streetAddressLine1FormControl;
        break;
      case 'streetAddressLine2':
        formControl = this.streetAddressLine2FormControl;
        break;
      case 'streetAddressLine3':
        formControl = this.streetAddressLine3FormControl;
        break;
      case 'country':
        formControl = this.countryFormControl;
        break;
      case 'state':
        formControl = this.stateFormControl;
        break;
      case 'city':
        formControl = this.cityFormControl;
        break;
      case 'postalCode':
        formControl = this.postalCodeFormControl;
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
