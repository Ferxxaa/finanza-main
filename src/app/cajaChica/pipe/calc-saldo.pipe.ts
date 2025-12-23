import { Pipe, PipeTransform } from '@angular/core';
import { mCajaChica } from '../../models/mCajaChica';

@Pipe({
  name: 'calcSaldo'
})
export class CalcSaldoPipe implements PipeTransform {

  transform(value: mCajaChica[], args?: any): any {
    if (!value)
      return null;
    let saldo: number = 0;
    let objCajaChica;
    let arr:Array<any>=[];
    if (value[0].profesional.saldo)
      saldo=value[0].profesional.saldo;
    value.filter(el => el.estado != 2).forEach(cajaChica => {
      if (cajaChica.tipo == 1)
        saldo+=cajaChica.monto;
      else 
        saldo-=cajaChica.monto;
      objCajaChica = {...cajaChica, saldo: saldo}
      arr.push(objCajaChica);
    });
    return arr;
  }

}
