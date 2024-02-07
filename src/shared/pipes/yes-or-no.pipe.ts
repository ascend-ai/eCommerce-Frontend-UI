import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'yesOrNo'
})
export class YesOrNoPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Yes' : 'No';
  }

}
