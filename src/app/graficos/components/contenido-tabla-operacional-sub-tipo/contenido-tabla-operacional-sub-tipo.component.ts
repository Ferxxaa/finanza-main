import { Component, Input, OnInit } from '@angular/core';
import { tablaReporteOperacional } from '../../../models/nestReporteOperacional';

declare var $: any;

@Component({
  selector: 'app-contenido-tabla-operacional-sub-tipo',
  templateUrl: './contenido-tabla-operacional-sub-tipo.component.html',
  styleUrls: ['./contenido-tabla-operacional-sub-tipo.component.css']
})
export class ContenidoTablaOperacionalSubTipoComponent implements OnInit {

  @Input() contenido: tablaReporteOperacional[];

  constructor() {
    this.contenido = [];
  }

  ngOnInit() {
    // console.log(this.contenido);

  }

  retTotalTipo(tipo: tablaReporteOperacional) {
    const meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    const total = meses.reduce((acc, el) => acc + tipo[el], 0);
    return total
  }

  retTotalMes(Mes: string): number {
    if (this.contenido && this.contenido.length) {
      const filtrar = ['RETIROS', 'INVERSIONES']
      const contenido = this.contenido.filter(el => !filtrar.includes(el.nombreTipoGasto.toUpperCase().trim().replace("O. ", "")))
      return contenido.reduce((acc, el) => acc + el[Mes], 0)
    }
    return 0
  }

  // retTotalMesTipo(Mes: string, tipo: string): number {
  //   // console.log(this.contenido);
  //   return this.contenido && this.contenido.length
  //     ? this.contenido.find(el => el.tipo == tipo).registros.reduce((acc, el) => acc + el[Mes], 0)
  //     : 0
  // }

  retTotalGeneral() {
    const meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    const total = meses.reduce((acc, el) => acc + this.retTotalMes(el), 0);
    return total;
  }

  toggleMes(tipo: string) {
    let nombre = '[name="tr-' + tipo + '"]'
    // console.log(nombre);
    $(nombre).toggleClass('myCollapse')
  }

  retTotal(el: any, mes: string) {
    return el.registros.reduce((acc, el) => acc + el[mes], 0)
  }

}
