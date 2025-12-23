import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { environment } from '../../../../../environments/environment';

declare var Chart;

@Component({
  selector: 'app-grafico-consolidado-barras',
  templateUrl: './grafico-consolidado-barras.component.html',
  styleUrls: ['./grafico-consolidado-barras.component.css']
})
export class GraficoConsolidadoBarrasComponent implements OnInit {

  @Input() ResumenAgno: any[];

  data: any;
  domElement: HTMLCanvasElement;

  myPieChart1: any;
  myPieChart2: any;

  @Output() cerrar = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.grafico();
    this.porcentaje();
  }

  ngOnChanges(el: SimpleChanges) {
    this.grafico();
    this.porcentaje();
  }

  grafico() {
    this.domElement = <HTMLCanvasElement>document.getElementById('lineUtilidadAnual');
    let ctx = this.domElement.getContext('2d');

    this.data = this.dataChart(this.ResumenAgno.slice(-5))
    if (this.myPieChart1)
      this.myPieChart1.destroy();

    let opciones = this.retOpcionesGrafico('Años', 'Millonres $','MM$ ')
    this.myPieChart1 = new Chart(ctx, {
      type: 'line',
      data: this.dataChart(this.ResumenAgno.slice(-5)),
      options: opciones
    });
  }

  porcentaje() {
    this.domElement = <HTMLCanvasElement>document.getElementById('barRentabilidadAnual');
    let ctx = this.domElement.getContext('2d');

    this.data = this.dataChart(this.ResumenAgno);
    if (this.myPieChart2)
      this.myPieChart2.destroy();
    let opciones = this.retOpcionesGrafico('Años', 'Porcentaje (%)',null,'%')
    this.myPieChart2 = new Chart(ctx, {
      type: 'bar',
      data: this.dataRentabilidadChart(this.ResumenAgno),
      options: opciones
    });
  }

  dataChart(arr: any[]) {
    // console.log(arr);
    return {
      datasets: [{
        label: 'Utilidad Arquitectura',
        data: arr.map(el => (el.utilidadArq / environment.factor).toFixed(3)),
        borderColor: this.genRandomColor(),
        backgroundColor: "#66000000"
      },
      {
        label: 'Utilidad Construcción',
        data: arr.map(el => (el.utilidadConstruccion / environment.factor).toFixed(3)),
        borderColor: this.genRandomColor(),
        backgroundColor: "#66000000"
      },
      {
        label: 'Utilidad Consolidada',
        data: arr.map(el => ((el.utilidadArq + el.utilidadConstruccion + this.retOperacional(el)) / environment.factor).toFixed(3)),
        borderColor: this.genRandomColor(),
        backgroundColor: "#66000000"
      }],
      labels: arr.map(el => el.agno)
    }
  }

  dataRentabilidadChart(arr: any[]) {
    // console.log(arr);
    return {
      datasets: [{
        label: 'Rentabilidad Arquitectura',
        data: arr.map(el => el.rentabilidadArq < -100 ? -100 : el.rentabilidadArq),
        backgroundColor: this.genRandomColor()
      },
      {
        label: 'Rentabilidad Construcción',
        data: arr.map(el => el.rentabilidadConstruccion < -100 ? -100 : el.rentabilidadConstruccion),
        backgroundColor: this.genRandomColor()
      },
      {
        label: 'Rentabilidad Total',
        data: arr.map(el => el.finalPorcentaje),
        backgroundColor: this.genRandomColor()
      },
        // {
        //   label: 'Ventas',
        //   data: arr.map(el => el.ventasArea),
        //   backgroundColor: this.genRandomColor()
        // }
      ],
      labels: arr.map(el => el.agno)
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

  retOperacional(item): number {
    // console.log(operacional);
    // this.operacional.reduce((acc, el) => acc + item[el.nombre], 0);
    // return this.operacional.reduce((acc, el) => acc + item[el.nombre], 0);
    // console.log(item);

    return item['OPERACIONAL RETIROS'] - item['Gastos Operacionales Trazas Central (-)']
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
