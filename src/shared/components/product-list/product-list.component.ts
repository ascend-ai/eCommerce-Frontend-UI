import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Array<ProductModel> = [];

  constructor() {}

}
