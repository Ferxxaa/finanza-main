import { Pipe, PipeTransform } from '@angular/core';
import { CentroCosto } from '../../../models/nestCentroCosto';

@Pipe({
  name: 'filterCentroCostoActive'
})
export class FilterCentroCostoActivePipe implements PipeTransform {

  transform(value: CentroCosto[]): any {
    if (value) {
      return value.filter(el => el.isActive)
    }
    return null;
  }

}
