import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public currentYear: number = (new Date()).getFullYear();

  constructor(private _router: Router) {}

  public navigate(path: Array<string>): void {
    this._router.navigate(path);
  }

  public isRouterLinkActive(path: string): boolean {
    return this._router.isActive(path, {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }
}
