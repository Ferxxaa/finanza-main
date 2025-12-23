import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ReporteVentas, ReporteVentasMonth } from '../../../models/nestReportVentas';
import { reporteVentasService } from '../../../services/Nest/reporteVentas.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';

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
  selector: 'app-facturacion-mensual',
  templateUrl: './facturacion-mensual.component.html',
  styleUrls: ['./facturacion-mensual.component.css']
})
export class FacturacionMensualComponent implements OnInit, OnChanges {

  @Input() ResumenAgno: ReporteVentasMonth[];

  domElement: HTMLCanvasElement;
  domElementAgnos: HTMLCanvasElement;

  @Output() cerrar = new EventEmitter();

  constructor(
    private OrdenCompra: sOrdenComra,
    private reporteVentasService: reporteVentasService
  ) { }

  ngOnInit() {
    this.grafico();
  }

  ngOnChanges(el: SimpleChanges) {
    this.grafico()
    this.getDataGraficoAgnos();
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  grafico() {
    // console.log(this.ResumenAgno);
    const domElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('lineFacturacionMensual');
    // this.domElement = <HTMLCanvasElement>document.getElementById('lineFacturacionMensual');
    const ctx = domElement.getContext('2d');
    ctx.clearRect(0, 0, domElement.width, domElement.height);

    const opciones = this.retOpcionesGrafico('Meses', 'Millones', 'MM$ ')
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: this.dataChart(this.ResumenAgno),
      options: opciones
    });
  }

  dataChart(arr: ReporteVentasMonth[]) {
    // console.log(arr);
    // const centroCosto: string[] = arr.reduce((acc, el) => acc.concat(el.reporteVentas.map(el => el.nombreCentroCosto)), []).filter(this.onlyUnique);
    // console.log(centroCosto);

    return {
      datasets: [{
        label: 'Facturación mensual',
        data: arr.map(mes => Math.round(mes.reporteVentas.reduce((acc, el) => acc + (el.monto / 1.19), 0) / environment.factor).toFixed(3)), //arr.map(mes => (mes.registrosClientes.reduce((acc, el) => acc + Math.round(el.montoBruto / 1.19), 0) / environment.factor).toFixed(3)),
        backgroundColor: this.genRandomColor(),
        // lineTension: 0,
      }],
      labels: arr.map(el => el.mes)
    }
  }

  getDataGraficoAgnos(agno: number = new Date().getFullYear()) {
    // let agnos = [agno - 4, agno - 3, agno - 2, agno - 1, agno];
    // this.OrdenCompra.getVentas().subscribe(res => {
    //   // console.log('Ventas',res);
    //   let ventasHistorico = res.filter(el => new Date(el.fecha).getFullYear() > (agno - 5))
    //   // console.log('Historico', ventasHistorico);
    //   let data = this.retFormatData(agnos, ventasHistorico);
    //   this.graficoAgnos(data)
    // });
    const agnos = [agno - 4, agno - 3, agno - 2, agno - 1, agno];
    this.reporteVentasService.getReportByFiveYear(agno).subscribe(res => {
      // console.log(res);
      const data = this.retFormatData(agnos, res);
      this.graficoAgnos(data)
    })
  }

  graficoAgnos(data: any) {
    // console.log(this.ResumenAgno);

    this.domElementAgnos = <HTMLCanvasElement>document.getElementById('lineFacturacionMensualAgnos');
    let ctx = this.domElementAgnos.getContext('2d');
    let opciones = this.retOpcionesGrafico('Meses', 'Millones', 'MM$ ')
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        datasets: data
      },
      options: opciones
    });
  }

  retFormatData(agnos: number[], data: ReporteVentas[]) {
    let arrTemp = [];
    // console.log(data);
    if (data && data.length) {
      agnos.forEach(elagno => {
        let dataAgno = data.filter(el => new Date(el.fechaPago).getFullYear() == elagno)
        // console.log(elagno);
        let datosMes = this.retArrMes(dataAgno)
        // console.log(datosMes);
        let obj = { label: null, data: [], borderColor: 'rgba(0, 99, 132, 0.6)', backgroundColor: 'rgba(0, 99, 132, 0)' }
        obj.label = elagno;
        obj.data = datosMes;
        obj.borderColor = this.genRandomColor()
        arrTemp.push(obj)
      });

      // data.forEach(el => {
      //   let obj = { label: null, data: [], backgroundColor: 'rgba(0, 99, 132, 0.6)' }
      //   obj.label = el.tipo;
      //   obj.data = el;
      //   obj.backgroundColor = this.genRandomColor()

      //   arrTemp.push(obj)
      // })
    }
    // console.log(arrTemp);

    return arrTemp
  }

  retArrMes(dataAgno: ReporteVentas[]) {
    let total: any[] = [];
    for (let mes = 0; mes < 12; mes++) {
      let dataMes = dataAgno.filter(el => new Date(el.fechaPago).getMonth() == mes)
      // console.log(dataMes);
      let montoTotal = (dataMes.reduce((acc, el) => acc + el.monto, 0) / environment.factor).toFixed(3);
      total.push(montoTotal)
    }
    return total
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

  retOpcionesGrafico(nombreEjeX: string, nombreEjeY: string, prefixY?: string, postfixY?: string) {
    let opciones = {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: nombreEjeX,
            fontFamily: 'Arial'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: nombreEjeY,
            fontFamily: 'Arial'
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              if (prefixY && postfixY)
                return prefixY + value + postfixY;
              else if (prefixY)
                return prefixY + value;
              else if (postfixY)
                return value + postfixY;
              else
                return value
            }
          }
        }]
      }
    }
    return opciones
  }

}
