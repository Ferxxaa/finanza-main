import { Component, Input, OnInit } from '@angular/core';
import { ReportRentabilidadAreaNegocioByYear } from '../../../models/nestResultadoAreaNegocio';

@Component({
  selector: 'app-tabla-rentabilidad',
  templateUrl: './tabla-rentabilidad.component.html',
  styleUrls: ['./tabla-rentabilidad.component.css']
})
export class TablaRentabilidadComponent implements OnInit {

  @Input() VentasAreaNegocio: ReportRentabilidadAreaNegocioByYear[];

  constructor() { }

  ngOnInit() {
  }

}
