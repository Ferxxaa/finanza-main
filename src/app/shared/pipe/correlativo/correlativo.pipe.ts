import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'correlativo'
})
export class CorrelativoPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value) {
      return value.toString().padStart(3, '0')
    }
    return null;
  }

}
