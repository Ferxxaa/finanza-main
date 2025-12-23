import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAgnos'
})
export class SortAgnosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value)
      return value.sort((a, b) => a.agno >= b.agno ? -1 : 1)
    return null;
  }

}
