import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AreaNegocio } from '../../../../models/nestAreaNegocio';
import { ReportResultadoAreaNegocioByYear } from '../../../../models/nestResultadoAreaNegocio';
import { areaNegocioService } from '../../../../services/Nest/areaNegocioService.service';
import { ResultadoAreaNegocioService } from '../../../../services/Nest/reporteResultadoAreaNegocio.service';
import { sCentroCosto } from '../../../../services/sCentroCosto.service';
import { sCierre } from '../../../../services/sCierre.service';
import { sOrdenComra } from '../../../../services/sOrdenComra.service';

interface reporteVentas {
  agno: string,
  centrosCosto: VentasAreaNegocios[]
}

interface VentasAreaNegocios {
  periodo: string,
  meses: number,
  nombreProy: Proyecto,
  montoNeto: number,
  iva: number,
  montoGastado: number,
  saldo: number,
  ivaCredito: totalPorcentaje,
  utilidad: totalPorcentaje,
  utilidadMensual: totalPorcentaje
}

interface totalPorcentaje {
  monto: number,
  porcentaje: number
}

interface Proyecto {
  nombre: string,
  fondo: string,
  letras: string,
  montoProgramado: number
}

declare var moment: any;

@Component({
  selector: 'app-contenedor-ventas-area-negocio',
  templateUrl: './contenedor-ventas-area-negocio.component.html',
  styleUrls: ['./contenedor-ventas-area-negocio.component.css'],
  providers: [
    sCentroCosto,
    sCierre,
    sOrdenComra,
    areaNegocioService,
    ResultadoAreaNegocioService
  ]
})
export class ContenedorVentasAreaNegocioComponent implements OnInit {

  areaNegocio: number;
  obsCentroCosto$: Observable<any>;
  obsAreaNegocio$: Observable<any>;
  ventas: reporteVentas[];
  ventasAreaNegocio: VentasAreaNegocios[];
  loading: boolean;
  areaNegocioList: AreaNegocio[];
  resultadoAreaNegocio$: Observable<ReportResultadoAreaNegocioByYear[]>;

  constructor(
    private CentroCosto: sCentroCosto,
    private Cierre: sCierre,
    private OrdenCompra: sOrdenComra,
    private areaNegocioService: areaNegocioService,
    private resultadoAreaNegocioService: ResultadoAreaNegocioService
  ) {
    // this.limpiar()
    // this.obsAreaNegocio$ = this.Cierre.getCierre();
    // this.obsCentroCosto$ = this.CentroCosto.getCentroCosto();
    // this.areaNegocio = 0;
    // this.loading = false;
  }

  limpiar() {
    // this.ventas = [];
    // this.ventasAreaNegocio = [
    //   {
    //     periodo: "FEB 2020 - ABRIL 2020",
    //     meses: 4,
    //     nombreProy: { nombre: "REMODELACION P14", montoProgramado: 23421, letras: "#ffffff", fondo: "rgb(35,20,236)" },
    //     montoNeto: 0,
    //     iva: 0,
    //     montoGastado: 0,
    //     saldo: 0,
    //     ivaCredito: { monto: 0, porcentaje: 0 },
    //     utilidad: { monto: 0, porcentaje: 0 },
    //     utilidadMensual: { monto: 0, porcentaje: 0 }
    //   },
    //   {
    //     periodo: "DIC 2019 - MARZO 2020",
    //     meses: 3,
    //     nombreProy: { nombre: "P 14 DEMOLICION", montoProgramado: 23421, letras: "#ffffff", fondo: "#000000" },
    //     montoNeto: 119140536.574616,
    //     iva: 22636702,
    //     montoGastado: 141777239,
    //     saldo: 0,
    //     ivaCredito: { monto: 94628403, porcentaje: 79.4 },
    //     utilidad: { monto: 94628403, porcentaje: 79.4 },
    //     utilidadMensual: { monto: 0, porcentaje: 0 }
    //   },
    // ]
  }

  ngOnInit() {
    // this.Cierre.corrigeCierre(new Date().getFullYear())
    // this.obsCentroCosto$.subscribe(res => {
    //   this.areaNegocio = res[0]._id
    //   this.getData();
    // });
    this.areaNegocioService.getAreasNegocio().subscribe(res => {
      this.areaNegocioList = res;
      this.areaNegocio = res[0].idAreaNegocio;
      this.resultadoAreaNegocio$ = this.resultadoAreaNegocioService.getResultadoByAreaNegocio(this.areaNegocio);
    })
  }

