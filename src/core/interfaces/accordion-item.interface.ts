import {
  AccordionDataInterface
} from './';

export interface AccordionItemInterface extends AccordionDataInterface {
  header: string;
  body: string;
  isOpen: boolean;
}
