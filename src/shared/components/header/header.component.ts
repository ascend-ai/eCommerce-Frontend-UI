import {
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private _router: Router) {}

  public toggleNavbarExpansion(): void {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  public openSearch(): void {
    this.isSearchOpen = true;
  }

  public closeSearch(): void {
    this.isSearchOpen = false;
  }

  public onSearch(searchedValue: string): void {
    this._router.navigate(['/products'], {
      queryParams: {
        search: searchedValue
      }, 
    })
    this.isSearchOpen = false;
  }
}
