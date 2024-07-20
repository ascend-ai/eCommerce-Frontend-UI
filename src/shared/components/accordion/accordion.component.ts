import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  AccordionItemInterface
} from 'src/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  @Input() data: Array<AccordionItemInterface> = [];
  @Output() toggle: EventEmitter<number> = new EventEmitter();

  constructor() {}

  public toggleAccItem(itemIdx: number): void {
    this.toggle.emit(itemIdx);
  }
}
