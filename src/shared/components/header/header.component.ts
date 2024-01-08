import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isNavbarExpanded: boolean = false;
  public isSearchOpen: boolean = false;
  @Input() numberOfItemsInCart: number = 0;
  @Input() canCreateProduct: boolean = false;

  constructor() {}

  public toggleNavbarExpansion(): void {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  public openSearch(): void {
    this.isSearchOpen = true;
  }
}
