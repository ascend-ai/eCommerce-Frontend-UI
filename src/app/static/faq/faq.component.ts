import {
  Component,
} from '@angular/core';
import {
  AccordionItemInterface,
  FAQS
} from 'src/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  public faqs: Array<AccordionItemInterface> = FAQS.map(faq => {
    return {
      ...faq,
      isOpen: false
    }
  });

  constructor() {}

  public toggleAccordion(accIdx: number): void {
    const isOpen = this.faqs[accIdx].isOpen;
    this.faqs.forEach(faq => faq.isOpen = false);

    if (!isOpen) {
      this.faqs[accIdx].isOpen = !this.faqs[accIdx].isOpen;
    }
  }

}
