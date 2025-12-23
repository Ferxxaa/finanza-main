import { Component, OnInit } from '@angular/core';
import { EvalProveedoresYear } from '../../../models/nestReportEvalProv';
import { reportEvalProvService } from '../../../services/Nest/reportEvalProv.service';

@Component({
  selector: 'app-grafico-proveedor',
  templateUrl: './grafico-proveedor.component.html',
  styleUrls: ['./grafico-proveedor.component.css'],
  providers: [reportEvalProvService]
})
export class GraficoProveedorComponent implements OnInit {

  data: EvalProveedoresYear[];

  loading: boolean;

  constructor(
    private reportEvalProvService: reportEvalProvService
  ) {
    this.loading = false;
    this.data = [
      { year: 2012, tipoProveedor: 'Bienes - Servicios', cantidadProveedores: 26, cantidadEvaluaciones: 0, notaPromedio: 2.49 },
      { year: 2013, tipoProveedor: 'Bienes - Servicios', cantidadProveedores: 49, cantidadEvaluaciones: 0, notaPromedio: 2.62 },
      { year: 2014, tipoProveedor: 'Bienes - Servicios', cantidadProveedores: 32, cantidadEvaluaciones: 0, notaPromedio: 2.44 },
      { year: 2015, tipoProveedor: 'Bienes - Servicios', cantidadProveedores: 57, cantidadEvaluaciones: 0, notaPromedio: 2.48 },
      { year: 2016, tipoProveedor: 'Bienes - Servicios', cantidadProveedores: 41, cantidadEvaluaciones: 0, notaPromedio: 2.63 },
      { year: 2017, tipoProveedor: 'Bienes - Servicios', cantidadProveedores: 32, cantidadEvaluaciones: 0, notaPromedio: 2.71 },
      { year: 2018, tipoProveedor: 'Bienes - Servicios', cantidadProveedores: 33, cantidadEvaluaciones: 0, notaPromedio: 2.75 },
      { year: 2019, tipoProveedor: 'Bienes - Servicios', cantidadProveedores: 61, cantidadEvaluaciones: 0, notaPromedio: 2.81 }
    ]
  }

  ngOnInit() {
    this.reportEvalProvService.getProveedoresYears().subscribe(res => {
      this.data = this.data.concat(res);
    })
  }

}
