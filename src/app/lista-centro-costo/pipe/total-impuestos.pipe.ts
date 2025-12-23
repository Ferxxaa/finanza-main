import { Pipe, PipeTransform } from '@angular/core';
import { reportCentroCostoInterface } from '../../models/nestReportCentroCostoInterface';

@Pipe({
  name: 'totalImpuestos'
})
export class TotalImpuestosPipe implements PipeTransform {

  transform(value: reportCentroCostoInterface[]): any {
    if (value)
      return value.reduce((acc, el) => acc + (el.iva + el.boleta), 0)
    return null;
  }

}
