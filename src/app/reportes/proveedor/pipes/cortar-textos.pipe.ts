import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cortarTextos'
})
export class CortarTextosPipe implements PipeTransform {

  transform(value: any, args?: number): any {
    if (!value)
      return null
    if (!args) {
      if (value.length > 15)
        return value.slice(0, 15) + "..."
    }
    else
      if (value.length > args)
        return value.slice(0, args) + "..."
    return value;
  }

}
