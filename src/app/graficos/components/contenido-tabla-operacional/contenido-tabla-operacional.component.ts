import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenido-tabla-operacional',
  templateUrl: './contenido-tabla-operacional.component.html',
  styleUrls: ['./contenido-tabla-operacional.component.css']
})
export class ContenidoTablaOperacionalComponent implements OnInit {

  @Input() contenido;
  @Input() inversiones?;

  constructor() {
    this.contenido = [];
  }

  ngOnInit() {
    // console.log(this.contenido);
  }

  retTotalMes(Mes: string): number {
    return this.contenido && this.contenido.length
      ? this.contenido.reduce((acc, el) => acc + el[Mes], 0)
      : 0
  }

  retTotalMesInversiones(Mes: string): number {
    return this.contenido && this.contenido.length
      ? this.contenido.reduce((acc, el) => acc + el[Mes], 0) + this.inversiones.reduce((acc, el) => acc + el[Mes], 0) 
      : 0
  }

  retTotalGeneral() {
    let total = 0;
    total = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'].reduce((acc, el) => acc + this.retTotalMes(el), 0)
    return total;
  }

  retTotalGeneralInversiones() {
    let total = 0;
    total = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'].reduce((acc, el) => acc + this.retTotalMesInversiones(el), 0)
    return total;
  }

}
