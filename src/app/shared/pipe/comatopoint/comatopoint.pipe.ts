import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comatopoint'
})
export class ComatopointPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (value !== undefined && value !== null) {
      // here we just remove the commas from value
      // console.log(value);
      return value.toString().includes('.') ? value.toString().split('.')[0].replace(/,/g, ".") + ',' + value.toString().split('.')[1] : value.toString().replace(/,/g, ".");
    } else {
      return null;
    }

  }

}
