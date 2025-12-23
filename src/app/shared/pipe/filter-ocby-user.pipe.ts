import { Pipe, PipeTransform } from '@angular/core';
import { mOrdenCompra } from '../../models/mOrdenCompra';

@Pipe({
  name: 'filterOcbyUser'
})
export class FilterOcbyUserPipe implements PipeTransform {

  loginUser;

  constructor() {
    this.loginUser = JSON.parse(localStorage.usuario);
  }

  transform(value: mOrdenCompra[]): any {
    if (value)
      return value.filter(el => el.solicita && el.solicita.id ? el.solicita.id == this.loginUser.idUsuario : false);
    return null;
  }

}
