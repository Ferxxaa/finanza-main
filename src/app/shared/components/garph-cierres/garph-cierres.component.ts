import { Component, OnInit } from '@angular/core';
import { sCierre } from '../../../services/sCierre.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { Comunes } from '../../../Share/Comunes';

declare var Chart;

@Component({
  selector: 'app-garph-cierres',
  templateUrl: './garph-cierres.component.html',
  styleUrls: ['./garph-cierres.component.css'],
  providers: [
    sCierre,
    Comunes
  ]
})
export class GarphCierresComponent implements OnInit {

  allCerados: any[];

  domElement: HTMLCanvasElement;
  ctx: any;
  myChart: any;

  constructor(
    private Cierre: sCierre,
    private Comunes: Comunes,
    private Ordenes: sOrdenComra
  ) { }

  ngOnInit() {
    this.Cierre.getCierre().subscribe(res => {
      this.allCerados = res;
    })
  }

  genGraph(centrosCosto) {
    this.domElement = <HTMLCanvasElement>document.getElementById('myChart');
    if (this.myChart)
      this.myChart.destroy();
    let opciones = this.Comunes.retOpcionesGrafico('Meses', 'Porcentaje', null, '%')
    // console.log(this.allCerados);
    if (this.domElement) {
      this.ctx = this.domElement.getContext('2d');
      this.myChart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.allCerados.map(el => el.agno),
          datasets: this.retFormatData(this.allCerados, centrosCosto)
        },
        options: opciones
      });
    }
  }

  retFormatData(cerrados, centros) {
    let arrTemp = [];
    centros.forEach(centroCosto => {
      let cerradasCentroCosto = cerrados.map(el => ({ agno: el.agno, ordenes: el.OC.concat(el.OP).filter(el => el.ingresoEgreso == 1 && el.subCentroCosto == centroCosto) }))
      let cerradasCentroCostototal: number[] = cerradasCentroCosto.map(el => this.Ordenes.retMontoNetoSinConfirmar(el.ordenes));
      let totalCentro = cerradasCentroCostototal.reduce((acc, el) => acc + el, 0);
      arrTemp.push({
        label: centroCosto,
        data: cerradasCentroCostototal.map(el => (el * 100 / totalCentro).toFixed(2)),
        borderColor: this.Comunes.genRandomColor(),
        backgroundColor: "#66000000"
      })
    });
    return arrTemp
  }

}
