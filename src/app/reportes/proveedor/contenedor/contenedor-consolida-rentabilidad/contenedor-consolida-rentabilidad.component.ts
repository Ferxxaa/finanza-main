import { Component, OnInit } from '@angular/core';
import { sCentroCosto } from '../../../../services/sCentroCosto.service';
import { sCierre } from '../../../../services/sCierre.service';
import { sGastos } from '../../../../services/sGastos.service';
import { sOrdenComra } from '../../../../services/sOrdenComra.service';

@Component({
  selector: 'app-contenedor-consolida-rentabilidad',
  templateUrl: './contenedor-consolida-rentabilidad.component.html',
  styleUrls: ['./contenedor-consolida-rentabilidad.component.css'],
  providers: [
    sCierre,
    sCentroCosto,
    sGastos,
    sOrdenComra
  ]
})
export class ContenedorConsolidaRentabilidadComponent implements OnInit {

  grafico: boolean;
  loading: boolean;

  consolidado: any;

  operacional: any[]

  constructor(
    private Cierre: sCierre,
    private CentroCosto: sCentroCosto,
    private TipoGasto: sGastos,
    private Ordenes: sOrdenComra
  ) {
    this.loading = false;
    this.operacional = [
      { nombre: "Gastos Operacionales Trazas Central (-)" },
      { nombre: "OPERACIONAL INVERSIONES" },
      { nombre: "OPERACIONAL RETIROS" },
    ]
  }

  ngOnInit() {
    this.consolidado = [
      { agno: 2016, utilidadArq: -38057858, rentabilidadArq: 85, utilidadConstruccion: 432900432, rentabilidadConstruccion: 13.41, ventasArea: 123123, rentabilidadRetiros: 206163196, porcentajeRetiros: 22.74, final: 95217935, finalPorcentaje: 10.50 },
      { agno: 2017, utilidadArq: -38057858, rentabilidadArq: 85, utilidadConstruccion: 432900432, rentabilidadConstruccion: 13.41, ventasArea: 724312, rentabilidadRetiros: 206163196, porcentajeRetiros: 22.74, final: 95217935, finalPorcentaje: 10.50 },
      { agno: 2018, utilidadArq: -38057858, rentabilidadArq: 85, utilidadConstruccion: 432900432, rentabilidadConstruccion: 13.41, ventasArea: 3248213, rentabilidadRetiros: 206163196, porcentajeRetiros: 22.74, final: 95217935, finalPorcentaje: 10.50 },
      { agno: 2019, utilidadArq: -26762474, rentabilidadArq: 51.11, utilidadConstruccion: 267861093, rentabilidadConstruccion: 29.55, ventasArea: 9237481, rentabilidadRetiros: 317196395, porcentajeRetiros: 72.05, final: 153577970, finalPorcentaje: 34.88 },
      { agno: 2020, utilidadArq: -38057858, rentabilidadArq: 85, utilidadConstruccion: 432900432, rentabilidadConstruccion: 13.41, ventasArea: 2314593, rentabilidadRetiros: 332273022, porcentajeRetiros: 6.89, final: 192719978, finalPorcentaje: 4 },
      { agno: 2021, utilidadArq: -26923701, rentabilidadArq: 77.84, utilidadConstruccion: 337654145, rentabilidadConstruccion: 16.59, ventasArea: 9823412, rentabilidadRetiros: 206163196, porcentajeRetiros: 22.74, final: 95217935, finalPorcentaje: 10.50 },
      { agno: 2022, utilidadArq: -38057858, rentabilidadArq: 85, utilidadConstruccion: 432900432, rentabilidadConstruccion: 13.41, ventasArea: 9812731, rentabilidadRetiros: 317196395, porcentajeRetiros: 72.05, final: 153577970, finalPorcentaje: 34.88 },
    ]
    // this.consolidado = this.consolidado.map(el => ({ ...el, ...this.getOperacional(el.agno, this.operacional) }))
    this.getData();
  }

  getData() {
    this.loading = true;
    this.Cierre.getCierre().subscribe(res => {
      this.TipoGasto.getGastos().subscribe(gastos => {
        this.CentroCosto.getCentroCosto().subscribe(centroCosto => {
          this.Ordenes.getOrdenComprabyCentroCosto("Trazas Operacional").subscribe(operacional => {
            this.Ordenes.getOrdenComprabyEstado(6).subscribe(ingresos => {
              // console.log(this.operacional);
              this.genConsolidado(res, centroCosto, gastos, operacional, ingresos)
              this.loading = false;
            });
          });
        })
      });
    })
  }

