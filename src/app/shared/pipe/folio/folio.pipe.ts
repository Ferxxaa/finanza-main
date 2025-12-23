import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'folio'
})
export class FolioPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value)
      return value.toString().padStart(7,'0')
    return null;
  }

}
