import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { sGastos } from '../../../../services/sGastos.service';
import { sOrdenComra } from '../../../../services/sOrdenComra.service';
import { ReporteDetalleTipoGastoEntity } from '../../../../models/reporteCentroCosto';
import { ReporteCentroCostoService } from '../../../../services/Nest/reporteCentroCostoConsolidado.service';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css'],
  providers: [
    ReporteCentroCostoService
  ]
})
export class DetalleOrdenComponent implements OnInit {

  // @Input() ordenesCentroCosto: mOrdenCompra[];
  // @Input() totalOC: number;

  @Input() idCentroCosto: number;
  @Input() totalOC: number;

  tiposGasto$: Observable<ReporteDetalleTipoGastoEntity[]>;
  nombreCentroCosto: string;

  graph: boolean;

  constructor(
    // private TiposGastos: sGastos,
    // private OrdenCompra: sOrdenComra
    private ReporteCentroCostoService: ReporteCentroCostoService
  ) {
    this.tiposGasto$ = null;
    this.graph = false;
  }

  ngOnInit() {
    // console.log("ordenesCentroCosto:", this.ordenesCentroCosto);
    // this.tiposGasto$.subscribe(res => console.log(res))
    // console.log(this.idCentroCosto);
    console.log(this.totalOC);

    this.tiposGasto$ = this.ReporteCentroCostoService.getReporteTipoGasto(this.idCentroCosto);
    // this.nombreCentroCosto = this.ordenesCentroCosto[0].subCentroCosto;
  }

  // getTotalTipoGasto(idTipoGasto: any): number {
  //   let ordenesTipoGasto = this.ordenesCentroCosto.filter(el => el.tipoGasto && el.tipoGasto._id == idTipoGasto._id)
  //   if (ordenesTipoGasto.length)
  //     return this.OrdenCompra.retMontoNetoSinConfirmar(ordenesTipoGasto);
  //   else
  //     return 0
  // }

  // getTotalSubTipoGasto(tipoGasto: any, nombreSubTipoGasto: string): number {
  //   let ordenesSubTipoGasto = this.ordenesCentroCosto.filter(el => el.tipoGasto && el.tipoGasto._id == tipoGasto._id && el.subTipoGasto && el.subTipoGasto == nombreSubTipoGasto);
  //   if (ordenesSubTipoGasto.length)
  //     return this.OrdenCompra.retMontoNetoSinConfirmar(ordenesSubTipoGasto);
  //   else
  //     return 0
  // }

}
