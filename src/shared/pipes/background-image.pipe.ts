import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'backgroundImage'
})
export class BackgroundImagePipe implements PipeTransform {

  transform(value: string): string {
    if (typeof value === 'string' && value.length > 0) {
      return `url('${ value }')`;
    }
    return value;
  }

}