  getData() {
    this.resultadoAreaNegocio$ = this.resultadoAreaNegocioService.getResultadoByAreaNegocio(this.areaNegocio);
  }

  // getData() {
  //   this.limpiar();
  //   if (this.areaNegocio == "0")
  //     return null
  //   // console.log(this.areaNegocio);
  //   this.loading = true;
  //   //Arquitectura
  //   if (this.areaNegocio == "5ea8afc6cfb9095e5829a2d4") {
  //     this.replaceVal();
  //     this.ventas = this.ventas.sort((a, b) => a.agno > b.agno ? -1 : 1);
  //     // this.loading = false;
  //     // return null;
  //   }
  //   this.obsCentroCosto$.subscribe(centroCosto => {
  //     let subCentrosArea = centroCosto.find(el => el._id == this.areaNegocio).subCentroCosto.map(el => el.nombre);
  //     this.obsAreaNegocio$.subscribe(res => {
  //       res.forEach(element => {
  //         let ordenes = element.OC.concat(element.OP).filter(el => subCentrosArea.includes(el.subCentroCosto))
  //         // console.log(ordenes);

  //         let centrosCosto = ordenes.map(el => el.subCentroCosto).filter((v, i, a) => a.indexOf(v) === i);
  //         if (centrosCosto.length > 0) {
  //           this.ventas.push({
  //             agno: element.agno,
  //             centrosCosto: []
  //           });
  //           this.retVentasAreaCentroCosto(ordenes, centrosCosto, element.agno)
  //         }
  //       });
  //       this.ventas = this.ventas.sort((a, b) => a.agno > b.agno ? -1 : 1);
  //       this.loading = false;
  //     });
  //   });
  // }

  // formatoPeriodo(fecha: string): string {
  //   return (new Date(fecha).getMonth() + 1).toString().padStart(2, '0') + '/' + new Date(fecha).getFullYear()
  // }

  // retVentasAreaCentroCosto(ordenes: any[], centroCosto: string[], agno: string) {
  //   centroCosto.forEach(centroCosto => {
  //     let resumenCentroCosto: VentasAreaNegocios;
  //     let ordenesCentroCosto = ordenes.filter(el => el.subCentroCosto == centroCosto)
  //     let fechaMenor = this.retFechaMenor(ordenesCentroCosto);
  //     let fechaMayor = this.retFechaMayor(ordenesCentroCosto);
  //     let formatoPeriodo = this.formatoPeriodo(fechaMenor) + ' - ' + this.formatoPeriodo(fechaMayor);
  //     let subcentro = ordenesCentroCosto[ordenesCentroCosto.length - 1].centroCosto.subCentroCosto.find(el => el.nombre == centroCosto)

  //     this.OrdenCompra.getOrdenComprabyEstado(6).subscribe(ingresos => {
  //       let ingreso = ingresos.filter(el => el.subCentroCosto == centroCosto);

  //       this.obsCentroCosto$.subscribe(res => {
  //         // console.log(res);

