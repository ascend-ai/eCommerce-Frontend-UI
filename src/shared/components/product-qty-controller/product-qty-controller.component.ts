import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-qty-controller',
  templateUrl: './product-qty-controller.component.html',
  styleUrls: ['./product-qty-controller.component.scss']
})
export class ProductQtyControllerComponent {
  @Input() qty: number = 0;
  @Output() subtract: EventEmitter<number> = new EventEmitter();
  @Output() add: EventEmitter<number> = new EventEmitter();

  constructor() {}

  public subtractOne(event: Event): void {
    event.stopPropagation();
    this.subtract.emit(1);
  }

  public addOne(event: Event): void {
    event.stopPropagation();
    this.add.emit(1);
  }
}
