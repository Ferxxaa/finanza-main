import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReporteVentas } from '../../../models/nestReportVentas';

interface tablaResumenAgno {
  mes: string,
  registrosClientes: registroClientes[]
}

interface registroClientes {
  facturas: number,
  tipo: string,
  cliente: string,
  areaNegocio: string,
  centroCosto: mCentroCosto,
  glosa: string,
  fechaEmision: string,
  montoBruto: number,
  estado: string
}

interface mCentroCosto {
  nombre: string,
  colorLetra: string,
  colorFondo: string
}

declare var Chart;

@Component({
  selector: 'app-compra-tipo-facturacion',
  templateUrl: './compra-tipo-facturacion.component.html',
  styleUrls: ['./compra-tipo-facturacion.component.css']
})
export class CompraTipoFacturacionComponent implements OnInit, OnChanges {

  @Input() ResumenAgno: ReporteVentas[];

  data: any;
  domElement: HTMLCanvasElement;

  @Output() cerrar = new EventEmitter();


  constructor() { }

  ngOnInit() {

    this.grafico();
    // console.log(this.ResumenAgno);
  }

  ngOnChanges(el: SimpleChanges) {
    this.grafico();
  }

  grafico() {
    // console.log(this.ResumenAgno);

    this.domElement = <HTMLCanvasElement>document.getElementById('pieTipoFacturacion');
    let ctx = this.domElement.getContext('2d');
    // console.log(this.dataChart(this.ResumenAgno));

    this.data = this.dataChart(this.ResumenAgno)
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataChart(this.ResumenAgno)
    });
  }

  dataChart(arr: ReporteVentas[]) {
    // console.log(arr);

    return {
      datasets: [{
        data: [
          arr ? Math.round(arr.filter(el => el.tipo == 5).reduce((acc, el) => acc + el.monto / 1.19, 0)) : 0,
          arr ? Math.round(arr.filter(el => el.tipo != 5).reduce((acc, el) => acc + el.monto / 1.19, 0)) : 0
        ],
        backgroundColor: [this.genRandomColor(), this.genRandomColor()]
      }],
      labels: [
        'Facturas Afectas',
        'Facturas Exentas'
      ]
    }
  }

  genRandomColor(): string {
    let r = Math.floor(Math.random() * (255 - 0)) + 0;
    let g = Math.floor(Math.random() * (255 - 0)) + 0;
    let b = Math.floor(Math.random() * (255 - 0)) + 0;
    return `rgba(${r}, ${g}, ${b}, 0.6)`
  }

  Cerrar() {
    this.cerrar.emit({})
  }

}
