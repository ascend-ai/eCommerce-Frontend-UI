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
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  takeWhile
} from 'rxjs';
import {
  StallScheduleBrokerService,
  StallScheduleHelperService,
  StallScheduleLoaderService,
  StallScheduleModel
} from 'src/core';

@Component({
  selector: 'app-edit-stall-schedule',
  templateUrl: './edit-stall-schedule.component.html',
  styleUrls: ['./edit-stall-schedule.component.scss']
})
export class EditStallScheduleComponent implements OnInit, OnDestroy {
  private _subscribeMain: boolean = true;
  public stallSchedule: StallScheduleModel = new StallScheduleModel();
  public stallScheduleDetailsFG!: FormGroup;
  public dateFC!: FormControl;
  public venueFC!: FormControl;
  public openingTimeFC!: FormControl;
  public closingTimeFC!: FormControl;

  public get minDateStr(): string {
    return (new Date()).toISOString().split('T')[0];
  }

  constructor(private _fb: FormBuilder,
              private _stallSchedueHelper: StallScheduleHelperService,
              private _stallScheduleBroker: StallScheduleBrokerService,
              private _stallScheduleLoader: StallScheduleLoaderService,
              private _router: Router,
              private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._createStallScheduleForm();
    this._initSubscriptions();
  }

  ngOnDestroy(): void {
    this._subscribeMain = false;
  }

  private _createStallScheduleForm(): void {
    this.stallScheduleDetailsFG = this._fb.group({
      date: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      openingTime: ['', [Validators.required]],
      closingTime: ['', [Validators.required]],
    });

    this.dateFC = this.stallScheduleDetailsFG.controls['date'] as FormControl;
    this.venueFC = this.stallScheduleDetailsFG.controls['venue'] as FormControl;
    this.openingTimeFC = this.stallScheduleDetailsFG.controls['openingTime'] as FormControl;
    this.closingTimeFC = this.stallScheduleDetailsFG.controls['closingTime'] as FormControl;
  }

  private _initSubscriptions(): void {
    this._stallScheduleLoader.stallSchedule$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(stallSchedule => {
        this.stallSchedule = stallSchedule;
        this.reset();
      });

    this._stallScheduleLoader.deletedStallSchedule$
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(stallSchedule => {
        if (stallSchedule) {
          this._router.navigate(['../../'], {
            relativeTo: this._route
          })
        }
      });

    this._route.params
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(params => {
        this._stallScheduleBroker.getStallSchedule(params['id']);
      });

    this.closingTimeFC.valueChanges
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(value => {
        const areBothTimesAvailable = value && this.openingTimeFC.value;
        const areBothTimesInvalid = this._stallSchedueHelper.getTimeInMillisecondsSinceEpoch(value) <= this._stallSchedueHelper.getTimeInMillisecondsSinceEpoch(this.openingTimeFC.value);
        if (areBothTimesAvailable && areBothTimesInvalid) {
          this.closingTimeFC.setErrors({ min: true });
        } else if (areBothTimesAvailable) {
          this.closingTimeFC.setErrors(null);
        }
      });

    this.openingTimeFC.valueChanges
      .pipe(takeWhile(() => this._subscribeMain))
      .subscribe(value => {
        const areBothTimesAvailable = value && this.closingTimeFC.value;
        const areBothTimesInvalid = this._stallSchedueHelper.getTimeInMillisecondsSinceEpoch(value) >= this._stallSchedueHelper.getTimeInMillisecondsSinceEpoch(this.closingTimeFC.value);
        if (areBothTimesAvailable && areBothTimesInvalid) {
          this.closingTimeFC.setErrors({ min: true });
        } else if (areBothTimesAvailable) {
          this.closingTimeFC.setErrors(null);
        }
      });
  }

  public update(): void {
    this._stallScheduleBroker.updateStallScheduleBasicDetails(
      this.stallSchedule._id,
      new StallScheduleModel({
        date: this._stallSchedueHelper.getDateInMillisecondsSinceEpoch(this.dateFC.value),
        venue: this.venueFC.value,
        openingTime: this._stallSchedueHelper.getTimeInMillisecondsSinceEpoch(this.openingTimeFC.value, this.dateFC.value),
        closingTime: this._stallSchedueHelper.getTimeInMillisecondsSinceEpoch(this.closingTimeFC.value, this.dateFC.value),
      })
    );
  }

  public reset(): void {
    this.stallScheduleDetailsFG.reset({
      date: this._stallSchedueHelper.getDateFromMillisecondsSinceEpoch(
        this.stallSchedule.date
      ),
      venue: this.stallSchedule.venue,
      openingTime: this._stallSchedueHelper.getTimeFromMillisecondsSinceEpoch(
        this.stallSchedule.openingTime
      ),
      closingTime: this._stallSchedueHelper.getTimeFromMillisecondsSinceEpoch(
        this.stallSchedule.closingTime
      )
    });
    this.stallScheduleDetailsFG.markAllAsTouched();
  }

  public deleteStallSchedule(): void {
    if (confirm(`Are you sure you want to delete this scheduled stall?`)) {
      this._stallScheduleBroker.deleteStallSchedule(this.stallSchedule._id)
    }
  }

  public isInputValid(inputName: string): boolean {
    let formControl: FormControl;
    switch(inputName) {
      case 'date':
        formControl = this.dateFC;
        break;
      case 'venue':
        formControl = this.venueFC;
        break;
      case 'openingTime':
        formControl = this.openingTimeFC;
        break;
      case 'closingTime':
        formControl = this.closingTimeFC;
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
      case 'date':
        formControl = this.dateFC;
        break;
      case 'venue':
        formControl = this.venueFC;
        break;
      case 'openingTime':
        formControl = this.openingTimeFC;
        break;
      case 'closingTime':
        formControl = this.closingTimeFC;
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
