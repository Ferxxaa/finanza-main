import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tabla-consolidado',
  templateUrl: './tabla-consolidado.component.html',
  styleUrls: ['../tabla-resumen-graficos/tabla-resumen-graficos.component.css']
})
export class TablaConsolidadoComponent implements OnInit {

  @Input() consolidado: any;
  @Input() operacional: any;

  rowCount: number

  constructor() { }

  ngOnInit() {
    this.consolidado = this.consolidado.sort(this.ordenar).slice(-5);
    this.rowCount = 2 + this.operacional.length;

    // console.log("Consolidado:",this.consolidado);
    // console.log("Operacional:",this.operacional);

  }

  // ngOnChanges(val:SimpleChanges){
  //   console.log("Consolidado:",this.consolidado);
  //   console.log("Operacional:",this.operacional);
  // }

  ordenar(a, b) {
    return a.agno > b.agno ? 1 : -1
  }

  retItem(nombre: any, item): number {
    return item[nombre.nombre];
  }

  retOperacional(item): number {
    // console.log(operacional);
    // this.operacional.reduce((acc, el) => acc + item[el.nombre], 0);
    // return this.operacional.reduce((acc, el) => acc + item[el.nombre], 0);
    return item['OPERACIONAL RETIROS'] - item['Gastos Operacionales Trazas Central (-)']  - item['OPERACIONAL INVERSIONES']
  }

}
