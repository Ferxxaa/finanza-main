import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ReportRentabilidadAreaNegocioByYear } from '../../../models/nestResultadoAreaNegocio';

declare var Chart;

@Component({
  selector: 'app-graph-rentabilidad-area-negocio',
  templateUrl: './graph-rentabilidad-area-negocio.component.html',
  styleUrls: ['./graph-rentabilidad-area-negocio.component.css']
})
export class GraphRentabilidadAreaNegocioComponent implements OnInit {

  @Input() data: ReportRentabilidadAreaNegocioByYear[];

  domElement: HTMLCanvasElement;
  domElementMargen: HTMLCanvasElement;
  ctx: any;
  ctxMargen: any;
  myChart: any;
  myChartMArgen: any;

  titles = ['Ingreso Total Neto', 'Gasto Operacional', 'Utilidad Final']
  titlesMargen = ['Margen 1 de Utilidad', 'Margen 2 de Utilidad']

  constructor() { }

  ngOnInit() {
    this.generaChar()
  }

  ngOnChanges() {
    this.generaChar();
    this.generaCharMargen();
  }

  generaChar() {
    this.domElement = <HTMLCanvasElement>document.getElementById('myChartRentabilidadAreaNegocio');
    // console.log(this.domElement);
    // console.log(this.data);
    // console.log("Grafico: ", this.data);
    if (this.myChart)
      this.myChart.destroy();
    let opciones = this.retOpcionesGrafico('Años', 'Millones', 'MM$ ')
    if (this.domElement) {
      this.ctx = this.domElement.getContext('2d');
      this.myChart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.data.map(el => el.year),
          datasets: this.retFormatData(this.data)
        },
        options: opciones
      });
    }
  }

  generaCharMargen() {
    this.domElementMargen = <HTMLCanvasElement>document.getElementById('myChartMargenRentabilidadAreaNegocio');
    // console.log(this.domElementMargen);
    // console.log(this.data);
    // console.log("Grafico: ", this.data);
    if (this.myChartMArgen)
      this.myChartMArgen.destroy();
    let opciones = this.retOpcionesGrafico('Años', 'Porcentaje', null, '%')
    if (this.domElementMargen) {
      this.ctxMargen = this.domElementMargen.getContext('2d');
      this.myChartMArgen = new Chart(this.ctxMargen, {
        type: 'bar',
        data: {
          labels: this.data.map(el => el.year),
          datasets: this.retFormatDataMargen(this.data),
        },
        options: opciones
      });
    }
  }

  retFormatData(data: ReportRentabilidadAreaNegocioByYear[]) {
    // console.log(data);
    let arrTemp = [];
    arrTemp.push({
      label: this.titles[0],
      data: data.map(el => (el.ingresos / environment.factor).toFixed(3)),
      borderColor: this.genRandomColor(),
      backgroundColor: "#66000000"
    })
    arrTemp.push({
      label: this.titles[1],
      data: data.map(el => (el.totalOperacional / environment.factor).toFixed(3)),
      borderColor: this.genRandomColor(),
      backgroundColor: "#66000000"
    })
    arrTemp.push({
      label: this.titles[2],
      data: data.map(el => (el.margen2Utilidad / environment.factor).toFixed(3)),
      borderColor: this.genRandomColor(),
      backgroundColor: "#66000000"
    })
    // console.log(arrTemp);

    return arrTemp
  }

  retFormatDataMargen(data: ReportRentabilidadAreaNegocioByYear[]) {
    // console.log(data);
    let arrTemp = [];
    arrTemp.push({
      label: this.titlesMargen[0],
      data: data.map(el => (el.margen1Utilidad * 100 / el.ingresos ? el.margen1Utilidad * 100 / el.ingresos : 0).toFixed(3)),
      backgroundColor: this.genRandomColor()
    })
    arrTemp.push({
      label: this.titlesMargen[1],
      data: data.map(el => (el.margen2Utilidad * 100 / el.ingresos ? el.margen2Utilidad * 100 / el.ingresos : 0).toFixed(3)),
      backgroundColor: this.genRandomColor()
    })
    // console.log(arrTemp);

    return arrTemp
  }

  genRandomColor(): string {
    let r = Math.floor(Math.random() * (255 - 0)) + 0;
    let g = Math.floor(Math.random() * (255 - 0)) + 0;
    let b = Math.floor(Math.random() * (255 - 0)) + 0;
    return `rgba(${r}, ${g}, ${b}, 0.6)`
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
