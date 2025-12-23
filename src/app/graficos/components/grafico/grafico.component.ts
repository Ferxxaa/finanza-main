import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EvalProveedoresYear } from '../../../models/nestReportEvalProv';

declare var Chart;

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit, OnChanges {

  @Input() data: EvalProveedoresYear[];

  domElement: HTMLCanvasElement;
  ctx: any;
  myChart: any;

  constructor() { }

  ngOnInit() {
    this.genGraph();
    // console.log(this.getCalificacion(this.data));

    // this.genChar('chart_div')
    // console.log(this.getAgnos(this.data));
    // console.log(this.getCalificacion(this.data));
  }

  ngOnChanges(el: SimpleChanges): void {
    this.genGraph();
    // console.log(this.myChart);
  }

  genGraph() {
    this.domElement = <HTMLCanvasElement>document.getElementById('myChart');
    this.ctx = this.domElement.getContext('2d');
    if (this.myChart)
      this.myChart.destroy();
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.getAgnos(this.data),
        datasets: [{
          label: 'Evaluación de proveedores por año',
          backgroundColor: 'transparent',
          borderColor: 'rgb(79, 129, 189)',
          data: this.getCalificacion(this.data),
          // backgroundColor
          lineTension: 0,
          pointBackgroundColor: "#64bd63",
          pointBorderColor: "#64bd63",
          pointRadius: 4
        }]
      },
      options: {
        title: {
          display: true
        }
      }
    });
  }

  getAgnos(arr: EvalProveedoresYear[]): string[] {
    let ret: string[] = [];
    if (arr.length)
      arr.forEach(el => !ret.includes(el.year.toString()) ? ret.push(el.year.toString()) : null)
    return ret
  }

  getCalificacion(arr: EvalProveedoresYear[]): any[] {
    let ret: any[] = [];
    if (arr.length)
      arr.forEach(el => !ret.includes(el.year.toString()) ? ret.push(el.notaPromedio) : null);
    return ret
  }

}
