import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReporteVentas, ReporteVentasMonth } from '../../../../models/nestReportVentas';

declare var $: any;


interface tablaResumenAgno {
  mes: string,
  registrosClientes: registroClientes[]
}

interface mCentroCosto {
  nombre: string,
  colorLetra: string,
  colorFondo: string
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

@Component({
  selector: 'app-facturas-emitidas-agno',
  templateUrl: './facturas-emitidas-agno.component.html',
  styleUrls: ['./facturas-emitidas-agno.component.css']
})
export class FacturasEmitidasAgnoComponent implements OnInit, OnChanges {

  @Input() ResumenAgno: ReporteVentasMonth[];
  @Input() proyectadas: ReporteVentasMonth[];
  @Input() centroCosto: string;
  @Input() agno: number;

  constructor() {
    // this.setDefaultValue();
  }

  ngOnInit() {
    // console.log(this.ResumenAgno);
  }

  ngOnChanges(change: SimpleChanges) {
    // console.log(this.ResumenAgno);
  }

  filtrar(centroCosto: string, arr: registroClientes[], mes?: string): registroClientes[] {
    if (centroCosto)
      return arr.filter(el => el.centroCosto.nombre.toUpperCase() == centroCosto.toUpperCase());
    else
      return arr
  }

  retTotalNeto(repoVentas: ReporteVentas[]): number {
    if (!repoVentas)
      return 0
    // return repoVentas.tipo == 5 ? repoVentas.monto / 1.19 : repoVentas.monto
    return this.pagadas(repoVentas).reduce((acc, el) => acc + (el.tipo == 5 ? el.monto / 1.19 : el.monto), 0)
  }

  retTotalNetoProyectadas(): number {
    if (!this.ResumenAgno)
      return 0
    // return repoVentas.tipo == 5 ? repoVentas.monto / 1.19 : repoVentas.monto
    return this.pendientes(this.ResumenAgno).reduce((acc, el) => acc + (el.tipo == 5 ? el.monto / 1.19 : el.monto), 0)
  }

  retTotalIVA(repoVentas: ReporteVentas[]): number {
    if (!repoVentas)
      return 0
    // return repoVentas.tipo == 5 ? repoVentas.monto * .19 : 0
    return this.pagadas(repoVentas).reduce((acc, el) => acc + (el.tipo == 5 ? el.monto / 1.19 * .19 : 0), 0)
  }

  retTotalIVAProyectadas(): number {
    if (!this.ResumenAgno)
      return 0
    // return repoVentas.tipo == 5 ? repoVentas.monto * .19 : 0
    return this.pendientes(this.ResumenAgno).reduce((acc, el) => acc + (el.tipo == 5 ? el.monto / 1.19 * .19 : 0), 0)
  }

  retTotalBruto(repoVentas: ReporteVentas[]): number {
    if (!repoVentas)
      return 0
    return this.pagadas(repoVentas).reduce((acc, el) => acc + el.monto, 0)
  }

  retTotalBrutoPendientes(): number {
    if (!this.ResumenAgno)
      return 0
    return this.pendientes(this.ResumenAgno).reduce((acc, el) => acc + (el.tipo == 5 ? el.monto : el.monto), 0)
  }

  retTotalNetoAgno() {
    if (!this.ResumenAgno)
      return 0
    return this.ResumenAgno.reduce((acc, el) => acc + this.retTotalNeto(this.pagadas(el.reporteVentas)), 0)
  }

  retTotalNetoAgnoProyectadas() {
    if (!this.ResumenAgno)
      return 0
    // console.log("Neto Pendiente", this.pendientes(this.ResumenAgno).reduce((acc, el) => acc + el.monto, 0));
    return this.pendientes(this.ResumenAgno).reduce((acc, el) => acc + (el.monto / 1.19), 0)
  }

  retTotalIVAAgno() {
    if (!this.ResumenAgno)
      return 0
    return this.ResumenAgno.reduce((acc, el) => acc + this.retTotalIVA(this.pagadas(el.reporteVentas)), 0)
  }

  retTotalIVAAgnoPendientes() {
    if (!this.ResumenAgno)
      return 0
    return this.pendientes(this.ResumenAgno).reduce((acc, el) => acc + (el.tipo == 5 ? el.monto / 1.19 * .19 : 0), 0)
  }

  retTotalBrutoAgno() {
    if (!this.ResumenAgno)
      return 0
    return this.ResumenAgno.reduce((acc, el) => acc + this.retTotalBruto(this.pagadas(el.reporteVentas)), 0)
  }

  retTotalBrutoAgnoPendientes() {
    if (!this.ResumenAgno)
      return 0
    return this.pendientes(this.ResumenAgno).reduce((acc, el) => acc + el.monto, 0)
  }

  toggleMes(mes: tablaResumenAgno) {
    let nombre = '[name="tr-' + mes.mes + '"]'
    $(nombre).toggleClass('myCollapse')
  }

  toggleProyectadas(txtNombre: string) {
    let nombre = '[name="proyectadas"]'
    $(nombre).toggleClass('myCollapse')
  }

  pagadas(reporteVentas: ReporteVentas[]) {
    return reporteVentas.filter(el => el.estado == 4)
  }

  pendientes(reporteVentas: ReporteVentasMonth[]): ReporteVentas[] {
    return reporteVentas.reduce((acc, el) => acc.concat([...el.reporteVentas]), []).filter(el => el.estado < 4)
  }

}
