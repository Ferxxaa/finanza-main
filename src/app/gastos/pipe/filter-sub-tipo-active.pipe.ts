import { Pipe, PipeTransform } from '@angular/core';
import { SubTipoGasto } from '../../models/nestSubTipoGasto';

@Pipe({
  name: 'filterSubTipoActive'
})
export class FilterSubTipoActivePipe implements PipeTransform {

  transform(value: SubTipoGasto[]): SubTipoGasto[] {
    if (value)
      return value.filter(el => el.isActive);
    return null;
  }

}
