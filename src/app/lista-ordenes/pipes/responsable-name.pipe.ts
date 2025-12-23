import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responsableName'
})
export class ResponsableNamePipe implements PipeTransform {

  transform(idResponsable: number, responsables: Array<any>): any {
    if (idResponsable && responsables){
      const responsable = responsables.find(el => el.idUsuario == idResponsable)
      return responsable.nombre + ' ' + responsable.paterno
    }
    if (idResponsable){
      return idResponsable
    }
    return null;
  }

}
