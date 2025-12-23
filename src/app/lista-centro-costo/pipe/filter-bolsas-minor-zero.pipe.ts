import { Pipe, PipeTransform } from '@angular/core';
import { reportCentroCostoInterface } from '../../models/nestReportCentroCostoInterface';

@Pipe({
  name: 'filterBolsasMinorZero'
})
export class FilterBolsasMinorZeroPipe implements PipeTransform {

  transform(value: reportCentroCostoInterface[]): reportCentroCostoInterface[] {
    return null;
  }

}
