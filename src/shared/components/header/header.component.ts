import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isNavbarExpanded = false;
  @Input() numberOfItemsInCart: number = 0;

  constructor() {}

  public toggleNavbarExpansion(): void {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }

  public openSearch(): void {}

}
