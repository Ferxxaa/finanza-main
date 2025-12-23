import { Pipe, PipeTransform } from '@angular/core';
import { mOrdenCompra } from '../../../models/mOrdenCompra';

@Pipe({
  name: 'sortOcDesc'
})
export class SortOcDescPipe implements PipeTransform {

  transform(value: mOrdenCompra[]): any {
    if (value){
      return value.sort((a,b) => Number(a.folio) < Number(b.folio) ? 1 : -1)
    }
    return null;
  }

}
