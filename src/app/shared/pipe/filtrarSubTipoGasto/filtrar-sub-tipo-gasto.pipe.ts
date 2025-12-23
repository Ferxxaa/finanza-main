import { Pipe, PipeTransform } from '@angular/core';
import { mGastos } from '../../../models/mGastos';

@Pipe({
  name: 'filtrarSubTipoGasto'
})
export class FiltrarSubTipoGastoPipe implements PipeTransform {

  transform(value: mGastos[], args?: number | string): any {
    if (!value)
      return null;
    if (!args)
      return null
    return value.find(tipoGasto => tipoGasto.nombre == args).subTipoGasto;
  }

}
