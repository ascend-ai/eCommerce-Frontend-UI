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
  @Output() closeSearch: EventEmitter<any> = new EventEmitter();
  public searchControl: FormControl = new FormControl<string>('', Validators.required);
  public get isSearchInvalid(): boolean {
    return (this.searchControl.touched || this.searchControl.dirty) && !!this.searchControl.errors;
  }
  constructor(private _router: Router) {}

  public onCloseSearch(): void {
    this.closeSearch.emit();
  }

  public negateCloseSearchEvent(event: Event): void {
    event.stopPropagation();
  }

  public onSearch(): void {
    if (!this.isSearchInvalid) {
      this._router.navigate(['/products'], {
        queryParams: {
          search: this.searchControl.value
        }, 
      })
      this.searchControl.reset();
      this.closeSearch.emit();
    }
  }
}
