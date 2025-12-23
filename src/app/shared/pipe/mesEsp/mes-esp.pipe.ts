import { Pipe, PipeTransform } from '@angular/core';
import { NgSwitch } from '@angular/common';

@Pipe({
  name: 'mesEsp'
})
export class MesEspPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value)
      return null
    switch (value) {
      case "January":
        return "Enero";
      case "February":
        return "Febrero";
      case "March":
        return "Marzo";
      case "April":
        return "Abril";
      case "May":
        return "Mayo";
      case "June":
        return "Junio";
      case "July":
        return "Julio";
      case "August":
        return "Agosto";
      case "September":
        return "Septiembre";
      case "October":
        return "Octubre";
      case "November":
        return "Noviembre";
      case "December":
        return "Diciembre";
      default:
        break;
    }
    return null;
  }

}
