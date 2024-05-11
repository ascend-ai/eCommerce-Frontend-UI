import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, size: number = 10): string {
    if (value.length > size) {
      return value.substring(0, size) + '...';
    }
    return value;
  }

}
