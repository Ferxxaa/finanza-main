import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReportResultadoAreaNegocioByYear } from '../../../../models/nestResultadoAreaNegocio';

interface reporteVentas {
  agno: string,
  centrosCosto: VentasAreaNegocios[]
}

interface VentasAreaNegocios {
  periodo: string,
  meses: number,
  nombreProy: Proyecto,
  montoNeto: number,
  iva: number,
  montoBruto: number,
  gastoConIva: number,
  utilidad: totalPorcentaje,
  impuestos: number,
  utilidadDi: totalPorcentaje,
  acumulacion: totalPorcentaje
}

interface totalPorcentaje {
  monto: number,
  porcentaje: number
}

interface Proyecto {
  nombreProyecto: string,
  fondo: string,
  letras: string,
  montoProgramado: number
}

declare var $: any;

@Component({
  selector: 'app-item-ventas-area-negocio',
  templateUrl: './item-ventas-area-negocio.component.html',
  styleUrls: ['./item-ventas-area-negocio.component.css']
})
export class ItemVentasAreaNegocioComponent implements OnInit, OnChanges {

  @Input() VentasAreaNegocio: ReportResultadoAreaNegocioByYear[];

  constructor() { }

  ngOnInit() {
    // console.log(this.VentasAreaNegocio);
  }

  ngOnChanges(as: SimpleChanges) {
    // console.log(this.VentasAreaNegocio);
  }

  toggleMes(agno: ReportResultadoAreaNegocioByYear) {
    let nombre = '[name="tr-' + agno.year + '"]'
    // console.log(nombre);
    $(nombre).toggleClass('myCollapse')
  }

  retTotalAgno(centroCosto) {
    // console.log(centroCosto);
    
    return centroCosto.reduce((acc, el) => acc + el.utilidad.monto, 0)
  }

  retTotalAgnoPorcentaje(centroCosto) {
    return centroCosto.reduce((acc, el) => acc + el.utilidad.porcentaje, 0) / centroCosto.length;
  }

}
