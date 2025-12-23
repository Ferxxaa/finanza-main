import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { mReporteProveedor } from '../../../../models/mReporteProveedor';
import { sProveedor } from '../../../../services/sProveedor.service';

interface resumenReporte {
  general: number;
  promedio: number;
  cantidadProveedores: number;
  cantidadOC: number;
}

@Component({
  selector: 'app-resumen-anual',
  templateUrl: './resumen-anual.component.html',
  styleUrls: ['./resumen-anual.component.css']
})
export class ResumenAnualComponent implements OnInit {

  @Input() agno: number;
  @Output() cerrar = new EventEmitter();

  reporteProveedor$: Observable<mReporteProveedor[]>;

  reporteProductos: resumenReporte;
  reporteServicios: resumenReporte;
  reporteSubcontrato: resumenReporte;
  reporteSustituir: resumenReporte;

  loading: boolean;

  constructor(
    private Proveedores: sProveedor
  ) {
    this.reporteProveedor$ = this.Proveedores.getReporteProveedor(this.agno);
    this.reporteProductos = { general: 0, promedio: 0, cantidadProveedores: 0, cantidadOC: 0 }
    this.reporteServicios = { general: 0, promedio: 0, cantidadProveedores: 0, cantidadOC: 0 }
    this.reporteSustituir = { general: 0, promedio: 0, cantidadProveedores: 0, cantidadOC: 0 }
    this.reporteSubcontrato = { general: 0, promedio: 0, cantidadProveedores: 0, cantidadOC: 0 }
    this.loading = true;
  }

  ngOnInit() {
    if (!this.agno)
      this.agno = new Date().getFullYear();
    this.reporteProveedor$ = this.Proveedores.getReporteProveedor(this.agno);
    this.reporteProveedor$.subscribe(res => this.listaReporte(res))
  }

  listaReporte(res: mReporteProveedor[]) {
    let paraReporte: mReporteProveedor[] = res.filter(el => el.OcEvaluadas && el.categoria != "0")
    let productos: mReporteProveedor[] = paraReporte.filter(el => el.categoria == "1");
    let servicios: mReporteProveedor[] = paraReporte.filter(el => el.categoria == "2");
    let subcontrato: mReporteProveedor[] = paraReporte.filter(el => el.categoria == "3");
    let sustituir: mReporteProveedor[] = paraReporte.filter(el => (el.categoria == "1" || el.categoria == "2") && el.evaluacion < 1.81)

    let totalEvaluaciones: number = paraReporte.reduce((acc, el) => acc + el.OcEvaluadas, 0);
    this.reporteProductos = this.generaResumen(productos, totalEvaluaciones)
    this.reporteServicios = this.generaResumen(servicios, totalEvaluaciones)
    this.reporteSubcontrato = this.generaResumen(subcontrato, totalEvaluaciones)
    this.reporteSustituir = this.generaResumen(sustituir, totalEvaluaciones)
    this.loading = false;
  }

  generaResumen(arrReporte: mReporteProveedor[], totalEvaluaciones: number): resumenReporte {
    let resumen: resumenReporte = { general: 0, promedio: 0, cantidadProveedores: 0, cantidadOC: 0 }
    resumen.general = arrReporte.reduce((acc, el) => acc + (el.evaluacion * el.OcEvaluadas / totalEvaluaciones), 0)
    resumen.promedio = arrReporte.reduce((acc, el) => acc + el.evaluacion, 0) / arrReporte.length
    resumen.cantidadProveedores = arrReporte.length
    resumen.cantidadOC = arrReporte.reduce((acc, el) => acc + el.OcEvaluadas, 0);
    return resumen
  }

  Cerrar() {
    this.cerrar.emit({})
  }

}
