import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { mOrdenCompra } from '../../../../models/mOrdenCompra';
import { sCentroCosto } from '../../../../services/sCentroCosto.service';
import { sCierre } from '../../../../services/sCierre.service';
import { sGastos } from '../../../../services/sGastos.service';
import { sOrdenComra } from '../../../../services/sOrdenComra.service';
import { areaNegocioService } from '../../../../services/Nest/areaNegocioService.service';
import { AreaNegocio } from '../../../../models/nestAreaNegocio';

interface detalleCentroCosto {
  centroCosto: mCentroCosto,
  ordenes: mCentroCosto[],
  totalOrden: number,
  ingresos: number,
  antigua: string,
  nueva: string,
  duracion: number,
  areaNegocio: any
}

interface mCentroCosto {
  activo: boolean,
  cliente: any,
  fondo: string,
  letras: string,
  nombre: string
}

interface objFechas {
  antigua: string,
  nueva: string,
  duracion: number
}

@Component({
  selector: 'app-content-consolidado-centro-costo',
  templateUrl: './content-consolidado-centro-costo.component.html',
  styleUrls: ['./content-consolidado-centro-costo.component.css'],
  providers: [
    sCentroCosto,
    sCierre,
    sOrdenComra,
    sGastos,
    areaNegocioService
  ]
})
export class ContentConsolidadoCentroCostoComponent implements OnInit {

  areaNegocio: string;

  cierre$: Observable<any>;
  centroCosto$: Observable<AreaNegocio[]>;

  // reporte: detalleCentroCosto[];
  original: detalleCentroCosto[];

  constructor(
    private CentroCosto: sCentroCosto,
    private Cierre: sCierre,
    private OrdenesCompra: sOrdenComra,
    private areaNegocioService: areaNegocioService
  ) {
    this.cierre$ = this.Cierre.getCierre()
    this.centroCosto$ = this.areaNegocioService.getAreasNegocio()
  }

  ngOnInit() {
    this.areaNegocio = "0";
    // this.centroCosto$.subscribe(centroCosto => {
    // this.cierre$.subscribe(res => {
    //   let ordenes = res.map(el => ({ all: el.OC.concat(el.OP) }))
    //   let consolidado = ordenes.reduce((acc, el) => acc.concat(el.all), [])
    // console.log(centroCosto, consolidado);
    // this.reporte = this.getOrdenesCentroCosto(centroCosto, consolidado);
    // this.original = this.reporte
    // console.log(this.reporte);
    // });
    // });
  }

  // getData() {
  //   // console.log(this.reporte);
  //   console.log(this.areaNegocio);

  //   this.reporte = this.original.filter(el => el.areaNegocio._id == this.areaNegocio);
  // }

  // getCentroCosto(allOrdenes: mOrdenCompra[]): string[] {
  //   let centrosCosto = allOrdenes.map(el => el.subCentroCosto)
  //   let unicos: string[] = centrosCosto.filter((el, indice, arr) => indice == arr.indexOf(el));
  //   return unicos;
  // }

  // getOrdenesCentroCosto(areaNegocio: any[], allOrdenes) {
  //   let allCentros = areaNegocio.reduce((acc, el) => acc.concat(el.subCentroCosto), [])
  //   let ordenes: any[] = [];
  //   let centrosCosto = this.getCentroCosto(allOrdenes);

  //   centrosCosto.forEach(centroCosto => {
  //     let obj = this.retObjCentroCosto(areaNegocio, centroCosto, allCentros, allOrdenes)
  //     ordenes.push(obj);
  //   });
  //   return ordenes
  // }

  // retObjCentroCosto(areaNegocio, centroCosto, allCentros, allOrdenes): detalleCentroCosto {
  //   let ordenesCentroCosto = allOrdenes.filter(el => el.subCentroCosto == centroCosto && el.ingresoEgreso == 1);
  //   let objCentroCosto = allCentros.find(el => el.nombre == centroCosto);
  //   let totalOC = this.OrdenesCompra.retMontoNeto(ordenesCentroCosto);
  //   let ingresos = this.CentroCosto.retSumaContratos(objCentroCosto);
  //   let detalleCentro = allCentros.find(el => el.nombre == centroCosto)
  //   // console.log(detalleCentro,detalleCentro.periodo)
  //   let periodo: objFechas = this.getPeriodo(ordenesCentroCosto);
  //   periodo.duracion = detalleCentro.periodo ? detalleCentro.periodo : periodo.duracion;
  //   let area = areaNegocio.find(el => el.subCentroCosto.map(el => el.nombre).includes(centroCosto))
  //   return { centroCosto: objCentroCosto, ordenes: ordenesCentroCosto, totalOrden: totalOC, ingresos: ingresos, ...periodo, areaNegocio: { _id: area._id, nombre: area.nombre } }
  // }

  // getPeriodo(allOrdenesCentroCosto: mOrdenCompra[]): objFechas {

  //   let allFechas = allOrdenesCentroCosto.map(el => el.estadosPagos).reduce((acc: string[], el) => acc.concat(el.map(ep => ep.fecha)), [])
  //   let antigua = null;
  //   let nueva = null;
  //   allFechas.forEach(el => {
  //     antigua = this.getMinorDate(antigua, el);
  //     nueva = this.getMaxDate(nueva, el);
  //   })
  //   let duracion = this.monthDiff(antigua, nueva)
  //   return { antigua: antigua, nueva: nueva, duracion: duracion }
  // }

  // getMinorDate(previa, fecha): string {
  //   if (!previa)
  //     return fecha
  //   else {
  //     let prev = new Date(previa);
  //     let actual = new Date(fecha);
  //     return prev <= actual ? previa : fecha
  //   }
  // }

  // getMaxDate(posterior, fecha): string {
  //   if (!posterior)
  //     return fecha
  //   else {
  //     let fechaPosterior = new Date(posterior);
  //     let actual = new Date(fecha);
  //     return fechaPosterior >= actual ? posterior : fecha
  //   }
  // }

  // monthDiff(fechaMenor, fechaMayor): number {
  //   let menor = new Date(fechaMenor);
  //   let mayor = new Date(fechaMayor);
  //   let agnosDiff = mayor.getFullYear() - menor.getFullYear();
  //   let mesesDiff = mayor.getMonth() - menor.getMonth() + 1;
  //   return (agnosDiff * 12) + mesesDiff;
  // }

}
