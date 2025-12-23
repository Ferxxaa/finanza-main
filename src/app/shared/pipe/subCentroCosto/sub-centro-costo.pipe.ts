import { Pipe, PipeTransform } from '@angular/core';
import { mCentroCosto } from '../../../models/mCentroCosto';
import { mSubCentroCosto } from '../../../models/mSubCentroCosto';

@Pipe({
  name: 'subCentroCosto'
})
export class SubCentroCostoPipe implements PipeTransform {

  transform(value: mCentroCosto[], args?: any): any {
    // console.log(value);
    if (!value || !value.length)
      return null;
    let subCentros: mSubCentroCosto[] = [];
    value.forEach(centroCosto => {
      centroCosto.subCentroCosto.forEach(subcentro => {
        subCentros.push(subcentro);
      })
    })
    return subCentros.filter(el => el.activo).sort(this.ordenar);
  }

  ordenar(a, b) {
    if (a.nombre > b.nombre)
      return 1
    else if (a.nombre < b.nombre)
      return -1
    else
      return 0
  }

}
