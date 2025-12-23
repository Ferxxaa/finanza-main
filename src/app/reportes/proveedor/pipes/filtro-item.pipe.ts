import { Pipe, PipeTransform } from '@angular/core';
import { and } from '@angular/router/src/utils/collection';
import { mReporteProveedor } from '../../../models/mReporteProveedor';
import { ReportEvalProv } from '../../../models/nestReportEvalProv';

@Pipe({
  name: 'filtroItem'
})
export class FiltroItemPipe implements PipeTransform {

  transform(value: ReportEvalProv[], args: number[]): any {
    if (value && args)
      return value.filter(el => args.includes(el.categoria))
    return null;
  }

}
