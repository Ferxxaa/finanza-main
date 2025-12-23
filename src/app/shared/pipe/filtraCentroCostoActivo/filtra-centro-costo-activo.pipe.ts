import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtraCentroCostoActivo'
})
export class FiltraCentroCostoActivoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      // console.log(value);
      // console.log(value.filter(el => el.activo));
      return value.filter(el => el.activo);
      // return value
    }
    else
      return null
  }

}
