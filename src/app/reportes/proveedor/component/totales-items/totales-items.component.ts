import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { mReporteProveedor } from '../../../../models/mReporteProveedor';
import { ReportEvalProv } from '../../../../models/nestReportEvalProv';
import { sProveedor } from '../../../../services/sProveedor.service';

@Component({
  selector: 'app-totales-items',
  templateUrl: './totales-items.component.html',
  styleUrls: ['./totales-items.component.css']
})
export class TotalesItemsComponent implements OnInit, OnChanges {

  @Input() reportEvalProv: ReportEvalProv[];
  // reporteProveedor$: Observable<mReporteProveedor[]>;
  totalEval: number;
  ponderaciontotalEval: number;

  constructor(
    // private Proveedor: sProveedor
  ) {
    // this.reporteProveedor$ = this.Proveedor.getReporteProveedor(new Date().getFullYear());
  }

  ngOnInit() {
    this.totalOC()
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.agno == 0)
    //   this.reporteProveedor$ = this.Proveedor.getReporteProveedor(new Date().getFullYear())
    // if (this.agno)
    //   this.reporteProveedor$ = this.Proveedor.getReporteProveedor(this.agno);
    this.totalOC()
  }

  totalOC() {
    // reporteProv.subscribe(res => {
    //   this.totalEval = res.filter(el => el.OcEvaluadas && el.categoria != "0").reduce((acc, el) => acc + el.OcEvaluadas, 0)
    //   this.ponderaciontotalEval = res.filter(el => el.OcEvaluadas && el.categoria != "0").reduce((acc, el) => acc + (el.evaluacion * el.OcEvaluadas / this.totalEval), 0)
    // });
    this.totalEval = this.reportEvalProv.reduce((acc, el) => acc + el.cantidadEval, 0)
    this.ponderaciontotalEval = this.reportEvalProv.reduce((acc, el) => acc + (el.calificacion * el.cantidadEval / this.totalEval), 0)
  }

}
