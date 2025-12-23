import { Component, Input, OnInit } from '@angular/core';

interface tablaResumen {
  campo: string,
  valor: number
}

@Component({
  selector: 'app-tabla-resumen-graficos',
  templateUrl: './tabla-resumen-graficos.component.html',
  styleUrls: ['./tabla-resumen-graficos.component.css']
})
export class TablaResumenGraficosComponent implements OnInit {

  @Input() ResumenAgno: any;
  tabla: tablaResumen[];

  constructor() { }

  ngOnInit() {
    let tablaTemp = this.ResumenAgno.labels.map((el, index) => ({ campo: el, valor: this.ResumenAgno.datasets[0].data[index] }))
    // console.log(this.ResumenAgno);
    // console.log(tablaTemp);
    this.tabla = tablaTemp;
  }

}