  genConsolidado(ordenes: any[], centroCosto: any[], gastos: any[], operacional: any[], ingresos: any[]) {
    this.consolidado = [];
    this.consolidado = [
      { agno: 2016, utilidadArq: 61614154, rentabilidadArq: 39.44, utilidadConstruccion: 185997894, rentabilidadConstruccion: 15.97, ventasArea: 1320881193, rentabilidadRetiros: 67600000, porcentajeRetiros: 0, final: 61614154 + 185997894, finalPorcentaje: (61614154 + 185997894) * 100 / 1320881193 },
      { agno: 2017, utilidadArq: -32127465, rentabilidadArq: -61.35, utilidadConstruccion: 267861092, rentabilidadConstruccion: 29.5, ventasArea: 958877696, rentabilidadRetiros: 101072414, porcentajeRetiros: 0, final: 267861092 - 32127465, finalPorcentaje: (267861092 - 32127465) * 100 / 958877696 },
    ];
    ordenes.forEach(cierre => {
      // console.log(gastos);

      // console.log("***********************" + cierre.agno + "***********************");
      let gastoOperacionalArq = this.gastoOperacionalSubTipos(gastos.filter(el => el.areaNegocio && el.areaNegocio._id == '5ea8afc6cfb9095e5829a2d4'), operacional, cierre.agno)
      let gastoOperacionalCons = this.gastoOperacionalSubTipos(gastos.filter(el => el.areaNegocio && el.areaNegocio._id == '5ea8afbccfb9095e5829a2d3'), operacional, cierre.agno)
      // let ingresoNetoArq = this.Ordenes.retMontoNeto(cierre.OC.concat(cierre.OP).filter(el => el.ingresoEgreso == 2 && this.retAreaNegocio(centroCosto, el.subCentroCosto, '5ea8afc6cfb9095e5829a2d4')))
      let ingresoNetoArq = this.Ordenes.retMontoNeto(ingresos.map(el => ({ ...el, estadosPagos: el.estadosPagos.filter(el => new Date(el.fecha).getFullYear() == cierre.agno) })).filter(el => el.estadosPagos.length && this.retAreaNegocio(centroCosto, el.subCentroCosto, '5ea8afc6cfb9095e5829a2d4')))
      let egresoNetoArq = this.Ordenes.retMontoNeto(cierre.OC.concat(cierre.OP).filter(el => el.ingresoEgreso == 1 && this.retAreaNegocio(centroCosto, el.subCentroCosto, '5ea8afc6cfb9095e5829a2d4')))
      // let ingresoNetoCons = this.Ordenes.retMontoNeto(cierre.OC.concat(cierre.OP).filter(el => el.ingresoEgreso == 2 && this.retAreaNegocio(centroCosto, el.subCentroCosto, '5ea8afbccfb9095e5829a2d3')))
      let ingresoNetoCons = this.Ordenes.retMontoNeto(ingresos.map(el => ({ ...el, estadosPagos: el.estadosPagos.filter(el => new Date(el.fecha).getFullYear() == cierre.agno) })).filter(el => el.estadosPagos.length && this.retAreaNegocio(centroCosto, el.subCentroCosto, '5ea8afbccfb9095e5829a2d3')))
      let egresoNetoCons = this.Ordenes.retMontoNeto(cierre.OC.concat(cierre.OP).filter(el => el.ingresoEgreso == 1 && this.retAreaNegocio(centroCosto, el.subCentroCosto, '5ea8afbccfb9095e5829a2d3')))

      // let ingresosPorAgnoArq = 
      // let ingresosPorAgnoCons = 
      // console.log("Ingresos Arq:", ingresosPorAgnoArq, this.Ordenes.retMontoNeto(ingresosPorAgnoArq) - egresoNetoArq - gastoOperacionalArq);
      // console.log("Ingresos Cons:", ingresosPorAgnoCons, this.Ordenes.retMontoNeto(ingresosPorAgnoCons) - egresoNetoCons - gastoOperacionalCons);

      // let gastoOperacionalArea = gastoOperacionalArq + gastoOperacionalCons
      let ingresoNeto = ingresoNetoArq + ingresoNetoCons
      let utilidadArq = ingresoNetoArq - egresoNetoArq - gastoOperacionalArq
      let utilidadCons = ingresoNetoCons - egresoNetoCons - gastoOperacionalCons
      let utilidad = utilidadArq + utilidadCons
      let consolidado = {
        agno: cierre.agno,
        utilidadArq: utilidadArq,
        rentabilidadArq: ingresoNetoArq ? utilidadArq * 100 / ingresoNetoArq : 0,
        utilidadConstruccion: utilidadCons,
        rentabilidadConstruccion: ingresoNetoCons ? utilidadCons * 100 / ingresoNetoCons : 0,
        ventasArea: ingresoNetoArq + ingresoNetoCons,
        final: utilidad,
        finalPorcentaje: utilidad * 100 / (ingresoNetoArq + ingresoNetoCons)
      };
      this.consolidado.push(consolidado);
    });
    this.consolidado = this.replaceAgnosSindatos(this.consolidado.map(el => ({ ...el, ...this.getOperacional(el.agno, operacional) })))
  }

