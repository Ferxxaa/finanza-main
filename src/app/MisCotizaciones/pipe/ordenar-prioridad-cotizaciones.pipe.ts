import { Pipe, PipeTransform } from '@angular/core';
import { mCotizacion } from '../../models/mCotizacion';

@Pipe({
  name: 'ordenarPrioridadCotizaciones'
})
export class OrdenarPrioridadCotizacionesPipe implements PipeTransform {

  transform(value: mCotizacion[]): mCotizacion[] {
    if (value) {
      return value.sort((a, b) => {
        if (parseInt(a.prioridad) < parseInt(b.prioridad))
            return 1
        else
          return -1
      })
    }
    return value;
  }
}
