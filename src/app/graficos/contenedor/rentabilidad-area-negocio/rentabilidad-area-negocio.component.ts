import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaNegocio } from '../../../models/nestAreaNegocio';
import { ReportRentabilidadAreaNegocioByYear } from '../../../models/nestResultadoAreaNegocio';
import { areaNegocioService } from '../../../services/Nest/areaNegocioService.service';
import { ResultadoAreaNegocioService } from '../../../services/Nest/reporteResultadoAreaNegocio.service';
import { sCentroCosto } from '../../../services/sCentroCosto.service';
import { sCierre } from '../../../services/sCierre.service';
import { sGastos } from '../../../services/sGastos.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';

@Component({
  selector: 'app-rentabilidad-area-negocio',
  templateUrl: './rentabilidad-area-negocio.component.html',
  styleUrls: ['./rentabilidad-area-negocio.component.css'],
  providers: [
    sCentroCosto,
    sCierre,
    sOrdenComra,
    sGastos,
    areaNegocioService,
    ResultadoAreaNegocioService
  ]
})
export class RentabilidadAreaNegocioComponent implements OnInit {

  obsCentroCosto$: Observable<any>;
  obsCierre$: Observable<any>;
  ventas: any;
  areaNegocio: any;
  loading: boolean;
  grafico: boolean;

  areaNegocioList: AreaNegocio[];
  rentabilidad$: Observable<ReportRentabilidadAreaNegocioByYear[]>;

  constructor(
    private CentroCosto: sCentroCosto,
    private Cierre: sCierre,
    private OrdenesCompra: sOrdenComra,
    private TipoGasto: sGastos,
    private areaNegocioService: areaNegocioService,
    private resultadoAreaNegocioService: ResultadoAreaNegocioService
  ) {
    this.obsCentroCosto$ = this.CentroCosto.getCentroCosto();
    this.obsCierre$ = this.Cierre.getCierre();
    this.areaNegocio = 0;
    this.loading = false;
    this.grafico = false;
    this.rentabilidad$ = null;
  }

  ngOnInit() {
    // this.ventas = [
    //   { agno: 2011, rentabilidad: 3.61, ingresos: 566341437, utilidad: null, gastoOpe: 21224400, utilidadFinal: 43323743 },
    //   { agno: 2012, rentabilidad: 26.96, ingresos: 765546223, utilidad: null, gastoOpe: 37654513, utilidadFinal: 206410162 },
    //   { agno: 2013, rentabilidad: 9.22, ingresos: 1131494237, utilidad: null, gastoOpe: 42328994, utilidadFinal: 104301151 },
    // ]
    // this.getData()
    // this.obsCentroCosto$.subscribe(res => {
    //   this.areaNegocio = res[0]._id
    //   this.getData();
    // });
    this.areaNegocioService.getAreasNegocio().subscribe(res => {
      this.areaNegocioList = res;
      this.areaNegocio = res[0].idAreaNegocio;
      this.getData();
    })
  }

  getData() {

    this.rentabilidad$ = this.resultadoAreaNegocioService.getRentabilidadByAreaNegocio(this.areaNegocio);
    // this.rentabilidad$.subscribe(res => console.log(res));
    // if (this.areaNegocio != 0) {
    //   this.loading = true;
    //   this.obsCentroCosto$.subscribe(centroCosto => {
    //     this.obsCierre$.subscribe(res => {
    //       this.OrdenesCompra.getOrdenComprabyCentroCosto("Trazas Operacional").subscribe(operacional => {
    //         this.TipoGasto.getGastos().subscribe(gastos => {
    //           this.OrdenesCompra.getOrdenComprabyEstado(6).subscribe(ingresos => {

    //             let gastosAreaNegocio = gastos.filter(el => el.areaNegocio && el.areaNegocio._id == this.areaNegocio);
    //             let subTipos = gastosAreaNegocio.reduce((acc, el) => acc.concat(el.subTipoGasto), []);
    //             let operacionalArea = operacional.filter(el => el.ingresoEgreso == 1 && subTipos.includes(el.subTipoGasto) && el.tipoGasto.nombre.trim() == this.retOperacionalAreaNegocio())

    //             this.ventas = res.map(agno => {
    //               // console.log("*************************"+agno.agno+"*************************");
    //               let allOrdenes = agno.OC.concat(agno.OP)
    //               let ingresosPorAgno = ingresos.map(el => ({ ...el, estadosPagos: el.estadosPagos.filter(el => new Date(el.fecha).getFullYear() == agno.agno) })).filter(el => el.estadosPagos.length)
    //               let ingresoTotalNeto = this.OrdenesCompra.retMontoNeto(ingresosPorAgno.filter(el => this.retAreaNegocio(centroCosto, el.subCentroCosto)));
    //               let egresoTotalNeto = this.OrdenesCompra.retMontoNeto(allOrdenes.filter(el => el.ingresoEgreso == 1 && this.retAreaNegocio(centroCosto, el.subCentroCosto)))
    //               // console.log("Centros de costo ",centroCosto);
    //               // console.log("Egreso:",egresoTotalNeto);

    //               let egresoTotalOperacional = this.OrdenesCompra.retMontoNeto(this.getOperacionalAgnos(operacionalArea, agno.agno))

    //               let utilidad = ingresoTotalNeto - egresoTotalNeto;
    //               let rentabilidad = (utilidad - egresoTotalOperacional) * 100 / ingresoTotalNeto
    //               return {
    //                 agno: agno.agno,
    //                 rentabilidad: ingresoTotalNeto ? rentabilidad : 0,
    //                 ingresos: ingresoTotalNeto,
    //                 utilidad: utilidad,
    //                 gastoOpe: egresoTotalOperacional,
    //                 utilidadFinal: ingresoTotalNeto - egresoTotalNeto - egresoTotalOperacional
    //               }
    //             })
    //             // console.log(this.ventas);
    //             this.replaceVal();
    //             this.loading = false;
    //             this.grafico = true;
    //           })
    //         })
    //       })
    //     })
    //   })
    // }
  }

