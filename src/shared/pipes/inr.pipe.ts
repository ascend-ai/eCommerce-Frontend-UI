import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'inr'
})
export class InrPipe implements PipeTransform {

  transform(value: number): string {
    return `₹${value}`;
  }

}
