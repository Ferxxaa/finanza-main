import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { operacionalYears } from '../../../models/nestReporteOperacional';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { Comunes } from '../../../Share/Comunes';

declare var Chart;

@Component({
  selector: 'app-grafico-operacional-agnos',
  templateUrl: './grafico-operacional-agnos.component.html',
  styleUrls: ['./grafico-operacional-agnos.component.css'],
  providers: [
    Comunes
  ]
})
export class GraficoOperacionalAgnosComponent implements OnInit {

  @Input() tiposGastos: operacionalYears[];

  agnos: number[];

  domElement: HTMLCanvasElement;
  ctx: any;
  myChart: any;

  constructor(
    private OrdenCompra: sOrdenComra,
    private Comunes: Comunes
  ) { }

  ngOnInit() {
    // this.agnos = this.getAgnos(new Date().getFullYear());
    // console.log("Agnos a buscar", this.agnos);
    // console.log(this.tiposGastos)

    // this.getOperacional(this.tiposGastos.map(el => el.nombre.trim()));
    this.genGraph(this.tiposGastos)
  }

  // getAgnos(agnoOrigen: number) {
  //   let arr = [];
  //   for (let i = 0; i < 5; i++) {
  //     const element = new Date('01-01-' + agnoOrigen + '');
  //     arr.push(element.getFullYear() - i)
  //   }
  //   return arr
  // }

  // getOperacional(tiposGasto: string[]) {
  //   // console.log(tiposGasto);
  //   this.OrdenCompra.getCuentaCorriente().subscribe(res => {

  //     let OrdenesAgnos = res.filter(el => this.agnos.includes(new Date(el.fecha).getFullYear()));
  //     // console.log('Filtro años:', OrdenesAgnos);
  //     let operacionalesRegistrados = OrdenesAgnos.filter(el => {
  //       if (el.tipoGasto && el.tipoGasto.nombre)
  //         return tiposGasto.includes(el.tipoGasto.nombre.trim())
  //       else
  //         return false
  //     });
  //     // console.log('Filtro TipoGasto:', operacionalesRegistrados);

  //     let operacional = operacionalesRegistrados.filter(el => el.estado == 2 && el.subCentro.nombre == "Trazas Operacional" && (el.ingresoEgreso == 1 || el.ingresoEgreso == 3) && el.subTipoGasto != '0')
  //     // console.log("Operacionales:", operacional);
  //     let data = this.gendata(operacional.filter(el => el.subTipoGasto != 'INVERSIONES BANCARIAS'));
  //     // console.log(data);
  //     this.genGraph(data);
  //   });
  // }

  // gendata(operacionales: any[]): any[] {
  //   let arr = []
  //   this.agnos.forEach(agno => {
  //     let operacionalesAgno = operacionales.filter(el => new Date(el.fecha).getFullYear() == agno);
  //     // console.log('Registros año ' + agno, operacionalesAgno);

  //     arr.push(this.retDataMes(operacionalesAgno))
  //   })
  //   return arr
  // }

  // retDataMes(operacionalAgno: any[]): any {
  //   let obj = { agno: new Date(operacionalAgno[0].fecha).getFullYear() };
  //   let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  //   // console.log("Año:", , operacionalAgno);
  //   for (let i = 0; i < meses.length; i++) {
  //     let operacionalMes = operacionalAgno.filter(el => new Date(el.fecha).getMonth() == i)
  //     // console.log(meses[i], operacionalMes);
  //     let mes = meses[i]
  //     let totalOperacional = operacionalMes.reduce((acc, el) => acc + el.costo, 0);
  //     obj[mes] = (totalOperacional / environment.factor).toFixed(3);
  //   }
  //   // console.log(obj);
  //   return obj
  // }

  genGraph(data: operacionalYears[]) {
    this.domElement = <HTMLCanvasElement>document.getElementById('graphOperacionalAgnos');
    // console.log(this.domElement);
    // console.log(this.data);
    if (this.myChart)
      this.myChart.destroy();
    if (this.domElement) {
      this.ctx = this.domElement.getContext('2d');
      this.myChart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
          datasets: this.retFormatData(data),
        },
        options: this.Comunes.retOpcionesGrafico('Meses', 'Millones', 'MM$ ')
      });
    }
  }

  retFormatData(data: operacionalYears[]) {
    let arrTemp = [];
    const colorStack = [
      'rgba(0, 99, 132, 0.6)',
      'rgba(255, 0, 0, 0.6)',
      'rgba(0, 255, 0, 0.6)',
      'rgba(0, 0, 255, 0.6)',
      'rgba(255, 153, 0, 0.6)'
    ];
    
    // console.log(data);
    if (data && data.length) {
      data.forEach((el, i) => {
        let obj = { label: null, data: [], borderColor: 'rgba(0, 99, 132, 0.6)', backgroundColor: 'rgba(0, 99, 132, 0)' }
        obj.label = el.year;
        obj.data = this.retArrData(el);
        // obj.borderColor = this.genRandomColor()
        obj.borderColor = colorStack[i % colorStack.length]
        if (obj.data.reduce((acc, el) => acc + el, 0))
          arrTemp.push(obj)
      });
    }
    return arrTemp
  }

  retArrData(el: operacionalYears): number[] {
    let arr = [];
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    meses.forEach(meses => {
      arr.push((el[meses.toLowerCase()] / environment.factor).toFixed(3))
    })
    return arr;
  }

  genRandomColor(): string {
    let r = Math.floor(Math.random() * (255 - 0)) + 0;
    let g = Math.floor(Math.random() * (255 - 0)) + 0;
    let b = Math.floor(Math.random() * (255 - 0)) + 0;
    return `rgba(${r}, ${g}, ${b}, 0.6)`
  }

}
