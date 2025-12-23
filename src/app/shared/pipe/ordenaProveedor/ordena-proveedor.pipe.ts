import { Pipe, PipeTransform } from '@angular/core';
import { Proveedor } from '../../../models/nestProveedor';

@Pipe({
  name: 'ordenaProveedor'
})
export class OrdenaProveedorPipe implements PipeTransform {

  transform(value: Proveedor[], args?: any): any {
    if (value) {
      return value.sort(this.ordenaListado);
    }
    return null;
  }

  ordenaListado(a:Proveedor, b:Proveedor) {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }

}
