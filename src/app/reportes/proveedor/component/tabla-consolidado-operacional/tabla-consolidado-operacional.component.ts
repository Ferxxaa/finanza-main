import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-consolidado-operacional',
  templateUrl: './tabla-consolidado-operacional.component.html',
  styleUrls: ['../tabla-resumen-graficos/tabla-resumen-graficos.component.css']
})
export class TablaConsolidadoOperacionalComponent implements OnInit {

  @Input() consolidado: any;
  @Input() operacional: any;

  constructor() { }

  ngOnInit() {}

  retItem(nombre: any, item): number {
    // return item[nombre.nombre];
    return 123456789;
  }

}
