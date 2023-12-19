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
}