  retOperacionalAreaNegocio() {
    if (this.areaNegocio == "5ea8afbccfb9095e5829a2d3") {
      return "OPERACIONAL CONSTRUCCIÓN"
    } else {
      return "OPERACIONAL ARQUITECTURA"
    }
  }

  getOperacionalAgnos(arr: any[], agno): any[] {
    let arrtemp = arr.filter(el => el.estadosPagos.map(el => new Date(el.fecha).getFullYear()).includes(agno))
    return arrtemp.map(el => ({ ...el, estadosPagos: el.estadosPagos.filter(el => new Date(el.fecha).getFullYear() == agno) }))
  }

  retRentabilidad(ordenes: any[], centroCosto: any, totalIngresos: number, totalEgresos: number): number {
    let subCentros: string[] = ordenes.map(el => el.subCentroCosto).filter(this.onlyUnique)
    // let contratos = this.CentroCosto.retTotalContratos(centroCosto, subCentros)
    let rentabilidad = totalIngresos - totalEgresos

    return rentabilidad * 100 / totalIngresos
  }

  retAreaNegocio(centrosCosto: any[], subCentroCosto: string): boolean {
    let areaNegocio = centrosCosto.find(el => el.subCentroCosto.map(el => el.nombre).includes(subCentroCosto))
    return areaNegocio ? areaNegocio._id == this.areaNegocio : false
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  replaceVal() {
    // console.log(this.ventas);
    // console.log(this.areaNegocio);
    let valTemp;
    //Construccion
    if (this.areaNegocio == "5ea8afbccfb9095e5829a2d3") {
      valTemp = [
        {
          agno: 2016,
          ingresos: 1164660677,
          utilidad: 316695052,
          gastoOpe: 130697158,
          utilidadFinal: 316695052 - 130697158,
          rentabilidad: (316695052 - 130697158) * 100 / 1164660677
        },
        {
          agno: 2017,
          ingresos: 906511496,
          utilidad: 339093035,
          gastoOpe: 71231943,
          utilidadFinal: 267861092,
          rentabilidad: 29.5
        },
        {
          agno: 2018,
          ingresos: 1019671900,
          utilidad: 478892084,
          gastoOpe: 68565229,
          utilidadFinal: 478892084 - 68565229,
          rentabilidad: (478892084 - 68565229) * 100 / 1019671900
        }
      ]
    } else {
      //Arquitectura
      valTemp = [
        {
          agno: 2016,
          ingresos: 156220516,
          utilidad: 113715794,
          gastoOpe: 52101640,
          utilidadFinal: 113715794 - 52101640,
          rentabilidad: (113715794 - 52101640) * 100 / 156220516
        },
        {
          agno: 2017,
          ingresos: 52366200,
          utilidad: 31468413,
          gastoOpe: 63595878,
          utilidadFinal: 31468413 - 63595878,
          rentabilidad: (31468413 - 63595878) * 100 / 52366200
        },
        {
          agno: 2018,
          ingresos: 34587352,
          utilidad: 18045240,
          gastoOpe: 45125059,
          utilidadFinal: 18045240 - 45125059,
          rentabilidad: (18045240 - 45125059) * 100 / 34587352
        }
      ]
    }
    this.ventas = this.ventas.filter(el => !valTemp.map(val => val.agno).includes(el.agno)).concat(valTemp).sort((a, b) => a.agno > b.agno ? -1 : 1)
    // this.ventas =[]
  }

}
