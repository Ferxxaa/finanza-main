import { Pipe, PipeTransform } from '@angular/core';
import { reportCentroCostoInterface } from '../../models/nestReportCentroCostoInterface';

@Pipe({
  name: 'filterSubTipoGastoByTipoGasto'
})
export class FilterSubTipoGastoByTipoGastoPipe implements PipeTransform {

  transform(value: reportCentroCostoInterface[], idTipoGasto: number): reportCentroCostoInterface[] {
    if (value && idTipoGasto) {
      return value.filter(el => el.idTipoGasto == idTipoGasto);
    }
    return null;
  }

}
