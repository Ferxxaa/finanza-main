import { Pipe, PipeTransform } from '@angular/core';
import { ReporteVentas, ReporteVentasMonth } from '../../../models/nestReportVentas';

@Pipe({
  name: 'addMonth'
})
export class AddMonthPipe implements PipeTransform {

  transform(value: ReporteVentas[]): ReporteVentasMonth[] {
    if (value) {
      return this.addmonth(value)
    }
    return null;
  }

  private addmonth(value: ReporteVentas[]): ReporteVentasMonth[] {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const report = meses.map((el, i) => {
      return { mes: el, reporteVentas: value.filter(val => new Date(val.fechaPago).getMonth() == i) }
    })
    return report
  }

}
