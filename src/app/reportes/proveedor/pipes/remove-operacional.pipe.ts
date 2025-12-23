import { Pipe, PipeTransform } from '@angular/core';
import { AreaNegocio } from '../../../models/nestAreaNegocio';

@Pipe({
  name: 'removeOperacional'
})
export class RemoveOperacionalPipe implements PipeTransform {

  transform(value: AreaNegocio[]): any {
    if (value && value.length){
      return value.filter(el => !el.nombreAreaNegocio.includes('Operacional'))
    }
    return null;
  }

}
