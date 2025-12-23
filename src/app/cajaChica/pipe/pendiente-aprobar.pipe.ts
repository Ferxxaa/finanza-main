import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pendienteAprobar'
})
export class PendienteAprobarPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value){
      console.log(value);
    }
    return null;
  }

}
