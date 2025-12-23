import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sCierre } from '../../../../services/sCierre.service';
import { sOrdenComra } from '../../../../services/sOrdenComra.service';
import { Comunes } from '../../../../Share/Comunes';

declare var Chart;

@Component({
  selector: 'app-pop-up-ventas-compras-centro-costo',
  templateUrl: './pop-up-ventas-compras-centro-costo.component.html',
  styleUrls: ['./pop-up-ventas-compras-centro-costo.component.css'],
  providers: [
    Comunes
  ]
})
export class PopUpVentasComprasCentroCostoComponent implements OnInit {

  @Input() nombreCentro: string;
  @Output() cerrar = new EventEmitter

  // Grafico
  domElement: HTMLCanvasElement;
  ctx: any;
  myChart: any;

  domElementCompras: HTMLCanvasElement;
  ctxCompras: any;
  myChartCompras: any;

  //ngIf
  Ventas: boolean;
  Compras: boolean;

  constructor(
    private Cierre: sCierre,
    private Comunes: Comunes,
    private OrdenCompra: sOrdenComra
  ) {
    this.Ventas = true;
    this.Compras = true;
  }

  ngOnInit() {
    this.getCierreCentroCosto(this.nombreCentro);
  }

  getCierreCentroCosto(nombreCentroCosto: string) {
    // let self = this;
    this.Cierre.getCierre().subscribe(res => {
      let cierreCentroCosto = res.map(el => {
        let obj = { agno: el.agno, ventas: [], compras: [] }
        let ordenesCentroCostoAgno = el.OC.concat(el.OP).filter(el => el.subCentroCosto == nombreCentroCosto);
        obj.ventas = ordenesCentroCostoAgno.filter(el => el.ingresoEgreso == 2);
        obj.compras = ordenesCentroCostoAgno.filter(el => el.ingresoEgreso == 1);
        return obj
      });
      // let consolidadoCentroCosto = cierreCentroCosto.reduce()
      this.displayGraph(cierreCentroCosto);
      this.displayGraphCompras(cierreCentroCosto);
    });
  }


  displayGraph(dataGraph) {
    this.domElement = <HTMLCanvasElement>document.getElementById('myChartVentas');
    if (this.myChart)
      this.myChart.destroy();
    let opciones = this.Comunes.retOpcionesGrafico('Meses', 'Porcentaje', null, '%')
    // console.log(this.allCerados);
    if (this.domElement) {
      this.ctx = this.domElement.getContext('2d');
      this.myChart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.Comunes.meses(),
          datasets: this.retFormatData(dataGraph)
        },
        options: opciones
      });
      this.Ventas = false;
    }
  }

  displayGraphCompras(dataGraph) {
    this.domElementCompras = <HTMLCanvasElement>document.getElementById('myChartCompras');
    if (this.myChartCompras)
      this.myChartCompras.destroy();
    let opciones = this.Comunes.retOpcionesGrafico('Meses', 'Porcentaje', null, '%')
    // console.log(this.allCerados);
    if (this.domElementCompras) {
      this.ctxCompras = this.domElementCompras.getContext('2d');
      this.myChartCompras = new Chart(this.ctxCompras, {
        type: 'line',
        data: {
          labels: this.Comunes.meses(),
          datasets: this.retFormatDataCompras(dataGraph)
        },
        options: opciones
      });
      this.Compras = false;
    }
  }

  retFormatData(data) {
    // let diferencial = 40;
    let arr = [];
    // console.log(data);

    let totalCentroCostoVenta = data.reduce((acc, el) => acc + this.OrdenCompra.retMontoNetoSinConfirmar(el.ventas), 0);
    data.forEach(cierre => {
      if (cierre.ventas.length || cierre.compras.length) {
        let ventasColor = this.Comunes.genRandomColor();
        // let comprasColor = ventasColor.substr(5, ventasColor.length - 11).split(", ").map(el => parseInt(el) + diferencial <= 256 ? parseInt(el) + diferencial : parseInt(el) - diferencial);
        let obj =
        {
          label: 'Ventas ' + cierre.agno,
          data: this.getDataPeriodo(cierre.ventas, totalCentroCostoVenta),
          borderColor: ventasColor,
          backgroundColor: "#66000000"
        }
        arr.push(obj);
      }
    });
    return arr
  }

  retFormatDataCompras(data) {
    // let diferencial = 40;
    let arr = [];
    // console.log(data);

    let totalCentroCostoCompra = data.reduce((acc, el) => acc + this.OrdenCompra.retMontoNetoSinConfirmar(el.compras), 0);
    data.forEach(cierre => {
      if (cierre.ventas.length || cierre.compras.length) {
        let comprasColor = this.Comunes.genRandomColor();
        let obj = {
          label: 'Compras ' + cierre.agno,
          data: this.getDataPeriodo(cierre.compras, totalCentroCostoCompra),
          borderColor: comprasColor,
          backgroundColor: "#66000000"
        }
        arr.push(obj);
      }
    });
    return arr
  }

  getDataPeriodo(data, totalCentroCosto: number) {
    let arr = []
    for (let mes = 0; mes < 12; mes++) {
      let registrosMes = data.map(el => el.estadosPagos.filter(el => new Date(el.fecha).getMonth() == mes))
      let totalmes = registrosMes.reduce((acc, el) => acc + this.OrdenCompra.retMontoNetoEP(el), 0);
      // console.log(mes, totalmes);
      let porcentaje = (totalmes * 100 / totalCentroCosto).toFixed(2);
      arr.push(porcentaje);
    }
    return arr;
  }

  salir() {
    this.cerrar.emit();
  }

  noCerrar(e) {
    e.stopPropagation();
  }

}
