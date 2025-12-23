import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReportAreaNegocio'
})
export class FilterReportAreaNegocioPipe implements PipeTransform {

  transform(value: any, args: number): any {
    if (value && args) {
      console.log(value);
      
      if (args > 0) {
        return value.filter(el => el.areaNegocio.id == args)
      }
      return value
    }
    return null;
  }

}
