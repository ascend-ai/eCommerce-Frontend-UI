import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isNavbarExpanded = false;
  @Input() numberOfItemsInCart: number = 0;
  @Input() canCreateProduct: boolean = false;
  @Output() openSearch: EventEmitter<any> = new EventEmitter();

  constructor() {}

  public toggleNavbarExpansion(): void {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  public onOpenSearch(): void {
    this.openSearch.emit();
  }
}
