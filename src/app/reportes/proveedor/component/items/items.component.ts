import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { mReporteProveedor } from '../../../../models/mReporteProveedor';
import { ReportEvalProv } from '../../../../models/nestReportEvalProv';
import { sProveedor } from '../../../../services/sProveedor.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['../cabecera/cabecera.component.css']
})
export class ItemsComponent implements OnInit, OnChanges {

  arrProveedor: Observable<mReporteProveedor[]>
  totalEvaluaciones: number
  totalOCEval: number;

  @Input() agno: number;
  @Input() filtro: String[];
  @Input() titulo: String;
  @Input() reportEvalProv: ReportEvalProv[];

  @Output() loading = new EventEmitter();

  view: boolean;

  clicked: boolean[];

  constructor(
    private proveedor: sProveedor
  ) {
    this.totalEvaluaciones = 1;
    this.arrProveedor = this.proveedor.getReporteProveedor(new Date().getFullYear())
    this.clicked = [false];
    this.view = false;
  }

  ngOnInit() {
    this.totalEvaluaciones = this.reportEvalProv.reduce((acc, el) => acc + el.cantidadEval, 0)
    // this.calcTotalOC(this.arrProveedor);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //   this.loading.emit({ loading: true })
    //   if (this.agno == 0)
    //     this.arrProveedor = this.proveedor.getReporteProveedor(new Date().getFullYear())
    //   if (this.agno)
    //     this.arrProveedor = this.proveedor.getReporteProveedor(this.agno);
    //   this.calcTotalOC(this.arrProveedor);
  }

  // calcTotalOC(arrProveedor: Observable<mReporteProveedor[]>) {
  //   arrProveedor.subscribe(res => {
  //     this.clicked = res.map(el => false);
  //     this.totalEvaluaciones = res.filter(el => el.OcEvaluadas && el.categoria != "0").reduce((acc, el) => acc + el.OcEvaluadas, 0);
  //     this.loading.emit({ loading: false })
  //   });
  // }

}
