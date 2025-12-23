import { Pipe, PipeTransform } from '@angular/core';
import { mOrdenCompra } from '../../../models/mOrdenCompra';

@Pipe({
  name: 'ordenesEvaluadasAgno'
})
export class OrdenesEvaluadasAgnoPipe implements PipeTransform {

  transform(value: mOrdenCompra[], args: number): any {
    // console.log(args);
    if (value && args){
      return value.filter(el => el.evaluacion && new Date(el.fechaCreacion).getFullYear() == args)
    }
    return null;
  }

}