  //         let mesesObra = this.retPeriodoMeses(fechaMenor, fechaMayor) ? this.retPeriodoMeses(fechaMenor, fechaMayor) : 1;
  //         // let totalContrato = this.CentroCosto.retTotalContrato(res, centroCosto);
  //         let totalContrato = ingreso.reduce((acc, el) => acc + this.OrdenCompra.retMontoNetoEP(el.estadosPagos.filter(fecha => new Date(fecha.fecha).getFullYear().toString() == agno)), 0)
  //         let totalContratoNeto = totalContrato / (environment.iva + 1)
  //         let ivaContratos = totalContratoNeto * environment.iva
  //         let gastado = this.OrdenCompra.retMontoNeto(ordenesCentroCosto.filter(el => el.ingresoEgreso == 1))
  //         let ivaGastado = this.OrdenCompra.retTotalIva(ordenesCentroCosto.filter(el => el.ingresoEgreso == 1))
  //         // let vendido = this.OrdenCompra.retMontoNeto(ordenesCentroCosto.filter(el => el.ingresoEgreso == 2))
  //         // let IVAVendido = this.OrdenCompra.retTotalIva(ordenesCentroCosto.filter(el => el.ingresoEgreso == 2))
  //         let utilidad = totalContrato - gastado
  //         let utilidadMensual = utilidad / mesesObra
  //         resumenCentroCosto = {
  //           periodo: formatoPeriodo,
  //           meses: mesesObra,
  //           nombreProy: subcentro,
  //           montoNeto: totalContratoNeto,
  //           // iva: totalContrato * .19,
  //           iva: ivaContratos,
  //           montoGastado: gastado,
  //           saldo: totalContrato - gastado,
  //           ivaCredito: { monto: ivaGastado, porcentaje: ivaContratos && ivaGastado ? ivaGastado * 100 / ivaContratos : 0 },
  //           utilidad: { monto: utilidad, porcentaje: totalContrato && utilidad ? utilidad * 100 / totalContrato : 0 },
  //           utilidadMensual: { monto: utilidadMensual, porcentaje: totalContrato && utilidadMensual ? utilidadMensual * 100 / totalContrato : 0 }
  //         };
  //         // console.log(resumenCentroCosto);
  //         this.ventas.find(el => el.agno == agno).centrosCosto.push(resumenCentroCosto);
  //         this.reemplazaDatosConstruccion()
  //       })
  //     });
  //     // console.log(this.OrdenCompra.retTotalIva(ordenesCentroCosto));
  //     // resumenCentroCosto = {
  //     //   periodo: formatoPeriodo,
  //     //   meses: this.retPeriodoMeses(fechaMenor, fechaMayor),
  //     //   nombreProy: subcentro,
  //     //   montoGastado: this.OrdenCompra.retMontoNeto(ordenesCentroCosto),
  //     //   iva: this.OrdenCompra.retTotalIva(ordenesCentroCosto),
  //     // }
  //   })
  // }

  // retPeriodoMeses(fechamenor: string, fechamayor: string) {
  //   return moment(fechamayor).diff(moment(fechamenor), 'month') + 1
  // }

  // retFechaMenor(ordenes) {
  //   // console.log(ordenes.slice(334,400));    
  //   return ordenes.reduce((acc, el) => {
  //     let fechamenor = this.retFechaMenorEP(el.estadosPagos)
  //     if (!fechamenor) return acc
  //     return new Date(acc) < new Date(fechamenor) ? acc : fechamenor
  //   }, this.retFechaMenorEP(ordenes[0].estadosPagos))
  // }

  // retFechaMenorEP(estadoPago): string {
  //   if (!estadoPago.length) {
  //     return '2070-12-31T00:00:00'
  //   }
  //   return estadoPago.reduce((acc, el) => {
  //     return new Date(acc) < new Date(el.fecha) ? acc : el.fecha
  //   }, estadoPago[0].fecha)
  // }

  // retFechaMayor(ordenes) {
  //   // console.log(ordenes.slice(334,400));    
  //   return ordenes.reduce((acc, el) => {
  //     let fechamenor = this.retFechaMayorEP(el.estadosPagos)
  //     if (!fechamenor) return acc
  //     return new Date(acc) > new Date(fechamenor) ? acc : fechamenor
  //   }, this.retFechaMayorEP(ordenes[0].estadosPagos))
  // }

  // retFechaMayorEP(estadoPago): string {
  //   if (!estadoPago.length) {
  //     return '1900-12-31T00:00:00'
  //   }
  //   return estadoPago.reduce((acc, el) => {
  //     return new Date(acc) > new Date(el.fecha) ? acc : el.fecha
  //   }, estadoPago[0].fecha)
  // }

