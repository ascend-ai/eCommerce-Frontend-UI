import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { AuthBrokerService, EMAIL_REGEX, SigninModel } from 'src/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  public isSubmitted = false;
  public signinFormGroup!: FormGroup;
  public emailFormControl!: FormControl;
  public passwordFormControl!: FormControl;
  private _subscribeMain: boolean = true;

  constructor(private _router: Router,
              private _fb: FormBuilder,
              private _authBroker: AuthBrokerService) { }

  ngOnInit(): void {
    this._initSubscriptions();
    this._createSigninForm();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _initSubscriptions(): void {
    this._authBroker.authState$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(authState => {
        if (authState.isLoggedIn) {
          this._router.navigate(['home']);
        }
      });
  }

  private _createSigninForm(): void {
    this.signinFormGroup = this._fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required]]
    });
    this.emailFormControl = this.signinFormGroup.controls['email'] as FormControl;
    this.passwordFormControl = this.signinFormGroup.controls['password'] as FormControl;
  }

  public signin(): void {
    this.isSubmitted = true;
    const signinData = new SigninModel(this.signinFormGroup.value);
    this._authBroker.login(signinData);
  }

  public getInputValidationClasses(inputName: 'email' | 'password'): Record<string, boolean> {
    let formControl: FormControl;
    switch(inputName) {
      case 'email':
        formControl = this.emailFormControl;
        break;
      case 'password':
        formControl = this.passwordFormControl;
        break;
    }
    return {
      'is-invalid': (formControl.touched || formControl.dirty) && !!formControl.errors,
      'is-valid': (formControl.touched || formControl.dirty) && !formControl.errors
     };
  }

  public isInputValid(inputName: 'email' | 'password'): boolean {
    let formControl: FormControl;
    switch(inputName) {
      case 'email':
        formControl = this.emailFormControl;
        break;
      case 'password':
        formControl = this.passwordFormControl;
        break;
    }
    return formControl.touched || formControl.dirty;
  }
}
