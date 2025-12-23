import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReporteVentas } from '../../../../models/nestReportVentas';

interface tablaResumenAgno {
  mes: string,
  registrosClientes: registroClientes[]
}

interface registroClientes {
  facturas: number,
  tipo: string,
  cliente: string,
  areaNegocio: string,
  centroCosto: mCentroCosto,
  glosa: string,
  fechaEmision: string,
  montoBruto: number,
  estado: string
}

interface mCentroCosto {
  nombre: string,
  colorLetra: string,
  colorFondo: string
}

@Component({
  selector: 'app-contenedor-pop-up',
  templateUrl: './contenedor-pop-up.component.html',
  styleUrls: ['./contenedor-pop-up.component.css']
})
export class ContenedorPopUpComponent implements OnInit {

  @Input() ResumenAgno: ReporteVentas[];

  domElement: HTMLCanvasElement;

  @Output() cerrar = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.ResumenAgno = this.ResumenAgno.filter(el => el.estado < 5)
  }

  Cerrar() {
    this.cerrar.emit({})
  }

}
