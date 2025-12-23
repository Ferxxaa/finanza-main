import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { mGastos } from '../../../models/mGastos';
import { operacionalYears, tablaReporteOperacional } from '../../../models/nestReporteOperacional';
import { reporteOperacionalService } from '../../../services/Nest/reporteOperacional.service';
import { sGastos } from '../../../services/sGastos.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';

@Component({
  selector: 'app-tabla-operacional',
  templateUrl: './tabla-operacional.component.html',
  styleUrls: ['./tabla-operacional.component.css'],
  providers: [
    sGastos,
    sOrdenComra,
    reporteOperacionalService
  ]
})
export class TablaOperacionalComponent implements OnInit {

  agnos: number[];
  agno: number;

  tabla: any[];
  tabla2: any[];
  inversiones: any[];
  filtro: any[];

  loading: boolean;

  allOperacional: any[];

  years$: Observable<number[]>
  reporteOperacional$: Observable<tablaReporteOperacional[]>
  reporteOperacionalYears$: Observable<operacionalYears[]>

  constructor(
    private TipoGasto: sGastos,
    private OrdenCompra: sOrdenComra,
    private reporteOperaciconalService: reporteOperacionalService
  ) {
    this.filtro = [];
    this.loading = false;
    this.allOperacional = null;
    this.agno = new Date().getFullYear();
    this.years$ = this.reporteOperaciconalService.getYears();
    this.reporteOperacional$ = this.reporteOperaciconalService.getReportByYear(this.agno);
    this.reporteOperacionalYears$ = this.reporteOperaciconalService.getReportByFiveYear(this.agno)
  }

  ngOnInit() {

    // this.TipoGasto.getGastos().subscribe(res => this.getOC(res.filter(el => el.nombre.includes("OPERACIONAL"))))
  }

  // ngOnChanges(par: SimpleChanges) {
  //   this.TipoGasto.getGastos().subscribe(res => this.getOC(res.filter(el => el.nombre.includes("OPERACIONAL"))))
  // }

  getData() {
    // this.TipoGasto.getGastos().subscribe(res => this.getOC(res.filter(el => el.nombre.includes("OPERACIONAL"))))
    this.reporteOperacional$ = this.reporteOperaciconalService.getReportByYear(this.agno)
    this.reporteOperacionalYears$ = this.reporteOperaciconalService.getReportByFiveYear(this.agno)
  }

  // getOC(tipoGasto: mGastos[]) {
  //   // console.log('Tipoas de Gasto', tipoGasto);
  //   this.allOperacional = tipoGasto;
  //   this.loading = true;
  //   this.OrdenCompra.getCuentaCorriente().subscribe(res => {
  //     this.agnos = res.map(el => new Date(el.fecha).getFullYear()).filter((value, index, categoryArray) => categoryArray.indexOf(value) === index && value >= 2012).sort();

  //     let operacional = res.filter(el => el.estado == 2 && el.subCentro.nombre == "Trazas Operacional" && (el.ingresoEgreso == 1 || el.ingresoEgreso == 3) && new Date(el.fecha).getFullYear() == this.agno)
  //     // operacional = operacional.map()
  //     this.tabla = this.retTabla(operacional, tipoGasto.filter(el => !el.nombre.includes("INVERSIONES")).map(el => el.nombre), 1).sort(this.order)

  //     this.inversiones = this.retTabla(operacional, tipoGasto.filter(el => el.nombre.includes("INVERSIONES")).map(el => el.nombre), 1)

  //     let subTiposTemp = []
  //     tipoGasto.forEach(tipos => {
  //       subTiposTemp.push({ tipo: tipos.nombre, registros: this.retTabla(operacional.filter(el => el.tipoGasto.nombre == tipos.nombre), tipos.subTipoGasto.sort(), 2) })
  //     });
  //     // console.log(subTiposTemp);


  //     // console.log(subTiposTemp.map(this.retOrden).sort(this.order));
  //     this.tabla2 = subTiposTemp.map(this.retOrden).sort(this.order);
  //     this.loading = false;
  //   })
  // }

  // retOrden(el, index, arr) {
  //   if (el.tipo.toUpperCase().includes("FIJO"))
  //     return { ...el, orden: 1 }
  //   else if (el.tipo.toUpperCase().includes("VARIABLE"))
  //     return { ...el, orden: 2 }
  //   else if (el.tipo.toUpperCase().includes("TALLER"))
  //     return { ...el, orden: 3 }
  //   else if (el.tipo.toUpperCase().includes("RETIROS"))
  //     return { ...el, orden: 4 }
  //   else
  //     return { ...el, orden: 5 }
  // }

  // order(a, b) {
  //   if (a.orden > b.orden)
  //     return 1
  //   else if (a.orden < b.orden)
  //     return -1
  //   else
  //     return 0
  // }

  // onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index
  // }

  // retTabla(operacional: any[], gastos: any[], tipo: number) {
  //   let arrTemp = [];
  //   // console.log(operacional);

  //   gastos.forEach(gasto => {
  //     let ocTipo: any[];
  //     if (tipo == 1)
  //       ocTipo = operacional.filter(el => el.tipoGasto.nombre == gasto.trim())
  //     else
  //       ocTipo = operacional.filter(el => el.subTipoGasto.trim() == gasto.trim())
  //     // console.log(gasto, ocTipo);
  //     if (gasto != 'INVERSIONES BANCARIAS') {
  //       if (this.agno)
  //         arrTemp.push(this.FiltroMes(ocTipo, gasto, this.agno))
  //       else
  //         arrTemp.push(this.FiltroMes(ocTipo, gasto))
  //     }

  //   })
  //   // console.log("Con orden",arrTemp.map(this.retOrden));

  //   return arrTemp.map(this.retOrden)
  // }

  // FiltroMes(operacional: any[], tipo: string, agno?: number) {
  //   let year
  //   if (agno)
  //     year = agno
  //   else
  //     year = new Date().getFullYear();
  //   // if (inicio == 12)
  //   let element = { tipo: tipo.replace("OPERACIONAL", "O."), enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 }


  //   for (let mes = 1; mes < 13; mes++) {
  //     let inicio = `${year}-${mes.toString().padStart(2, "0")}-01T00:00:00`
  //     let termino
  //     if (mes == 12)
  //       termino = `${year + 1}-01-01T00:00:00`
  //     else
  //       termino = `${year}-${(mes + 1).toString().padStart(2, "0")}-01T00:00:00`
  //     // console.log(inicio);
  //     // console.log(termino);
  //     let operacionalMes = operacional.filter(el => new Date(el.fecha) >= new Date(inicio) && new Date(el.fecha) < new Date(termino))
  //     // console.log(tipo, agno, mes, operacionalMes);
  //     element[Object.keys(element)[mes]] = operacionalMes.reduce((acc, el) => acc + el.costo, 0);
  //   }
  //   // console.log(element);
  //   return element
  // }

}
