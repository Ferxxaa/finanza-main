import { Pipe, PipeTransform } from '@angular/core';
import { ViewCentroCosto } from '../../models/nestViewCentroCosto';

interface filtro {
  ordenes: boolean,
  proyecciones: boolean
}

@Pipe({
  name: 'filtraTipos'
})
export class FiltraTiposPipe implements PipeTransform {

  transform(value: ViewCentroCosto[], filtros: filtro): ViewCentroCosto[] {
    if (value) {
      if (filtros.ordenes && filtros.proyecciones) return value;
      if (filtros.ordenes && !filtros.proyecciones) return value.filter(el => el.folio);
      if (!filtros.ordenes && filtros.proyecciones) return value.filter(el => !el.folio);
    }
    return null;
  }

}
