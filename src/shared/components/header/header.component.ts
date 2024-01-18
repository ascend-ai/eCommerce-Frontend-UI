import {
  Component,
  Input,
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  COMPANY_NAME
} from 'src/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public readonly COMPANY_NAME: string = COMPANY_NAME
  public isNavbarExpanded: boolean = false;
  public isSearchOpen: boolean = false;
  @Input() numberOfItemsInCart: number = 0;
  @Input() canCreateProduct: boolean = false;

  constructor(private _router: Router) {}

  public toggleNavbarExpansion(): void {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  public openSearch(): void {
    this.isNavbarExpanded = false;
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

  public navigate(path: Array<string>): void {
    this.isNavbarExpanded = false;
    this._router.navigate(path);
  }

  public isRouterLinkActive(path: string): boolean {
    return this._router.isActive(path, {paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored'});
  }
}
