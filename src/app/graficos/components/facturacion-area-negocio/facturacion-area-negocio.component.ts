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
  selector: 'app-facturacion-area-negocio',
  templateUrl: './facturacion-area-negocio.component.html',
  styleUrls: ['./facturacion-area-negocio.component.css']
})
export class FacturacionAreaNegocioComponent implements OnInit, OnChanges {

  @Input() ResumenAgno: ReporteVentas[];

  data: any;

  domElement: HTMLCanvasElement;

  @Output() cerrar = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.grafico()
  }

  ngOnChanges(el: SimpleChanges) {
    this.grafico()
  }

  onlyUnique(value, index, self) {
    if (!value)
      return false
    return self.indexOf(value) === index
  }

  grafico() {
    // console.log(this.ResumenAgno);

    this.domElement = <HTMLCanvasElement>document.getElementById('pieAreaNegocio');
    let ctx = this.domElement.getContext('2d');
    this.data = this.dataChart(this.ResumenAgno)
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataChart(this.ResumenAgno)
    });
  }

  dataChart(arr: ReporteVentas[]) {
    // console.log(arr);
    let areaNegocio: string[];
    areaNegocio = arr.map(el => el.nombreAreaNegocio).filter(this.onlyUnique)
    console.log(areaNegocio);

    return {
      datasets: [{
        data: areaNegocio.map(area => Math.round(arr.filter(el => el.nombreAreaNegocio == area).reduce((acc, el) => acc + el.monto / 1.19, 0))),
        backgroundColor: areaNegocio.map(area => this.genRandomColor())
      }],
      labels: areaNegocio
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
