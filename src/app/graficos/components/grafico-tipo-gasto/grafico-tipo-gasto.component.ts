import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { tablaReporteOperacional } from '../../../models/nestReporteOperacional';

declare var Chart;

@Component({
  selector: 'app-grafico-tipo-gasto',
  templateUrl: './grafico-tipo-gasto.component.html',
  styleUrls: ['./grafico-tipo-gasto.component.css']
})
export class GraficoTipoGastoComponent implements OnInit, OnChanges {

  @Input() data: tablaReporteOperacional[];

  domElement: HTMLCanvasElement;
  ctx: any;
  myChart: any;

  constructor() { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.generaChar()
    //   this.genchart()
    // }, 1000);
  }

  ngOnChanges() {
    this.generaChar();
  }

  generaChar() {
    this.domElement = <HTMLCanvasElement>document.getElementById('myChartTipoGasto');
    // console.log(this.domElement);
    // console.log(this.data);
    if (this.myChart)
      this.myChart.destroy();
    if (this.domElement) {
      this.ctx = this.domElement.getContext('2d');
      this.myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
          datasets: this.retFormatData(this.data)
        },
        options: this.retOpcionesGrafico('Meses', 'Millones', 'MM$ ')
      });
    }
  }

  retFormatData(data: tablaReporteOperacional[]) {
    const colorStack = [
      'rgba(0, 99, 132, 0.6)',
      'rgba(255, 0, 0, 0.6)',
      'rgba(0, 255, 0, 0.6)',
      'rgba(0, 0, 255, 0.6)',
      'rgba(255, 153, 0, 0.6)',
      'rgba(255, 0, 255, 0.6)',
      'rgba(0, 255, 255, 0.6)',
      'rgba(128, 0, 0, 0.6)',
      'rgba(0, 128, 0, 0.6)',
      'rgba(0, 0, 128, 0.6)',
      'rgba(128, 128, 0, 0.6)',
      'rgba(128, 0, 128, 0.6)',
      'rgba(0, 128, 128, 0.6)',
      'rgba(192, 192, 192, 0.6)',
      'rgba(128, 128, 128, 0.6)'
    ];
    let arrTemp = [];
    // console.log(data);
    if (data && data.length) {
      data.filter(el => !el.nombreTipoGasto.toLowerCase().includes("retiros")).forEach((el, i) => {
        let obj = { label: null, data: [], backgroundColor: 'rgba(0, 99, 132, 0.6)' }
        obj.label = el.nombreTipoGasto;
        obj.data = this.retArrData(el);
        // obj.backgroundColor = this.genRandomColor()
        obj.backgroundColor = colorStack[i % colorStack.length]

        arrTemp.push(obj)
      })
    }
    // console.log(arrTemp);

    return arrTemp
  }

  retArrData(el: tablaReporteOperacional): number[] {
    let arr = [];
    for (const mes of ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']) {
      arr.push((el[mes] / environment.factor).toFixed(3))
    }
    // for (let mes = 1; mes < 13; mes++) {
    //   arr.push((el[Object.keys(el)[mes]] / environment.factor).toFixed(3))
    // }
    return arr;
  }

  genRandomColor(): string {
    let r = Math.floor(Math.random() * (255 - 0)) + 0;
    let g = Math.floor(Math.random() * (255 - 0)) + 0;
    let b = Math.floor(Math.random() * (255 - 0)) + 0;
    return `rgba(${r}, ${g}, ${b}, 0.6)`
  }

  // genchart() {
  //   var densityCanvas = <HTMLCanvasElement>document.getElementById('myChartTipoGasto');

  //   // var densityData = {
  //   //   label: 'Density of Planet (kg/m3)',
  //   //   data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638],
  //   //   backgroundColor: 'rgba(0, 99, 132, 0.6)',
  //   //   borderWidth: 0,
  //   //   yAxisID: "y-axis-density"
  //   // };

  //   var densityData = {
  //     label: 'Density of Planets (kg/m3)',
  //     data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638],
  //     backgroundColor: 'rgba(0, 99, 132, 0.6)'
  //   };

  //   var gravityData = {
  //     label: 'Gravity of Planet (m/s2)',
  //     data: [3.7, 8.9, 9.8, 3.7, 23.1, 9.0, 8.7, 11.0],
  //     backgroundColor: 'rgba(99, 132, 0, 0.6)',
  //     borderWidth: 0,
  //     yAxisID: "y-axis-gravity"
  //   };

  //   var barChart = new Chart(densityCanvas, {
  //     type: 'bar',
  //     data: {
  //       labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
  //       datasets: [densityData],
  //     }
  //   });

  // }

  calcTotalTipo(item) {
    let total = 0;
    for (let mes = 1; mes < 13; mes++) {
      total += item[Object.keys(item)[mes]]
    }
    return item
  }

  retOpcionesGrafico(nombreEjeX: string, nombreEjeY: string, prefixY?: string, postfixY?: string) {
    const opciones = {
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
