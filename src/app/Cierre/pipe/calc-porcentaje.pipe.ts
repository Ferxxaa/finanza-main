import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcPorcentaje',
})
export class CalcPorcentajePipe implements PipeTransform {

  transform(value: any, args1: any, args2: any): any {
    let allOrdenes = args1.OC.concat(args1.OP);
    let arrTemp = value.map(el => ({ nombre: el, totalOrdenAgno: this.retTotalOC(allOrdenes.filter(oc => oc.ingresoEgreso == 1 && oc.subCentroCosto == el)), ...args2.find(totales => totales.nombre == el) }))
    return arrTemp.sort((a, b) => a.nombre >= b.nombre ? 1 : -1);
  }

  private retTotalOC(ordenes) {
    return Math.ceil(ordenes.reduce((acc, el) => acc + this.retTotalEP(el.estadosPagos), 0))
  }

  private retTotalEP(estadoPago) {
    return estadoPago.reduce((acc, el) => acc + el.monto, 0)
  }

}