  reemplazaDatosConstruccion() {
    if (this.areaNegocio) {
      this.ventas = this.ventas.filter(el => parseInt(el.agno) > 2018)
      this.ventas = this.ventas.concat([
        {
          agno: "2018",
          centrosCosto: [
            {
              periodo: "02/2018 - 03/2018",
              meses: 2,
              saldo: 0,
              nombreProy: { nombre: "Cowork Smartcity, Enel", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 30748582,
              iva: 5842231,
              montoGastado: 16089899.95,
              ivaCredito: { monto: -476553, porcentaje: 8.16 },
              utilidad: { monto: 20500913, porcentaje: 66.7 },
              utilidadMensual: { monto: 10250456, porcentaje: 33.3 }
            },
            {
              periodo: "01/2018 - 03/2018",
              meses: 3,
              saldo: 0,
              nombreProy: { nombre: "Remodelación Habitaciones, Hotel Atton", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 172405425,
              iva: 32757031,
              montoGastado: 132150682,
              ivaCredito: { monto: -8114823, porcentaje: 24.77 },
              utilidad: { monto: 73011773, porcentaje: 42.35 },
              utilidadMensual: { monto: 24337258, porcentaje: 14.1 }
            },
            {
              periodo: "11/2017 - 05/2018",
              meses: 7,
              saldo: 0,
              nombreProy: { nombre: "Remodelación Baños, Hotel Atton", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 91973641,
              iva: 17474992,
              montoGastado: 82705289,
              ivaCredito: { monto: -5108932, porcentaje: 29.24 },
              utilidad: { monto: 26743343, porcentaje: 29.08 },
              utilidadMensual: { monto: 3820478, porcentaje: 4.2 }
            },
            {
              periodo: "12/2017 - 04/2018",
              meses: 5,
              saldo: 0,
              nombreProy: { nombre: "Remodelación Edificio Imprenta, Cepal", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 145127807,
              iva: 27574283,
              montoGastado: 156738746.51,
              ivaCredito: { monto: -16937318, porcentaje: 61.42 },
              utilidad: { monto: 15963343.48, porcentaje: 11 },
              utilidadMensual: { monto: 3192669, porcentaje: 2.2 }
            },
            {
              periodo: "08/2018 - 12/2018",
              meses: 4,
              saldo: 0,
              nombreProy: { nombre: "Tai Ping, Alimentos Formosa", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 771823528,
              iva: 146646470,
              montoGastado: 325797286,
              ivaCredito: { monto: 0, porcentaje: 0 },
              utilidad: { monto: 592672712, porcentaje: 64.52 },
              utilidadMensual: { monto: 148168178, porcentaje: 16.13 }
            }
          ]
        },
        {
          agno: "2017",
          centrosCosto: [
            {
              periodo: "10/2017 - 01/2018",
              meses: 4,
              saldo: 0,
              nombreProy: { nombre: "Planta de Tratamiento, Cepal", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 94862715,
              iva: 18023916,
              montoGastado: 77883741,
              ivaCredito: { monto: -7851027, porcentaje: 43.56 },
              utilidad: { monto: 24830001, porcentaje: 26.17 },
              utilidadMensual: { monto: 6207500, porcentaje: 6.5 }
            },
            {
              periodo: "08/2017 - 02/2018",
              meses: 7,
              saldo: 0,
              nombreProy: { nombre: "Remodelación Oficina Serrano, Enel", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 355383048,
              iva: 67522779,
              montoGastado: 295243523,
              ivaCredito: { monto: -34071378, porcentaje: 50.46 },
              utilidad: { monto: 94210903, porcentaje: 26.51 },
              utilidadMensual: { monto: 13458700, porcentaje: 3.8 }
            },
            {
              periodo: "01/2017 - 05/2018 ",
              meses: 17,
              saldo: 0,
              nombreProy: { nombre: "Obra Cambio Vertical Sanitaria II, Enel", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 416278745,
              iva: 79092962,
              montoGastado: 292723340.85,
              ivaCredito: { monto: -16903496, porcentaje: 21.37 },
              utilidad: { monto: 202648366.15, porcentaje: 48.68 },
              utilidadMensual: { monto: 11920492, porcentaje: 2.9 }
            },
            {
              periodo: "02/2017 - 02/2017",
              meses: 1,
              saldo: 0,
              nombreProy: { nombre: "Fundación Huinay, Enel", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 39986988,
              iva: 7597528,
              montoGastado: 25368774,
              ivaCredito: { monto: -2785552, porcentaje: 36.66 },
              utilidad: { monto: 17403766, porcentaje: 43.52 },
              utilidadMensual: { monto: 17403766, porcentaje: 43.5 }
            }
          ]
        },
        {
          agno: "2016",
          centrosCosto: [
            {
              periodo: "02/2016 - 10/2016",
              meses: 9,
              saldo: 0,
              nombreProy: { nombre: "Remodelación COV de Bocamina, Enel", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 497248895,
              iva: 94477290.05,
              montoGastado: 452451146.95,
              ivaCredito: { monto: -41920923, porcentaje: 44.37 },
              utilidad: { monto: 139275038.1, porcentaje: 28.01 },
              utilidadMensual: { monto: 2730883, porcentaje: 0.5 }
            },
            {
              periodo: "02/2016 - 12/2016",
              meses: 7,
              saldo: 0,
              nombreProy: { nombre: "Obras de Containers Bocamina, Enel", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 357769608,
              iva: 67976225.52,
              montoGastado: 319475454.77,
              ivaCredito: { monto: -21298609, porcentaje: 31.33 },
              utilidad: { monto: 106270378.75, porcentaje: 29.7 },
              utilidadMensual: { monto: 2679085, porcentaje: 0.7 }
            },
            {
              periodo: "10/2015- 04/2016",
              meses: 7,
              saldo: 0,
              nombreProy: { nombre: "Remodelación Campamento Radales, Enel", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
              montoNeto: 309642174,
              iva: 58832013.06,
              montoGastado: 297324552.01,
              ivaCredito: { monto: -20062688.22, porcentaje: 34.10 },
              utilidad: { monto: 71149635.05, porcentaje: 22.98 },
              utilidadMensual: { monto: 10164234, porcentaje: 3.3 }
            }
          ]
        },
      ])
    }
  }

  //Arquitectura
  replaceVal() {
    // console.log(this.areaNegocio);
    this.ventas = [
      {
        agno: "2016",
        centrosCosto: [
          {
            periodo: "01/2016 - 12/2016",
            meses: 12,
            saldo: 0,
            nombreProy: { nombre: "Proyectos Varios Arquitectura 2016", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 1 },
            montoNeto: 156220516,
            iva: 29681898.04,
            montoGastado: 42504722,
            ivaCredito: { monto: 0, porcentaje: 0 },
            utilidad: { monto: 113715794, porcentaje: 113715794 * 100 / 156220516 },
            utilidadMensual: { monto: 113715794 / 12, porcentaje: (113715794 / 12) * 100 / 156220516 }
          }
        ]
      },
      {
        agno: "2017",
        centrosCosto: [
          {
            periodo: "01/2017 - 12/2017",
            meses: 12,
            saldo: 0,
            nombreProy: { nombre: "Proyectos Varios Arquitectura 2017", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 0 },
            montoNeto: 52366200,
            iva: 9949578,
            montoGastado: 20897787,
            ivaCredito: { monto: 0, porcentaje: 0 },
            utilidad: { monto: 31468413, porcentaje: 31468413 * 100 / 52366200 },
            utilidadMensual: { monto: 31468413 / 12, porcentaje: (31468413 / 12) * 100 / 52366200 }
          }
        ]
      },
      {
        agno: "2018",
        centrosCosto: [
          {
            periodo: "01/2018 - 12/2018",
            meses: 12,
            saldo: 0,
            nombreProy: { nombre: "Proyectos Varios Arquitectura 2018", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 0 },
            montoNeto: 34587352.41,
            iva: 6571596.95,
            montoGastado: 16542112,
            ivaCredito: { monto: 0, porcentaje: 0 },
            utilidad: { monto: 18045240.41, porcentaje: 18045240.41 * 100 / 34587352.41 },
            utilidadMensual: { monto: 18045240.41 / 12, porcentaje: (18045240.41 / 12) * 100 / 34587352.41 }
          }
        ]
      },
      {
        agno: "2019",
        centrosCosto: [
          {
            periodo: "01/2019 - 12/2019",
            meses: 12,
            saldo: 0,
            nombreProy: { nombre: "Proyectos Varios Arquitectura 2019", fondo: "#bdbdbd", letras: "#000000", montoProgramado: 0 },
            montoNeto: 9877148.25,
            iva: 1876658.16,
            montoGastado: 2830101,
            ivaCredito: { monto: 0, porcentaje: 0 },
            utilidad: { monto: 7047047.25, porcentaje: 7047047.25 * 100 / 9877148.25 },
            utilidadMensual: { monto: 7047047.25 / 12, porcentaje: (7047047.25 / 12) * 100 / 9877148.25 }
          }
        ]
      },
    ]
  }

}
