import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { mReporteProveedor } from '../../../../models/mReporteProveedor';
import { sProveedor } from '../../../../services/sProveedor.service';

@Component({
  selector: 'app-proveedores-estrategicos-costo',
  templateUrl: './proveedores-estrategicos-costo.component.html',
  styleUrls: ['../resumen-anual/resumen-anual.component.css']
})
export class ProveedoresEstrategicosCostoComponent implements OnInit {

  @Input() agno: number;
  @Output() cerrar = new EventEmitter();

  reporteProveedor$: Observable<mReporteProveedor[]>;

  arrProducto: mReporteProveedor[];
  arrServicio: mReporteProveedor[];
  arrSubcontrato: mReporteProveedor[];

  loading: boolean;

  constructor(
    private Proveedores: sProveedor
  ) {
    this.loading = true;
  }

  ngOnInit() {
    if (!this.agno)
      this.agno = new Date().getFullYear();
    this.reporteProveedor$ = this.Proveedores.getReporteProveedor(this.agno);
    this.reporteProveedor$.subscribe(res => {
      let paraReporte: mReporteProveedor[] = res.filter(el => el.OcEvaluadas && el.categoria != "0")
      this.arrProducto = paraReporte.filter(el => el.categoria == "1").sort(this.ordenaPorCantidad).slice(0, 5);
      this.arrServicio = paraReporte.filter(el => el.categoria == "2").sort(this.ordenaPorCantidad).slice(0, 5);
      this.arrSubcontrato = paraReporte.filter(el => el.categoria == "3").sort(this.ordenaPorCantidad).slice(0, 5);
      // console.log(this.arrProducto[0].nombre);
      // console.log(this.arrServicio);
      this.loading = false;
    })
  }

  ordenaPorCantidad(a: mReporteProveedor, b: mReporteProveedor) {
    if (a.totalOrden < b.totalOrden)
      return 1
    if (a.totalOrden > b.totalOrden)
      return -1
    return 0
  }

  Cerrar() {
    this.cerrar.emit({})
  }

}