  retOperacionalAreaNegocio(areaNegocio) {
    if (areaNegocio == "5ea8afbccfb9095e5829a2d3") {
      return "OPERACIONAL CONSTRUCCIÓN"
    } else {
      return "OPERACIONAL ARQUITECTURA"
    }
  }

  gastoOperacionalSubTipos(gastos: any[], operacional: any[], agno: number): number {
    let subTipos = gastos.reduce((acc, el) => acc.concat(el.subTipoGasto), []);
    let operacionalArea = operacional.filter(el => el.ingresoEgreso == 1 && subTipos.includes(el.subTipoGasto) && el.tipoGasto.nombre.trim() == this.retOperacionalAreaNegocio(gastos[0].areaNegocio._id))
    return this.Ordenes.retMontoNeto(this.getOperacionalAgnos(operacionalArea, agno))
  }

  retAreaNegocio(centrosCosto: any[], subCentroCosto: string, idAreaNegocio: string): boolean {
    let areaNegocio = centrosCosto.find(el => el.subCentroCosto.map(el => el.nombre).includes(subCentroCosto))
    return areaNegocio ? areaNegocio._id == idAreaNegocio : false
  }

  getOperacional(agno: number, operacional: any[]) {
    let obj = {}
    // console.log("******************************El año que se busca es el siguiente:", agno);
    this.operacional.forEach(opera => {
      //Filtra por registros correspondientes al tipo de gasto asignado
      let filtrado = operacional.filter(el => {
        return el.estadosPagos.map(el => new Date(el.fecha).getFullYear()).includes(agno) && el.tipoGasto && el.tipoGasto.nombre && this.replaceOperacional(el.tipoGasto.nombre.trim()) == opera.nombre
      })

      //filtra registros por año
      filtrado = filtrado.map(el => (
        { ...el, estadosPagos: el.estadosPagos.filter(ep => new Date(ep.fecha).getFullYear() == agno) }
      ))

      //Filtra por Inversiones tangibles
      if (opera.nombre == 'OPERACIONAL INVERSIONES')
        filtrado = filtrado.filter(el => el.subTipoGasto == 'INVERSIONES TANGIBLES ')

      obj[opera.nombre] = filtrado.length ? this.Ordenes.retMontoNeto(filtrado) : 0; //filtrado.reduce((acc, el) => acc + this.Ordenes.retMontoNetoEP(el.estadosPagos)) : 0;
    })

    return obj
  }

  replaceOperacional(nombreOpera: string) {
    if (nombreOpera == 'OPERACIONAL VARIABLE' || nombreOpera == 'OPERACIONAL FIJO')
      return 'Gastos Operacionales Trazas Central (-)'
    else
      return nombreOpera
  }

  getOperacionalAgnos(arr: any[], agno): any[] {
    let arrtemp = arr.filter(el => el.estadosPagos.map(el => new Date(el.fecha).getFullYear()).includes(agno))
    return arrtemp.map(el => ({ ...el, estadosPagos: el.estadosPagos.filter(el => new Date(el.fecha).getFullYear() == agno) }))
  }

  replaceAgnosSindatos(cierre: any[]) {
    return cierre.map(el => el.agno == 2018 ? this.cambiaDatos(el) : el)
  }

  cambiaDatos(elemento): any {
    // console.log(elemento)
    let utilidadArq = -27079819
    let utilidadCons = 410326855
    let utilidadTotal = utilidadArq + utilidadCons
    let ventasArea = 1054259252
    let utilidadFinal = utilidadTotal - 145069841 + 128736112
    return { agno: 2018, utilidadArq: utilidadArq, rentabilidadArq: -78.29, utilidadConstruccion: utilidadCons, rentabilidadConstruccion: utilidadCons * 100 / 1019671900, ventasArea: ventasArea, 'Gastos Operacionales Trazas Central (-)': 145069841, 'OPERACIONAL INVERSIONES': 24202313, 'OPERACIONAL RETIROS': 128736112, final: utilidadFinal, finalPorcentaje: utilidadFinal * 100 / ventasArea }
  }
}
