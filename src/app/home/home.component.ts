import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categories } from 'src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public availableCategories: Array<string> = Object.values(Categories).filter(value => typeof value === 'string');

  constructor() {}

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
      
  }

  public capitalizeCategoryName(val: string): string {
    return val
      .split('_')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ')
      .trim();
  }
}
