import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Input() reset: boolean = false;
  public searchControl: FormControl = new FormControl<string>('', Validators.required);

  public get isSearchInvalid(): boolean {
    return (this.searchControl.touched || this.searchControl.dirty) && !!this.searchControl.errors;
  }

  constructor() {}

  public onSearch(event: Event): void {
    if (event instanceof KeyboardEvent) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!this.isSearchInvalid) {
      this.search.emit(this.searchControl.value);
      if (this.reset) {
        this.searchControl.reset();
      }
    }
  }
}
