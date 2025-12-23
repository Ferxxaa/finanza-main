import { Pipe, PipeTransform } from '@angular/core';
import { EstadoPago } from '../../../models/nestEstadoPago';

@Pipe({
  name: 'sortEp'
})
export class SortEpPipe implements PipeTransform {

  transform(value: EstadoPago[]): EstadoPago[] {
    if (value) {
      console.log(value);
      const sort = value.sort((a, b) => new Date(a.fechaPago) > new Date(b.fechaPago) ? 1 : -1)
      console.log(sort);
      return sort
    }
    return null;
  }

}
