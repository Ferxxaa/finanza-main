import { Pipe, PipeTransform } from '@angular/core';
import { tablaReporteOperacional } from '../../models/nestReporteOperacional';

@Pipe({
  name: 'filterOperacionales'
})
export class FilterOperacionalesPipe implements PipeTransform {

  transform(value: tablaReporteOperacional[], args: string[]): any {
    if (value) {
      if (args) {
        const filtrado = value.filter(el => !args.includes(el.nombreTipoGasto.toUpperCase().trim().replace("O. ", "")))
        return filtrado
      }
      return value
    }
    return null;
  }

}
