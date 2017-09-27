import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkmark'
})
export class CheckmarkPipe implements PipeTransform {

  transform(value: boolean | string): string {
    if (typeof value === 'boolean') {
      return value ? '\u2713' : '\u2718';
    }

    return value.toLowerCase() === 'true' ? '\u2713' : value.toLowerCase() === 'false' ? '\u2718' : value;
  }
}
