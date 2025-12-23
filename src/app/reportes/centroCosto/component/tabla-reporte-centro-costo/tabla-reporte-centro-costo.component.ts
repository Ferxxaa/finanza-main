import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { sOrdenComra } from '../../../../services/sOrdenComra.service';
import { Observable } from 'rxjs';
import { ReporteCentroCostoService } from '../../../../services/Nest/reporteCentroCostoConsolidado.service';

@Component({
  selector: 'app-tabla-reporte-centro-costo',
  templateUrl: './tabla-reporte-centro-costo.component.html',
  styleUrls: ['./tabla-reporte-centro-costo.component.css'],
  providers: [
    ReporteCentroCostoService
  ]
})
export class TablaReporteCentroCostoComponent implements OnInit, OnChanges {

  // data;
  @Input() areaNegocio;

  desplegar$: Observable<any>;

  original;

  constructor(
    private Ordenes: sOrdenComra,
    private reporteCentroCostoService: ReporteCentroCostoService
  ) { }

  ngOnInit() {
    // this.addHistorico();
    // console.log(this.data);
    this.desplegar$ = this.reporteCentroCostoService.getReporteCentroCostoConsolidado();
    // this.desplegar$.subscribe(res => console.log(res))
  }

  ngOnChanges(cambio: SimpleChanges) {
    // this.filter();
    // console.log(this.data);
  }

  // filter() {
  //   if (this.areaNegocio != '0' && this.original)
  //     this.desplegar = this.original.filter(el => el.areaNegocio._id == this.areaNegocio);
  // }

  retIva(egresos) {
    return egresos.length ? this.Ordenes.retTotalIva(egresos) : 0;
  }

}
