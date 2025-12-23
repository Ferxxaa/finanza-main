import { Pipe, PipeTransform } from '@angular/core';
import { LoginUser } from '../../models/login-user';
import { mCotizacion } from '../../models/mCotizacion';

@Pipe({
  name: 'filterMisCotizaciones'
})
export class FilterMisCotizacionesPipe implements PipeTransform {

  transform(value: mCotizacion[], user: LoginUser): mCotizacion[] {
    if (value && user)
      return value.filter(cotizacion => (cotizacion.solicitador ? cotizacion.solicitador.idUsuario == user.idUsuario : false) && cotizacion.estado == 2).slice(-150);
    return value;
  }

}
