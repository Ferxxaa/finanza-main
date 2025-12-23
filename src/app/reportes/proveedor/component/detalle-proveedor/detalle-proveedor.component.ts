import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../../../../models/nestProveedor';
import { ReportEvalProv } from '../../../../models/nestReportEvalProv';
import { reportEvalProvService } from '../../../../services/Nest/reportEvalProv.service';
import { nestProveedorService } from '../../../../services/nestProfesional.service';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.css'],
  providers: [
    nestProveedorService,
    reportEvalProvService
  ]
})
export class DetalleProveedorComponent implements OnInit {

  @Input() idProveedor: number;
  @Input() agno: number;

  proveedor$: Observable<Proveedor>
  ordenesPorProveedor: ReportEvalProv[];
  totalOC: number
  cantidadOC: number

  constructor(
    private nestProveedorService: nestProveedorService,
    private reportEvalProvService: reportEvalProvService
  ) { }

  ngOnInit() {
    // console.log(this.idProveedor); 
    this.proveedor$ = this.nestProveedorService.getProveedorById(this.idProveedor)
    this.reportEvalProvService.getDetalleProveedor(this.idProveedor, this.agno).subscribe(res => {
      this.ordenesPorProveedor = res;
      this.cantidadOC = res.length;
      this.totalOC = res.reduce((acc, el) => acc + el.totalOC, 0)
    })
    // this.proveedor$ = this.Proveedor.getProveedorbyID(this.proveedor._id)
    // this.proveedor$.subscribe(res => console.log(res));
    // console.log(this.agno);

  }

  retTotalOrdenes(e) {
    this.cantidadOC = e.cantidadOC;
    this.totalOC = e.totalOC;
  }

}
