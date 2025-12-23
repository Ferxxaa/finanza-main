import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { mOrdenCompra } from '../../../../models/mOrdenCompra';
import { ReportEvalProv } from '../../../../models/nestReportEvalProv';
import { reportEvalProvService } from '../../../../services/Nest/reportEvalProv.service';

@Component({
  selector: 'app-detalle-evaluaciones',
  templateUrl: './detalle-evaluaciones.component.html',
  styleUrls: ['./detalle-evaluaciones.component.css'],
  providers: [
    reportEvalProvService
  ]
})
export class DetalleEvaluacionesComponent implements OnInit {

  @Input()  ordenesPorProveedor: ReportEvalProv[];

  constructor(
  ) {

  }

  ngOnInit() {
    
    // console.log(this.agno);

    // this.ordenesPorProveedor$.subscribe(res => console.log(res));
    // this.ordenesPorProveedor$.subscribe(res => {
    //   let ordenes = this.filtraOrdenesAgno(this.agno, res)
    //   this.retTotalOC.emit({ totalOC: this.Ordenes.retMontoNetoSinConfirmar(ordenes), cantidadOC: ordenes.length })
    // })
  }

  filtraOrdenesAgno(agno: number, arr) {
    return arr.filter(el => el.evaluacion && new Date(el.fechaCreacion).getFullYear() == agno)
  }

}
