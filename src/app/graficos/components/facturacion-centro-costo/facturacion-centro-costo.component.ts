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
  selector: 'app-facturacion-centro-costo',
  templateUrl: './facturacion-centro-costo.component.html',
  styleUrls: ['./facturacion-centro-costo.component.css']
})
export class FacturacionCentroCostoComponent implements OnInit, OnChanges {

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
    return self.indexOf(value) === index
  }

  grafico() {
    // console.log(this.ResumenAgno);

    this.domElement = <HTMLCanvasElement>document.getElementById('pieCentroCosto');
    let ctx = this.domElement.getContext('2d');
    this.data = this.dataChart(this.ResumenAgno)
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataChart(this.ResumenAgno)
    });
  }

  dataChart(arr: ReporteVentas[]) {
    // console.log(arr);
    let centroCosto: string[];
    centroCosto = arr.map(el => el.nombreCentroCosto).filter(this.onlyUnique)//arr.reduce((acc, el) => acc.concat(el.registrosClientes.map(registro => registro.centroCosto.nombre)), []).filter(this.onlyUnique)

    // console.log(centroCosto);

    return {
      datasets: [{
        data: centroCosto.map(centro => Math.round(arr.filter(el => el.nombreCentroCosto == centro).reduce((acc, el) => acc + el.monto / 1.19, 0))),
        backgroundColor: centroCosto.map(area => this.genRandomColor())
      }],
      labels: centroCosto
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
