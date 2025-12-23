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
  centroCosto: mCentroCostoLocal,
  glosa: string,
  fechaEmision: string,
  montoBruto: number,
  estado: string
}

interface mCentroCostoLocal {
  nombre: string,
  colorLetra: string,
  colorFondo: string
}

interface resumenAnual {
  tipo: string,
  facturas: number,
  montoNeto: number
}

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {

  @Input() ResumenAgno: ReporteVentas[];

  data: resumenAnual[]

  @Output() cerrar = new EventEmitter();

  constructor() {
    this.setDefaultValue();
  }

  private setDefaultValue() {
    this.data = [
      { tipo: "Facturas Afectas", facturas: 0, montoNeto: 0 },
      { tipo: "Facturas Exentas", facturas: 0, montoNeto: 0 },
    ]
  }

  ngOnInit() {
    // if (!this.ResumenAgno)
    //   this.setDefaultValue()
    // console.log(this.ResumenAgno);
    // setTimeout(() => {
    //   if (!this.ResumenAgno)
    //     this.setDefaultValue()
    //   console.log(this.ResumenAgno);
    // }, 1000);
    // console.log(this.ResumenAgno);
    this.ResumenAgno = this.ResumenAgno.filter(el => el.estado < 5)
    this.data.map(datamap => {
      if (datamap.tipo.includes('Afecta')) {
        datamap.facturas = this.ResumenAgno.length // reduce((acc, reduc) => acc + reduc.registrosClientes.filter(el => datamap.tipo.includes(el.tipo)).length, 0)
        datamap.montoNeto = this.ResumenAgno.reduce((acc, el) => acc + el.monto / 1.19, 0)//this.ResumenAgno.reduce((acc, reduc) => acc + reduc.registrosClientes.filter(el => datamap.tipo.includes(el.tipo)).reduce((acc, registroCli) => acc + (registroCli.montoBruto / 1.19), 0), 0)
      }
    })
  }

  totalNeto(): number {
    return this.data.reduce((acc, el) => acc + el.montoNeto, 0)
  }

  totalIVA(): number {
    return this.data.reduce((acc, el) => acc + (el.tipo.includes('Afecta') ? el.montoNeto * .19 : 0), 0)
  }

  totalBruto(): number {
    return this.data.reduce((acc, el) => acc + (el.tipo.includes("Afecta") ? el.montoNeto * 1.19 : el.montoNeto), 0)
  }

  Cerrar() {
    this.cerrar.emit(false);
  }

}
