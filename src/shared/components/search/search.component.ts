import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  FormControl,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() isSearchOpen: boolean = false;
  @Output() isSearchOpenChange: EventEmitter<boolean> = new EventEmitter();

  public searchControl: FormControl = new FormControl<string>('', Validators.required);

  public get isSearchInvalid(): boolean {
    return (this.searchControl.touched || this.searchControl.dirty) && !!this.searchControl.errors;
  }
  constructor(private _router: Router) {}

  public onCloseSearch(): void {
    this.isSearchOpenChange.emit(false);
  }

  public onSearch(): void {
    if (!this.isSearchInvalid) {
      this._router.navigate(['/products'], {
        queryParams: {
          search: this.searchControl.value
        }, 
      })
      this.searchControl.reset();
      this.isSearchOpenChange.emit(false);
    }
  }
}
