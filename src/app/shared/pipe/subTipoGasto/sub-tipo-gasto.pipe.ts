import { Pipe, PipeTransform } from '@angular/core';
import { mGastos } from '../../../models/mGastos';

@Pipe({
  name: 'subTipoGasto'
})
export class SubTipoGastoPipe implements PipeTransform {

  transform(value: mGastos[], args?: string): any {
    // console.log(value);
    // console.log(args);
    
    if (!value)
      return null;
    if (!args)
      return null;
    return value.find(el => el._id == args).subTipoGasto
  }

}
