import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortCajaChicaDesc'
})
export class SortCajaChicaDescPipe implements PipeTransform {

  transform(registroCajaChicaUser: any, args?: any): any {
    if (registroCajaChicaUser) {
      return registroCajaChicaUser.sort((a, b) => new Date(a.fechaCreacion) >= new Date(b.fechaCreacion) ? -1 : 1)
    }
    return null;
  }

}
