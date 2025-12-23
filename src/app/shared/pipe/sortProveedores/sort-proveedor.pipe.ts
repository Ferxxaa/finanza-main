import { Pipe, PipeTransform } from '@angular/core';
import { mProveedor } from '../../../models/mProveedor';
import { Proveedor } from '../../../models/nestProveedor';

@Pipe({
  name: 'sortProveedor'
})
export class SortProveedorPipe implements PipeTransform {

  transform(value: Proveedor[]): any {
    return value ? value.sort((a, b) => a.nombre > b.nombre ? 1 : -1) : null;
  }

}
