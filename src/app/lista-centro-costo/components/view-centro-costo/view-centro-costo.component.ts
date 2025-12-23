import { Component, OnInit, ViewChild } from '@angular/core';
import { comunesFechas } from '../../../share/fechas';
import { sCentroCosto } from '../../../services/sCentroCosto.service';

import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { sCotizacion } from '../../../services/sCotizacion.service';
import { sOrdenPedido } from '../../../services/sOrdenPedido.service';
import { Observable } from 'rxjs';
import { ViewCentroCosto } from '../../../models/nestViewCentroCosto';
import { viewCentroCostoService } from '../../../services/sViewCentroCosto.service';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';
import { Buscador } from '../../../models/buscadoEntity';
import { BuscadorComponent } from '../../../shared/components/buscador/buscador.component';
import { viewDetalleCentroCosto } from '../../../models/detalleCentroCosto';

declare var $: any;

@Component({
  selector: 'app-view-centro-costo',
  templateUrl: './view-centro-costo.component.html',
  styleUrls: ['./view-centro-costo.component.css'],
  providers: [
    sCentroCosto,
    sOrdenComra,
    sCotizacion,
    comunesFechas,
    sOrdenPedido,
    centroCostoService,
    viewCentroCostoService
  ]
})
export class ViewCentroCostoComponent implements OnInit {

  centrosCostos$: Observable<CentroCosto[]>;
  confirmados$: Observable<ViewCentroCosto[]>;
  pendientes$: Observable<ViewCentroCosto[]>;
  detalleCentroCosto$: Observable<viewDetalleCentroCosto>;

  @ViewChild(BuscadorComponent) BuscadorComponent: BuscadorComponent;

  centroCosto: number;

  centrosCostos: Array<any>;
  subCentroCosto: any;

  confirmados: Array<any>;
  pendientes: Array<any>;

  ordenCompra: any;
  centroCostoDetalle: any;
  Flujos: Array<any>;

  grafico: boolean;
  buscador: Buscador;
  loading: boolean;

  idOC: string;
  idOP: string;

  paraDesplegar: any;
  historico: boolean;

  allListado: any[];
  filterListado: any;

  constructor(
    private _sCentroCosto: sCentroCosto,
    private _sOrdenComra: sOrdenComra,
    private _sCotizacion: sCotizacion,
    private _sComunesFechas: comunesFechas,
    private centroCostoService: centroCostoService,
    private viewCentroCostoService: viewCentroCostoService
  ) {
    this.centrosCostos = [];
    this.centroCosto = 0;
    this.confirmados = [];
    this.pendientes = [];
    this.allListado = [];
    this.ordenCompra = null;
    this.centroCostoDetalle = null;
    this.grafico = false;
    this.loading = true;
    this.historico = true;
    this.filterListado = { ordenes: true, proyecciones: true }
    this.centrosCostos$ = this.centroCostoService.getCentroCosto();
  }

  ngOnInit() {
    console.clear();
    // this.cargaCentroCosto();
    this.paraDesplegar = $(".desplegar");
  }

  update(){
    console.clear();
    this.confirmados$ = null;
    this.pendientes$ = null;
    this.detalleCentroCosto$ = null;
    this.selectCentroCosto();
  }

  cargaCentroCosto() {
    this.getHistoricos();
  }

  selectCentroCosto() {
    $("#drdCentroCosto").css("background-color", "#ffffff");
    $("#drdCentroCosto").css("color", "#000000");
    this.confirmados$ = this.viewCentroCostoService.getViewCentroCostoByConfirmados(this.centroCosto);
    this.pendientes$ = this.viewCentroCostoService.getViewCentroCostoByPendientes(this.centroCosto);
    this.detalleCentroCosto$ = this.viewCentroCostoService.getDetalleCentroCosto(this.centroCosto, this.filterListado);
    this.centrosCostos$.subscribe(res => {
      $("#drdCentroCosto").css("background-color", res.find(el => el.idCentroCosto == this.centroCosto).fondo);
      $("#drdCentroCosto").css("color", res.find(el => el.idCentroCosto == this.centroCosto).letras);
    })
    // this.loading = true;
    // this.centroCostoDetalle = null;
    // $("#drdCentroCosto").css("background-color", "#ffffff");
    // $("#drdCentroCosto").css("color", "#000000");
    // this._sCentroCosto.getCentroCosto().subscribe(res => {
    //   this.centroCostoDetalle = { real: 0, proyectado: 0, ivareal: 0, ivaproyectado: 0 };
    //   res.forEach(el => {
    //     this.centroCostoDetalle = el.subCentroCosto.filter(subCentro => subCentro.nombre == this.subCentroCosto).length > 0 ? el.subCentroCosto.filter(subCentro => subCentro.nombre == this.subCentroCosto)[0] : this.centroCostoDetalle;
    //     if (this.centroCostoDetalle) {
    //       $("#drdCentroCosto").css("background-color", this.centroCostoDetalle.fondo);
    //       $("#drdCentroCosto").css("color", this.centroCostoDetalle.letras);
    //     }
    //   });
    //   this.CargaDetalleOC();
    // },
    //   error => {
    //     console.log(new Error("Error al seleccionar el centro de costo"));
    //     this.centroCostoDetalle = null;
    //     this.loading = false;
    //   });
  }

  reloadPendiente() {
    this.pendientes$ = null;
    this.pendientes$ = this.viewCentroCostoService.getViewCentroCostoByPendientes(this.centroCosto);
  }

  CargaDetalleOC() {
    this.loading = true;
    this._sOrdenComra.getCuentaCorriente().subscribe(res => {
      // console.log(res);
      this.centroCostoDetalle = { real: 0, proyectado: 0, ivareal: 0, ivaproyectado: 0 };
      let base = res.filter(el => el.subCentro && el.subCentro.nombre == this.subCentroCosto && (el.ingresoEgreso == 1 || el.ingresoEgreso == 3))
      this.allListado = base;
      this.filterListado = { ordenes: true, proyecciones: true }
      // console.log(base); && (el.estado != -1 && el.ordenCompra)

      this.pendientes = base.filter(el => el.estadoPago < 4 && (el.estado == 2 || el.estadoPago == -1))
      // console.log(this.pendientes.filter(el => el.ingresoEgreso == 3));

      // this.pendientes.forEach(el => {
      //   this.centroCostoDetalle.proyectado += el.costo;
      //   if (el.indice == 1)
      //     this.centroCostoDetalle.ivaproyectado += el.iva + el.boleta;
      //   if (el.cotizacion)
      //     this._sCotizacion.getCotizacionesbyID(el.cotizacion).subscribe(res => {
      //       el.adjunto = res.adjunto
      //     });
      // });
      this.jobInListado(this.pendientes, 'proyectado', 'ivaproyectado')

      // console.log(res);
      this.confirmados = base.filter(el => el.estadoPago == 4 && el.estado == 2)
      // this.confirmados.forEach(el => {
      //   this.centroCostoDetalle.real += el.costo;
      //   if (el.indice == 1)
      //     this.centroCostoDetalle.ivareal += el.iva + el.boleta;
      //   if (el.cotizacion)
      //     this._sCotizacion.getCotizacionesbyID(el.cotizacion).subscribe(res => {
      //       el.adjunto = res.adjunto
      //     });
      // });
      // console.log(this.confirmados);
      this.jobInListado(this.confirmados, 'real', 'ivareal')

      this.irFinal();
      this.loading = false;
      // this.getOc();
    },
      error => {
        // console.log(new Error("No se encuentra el elemento para el centro de costo"))
        this.centroCostoDetalle = null;
        this.loading = false;
      });
  }

  // filtraTipos() {
  //   if (this.allListado.length) {
  //     let pendientes = this.allListado.filter(el => el.estadoPago < 4 && (el.estado == 2 || el.estadoPago == -1))
  //     if (this.filterListado.ordenes && this.filterListado.proyecciones) {
  //       this.pendientes = pendientes
  //     } else if (this.filterListado.ordenes && !this.filterListado.proyecciones) {
  //       this.pendientes = pendientes.filter(el => el.ordenCompra && el.ordenCompra != "Proyección")
  //     } else if (!this.filterListado.ordenes && this.filterListado.proyecciones) {
  //       this.pendientes = pendientes.filter(el => !el.ordenCompra && el.ordenCompra == "Proyección")
  //     }
  //     this.centroCostoDetalle = { real: 0, proyectado: 0, ivareal: 0, ivaproyectado: 0 };
  //     this.jobInListado(this.pendientes, 'proyectado', 'ivaproyectado')
  //     this.jobInListado(this.confirmados, 'real', 'ivareal')
  //   }
  // }

  // getOc(){
  //   this._sOrdenPedido.getOrdenPedido().subscribe(ordenPedido =>{
  //     let pendiente:Array<any> = ordenPedido.filter(el => el.estadoPago < 4 && (el.estado == 2 || el.estadoPago - 1) && el.subCentro.nombre == this.subCentroCosto && el.ingresoEgreso == 1);
  //     let confirmados:Array<any> = ordenPedido.filter(el => el.estadoPago == 4 && (el.estado == 2 || el.estadoPago - 1) && el.subCentro.nombre == this.subCentroCosto && el.ingresoEgreso == 1);
  //     this.pendientes = [...this.confirmados, ...pendiente];
  //     this.confirmados = [...this.confirmados, ...confirmados];
  //     this.loading = false;
  //   });
  // }

  irFinal() {
    let element = document.getElementById("irAlFinal")
    element.scrollTop = element.scrollHeight;
  }

  CargaDetalleOCPromise() {
    return new Promise((resolve, reject) => {
      this._sOrdenComra.getCuentaCorriente().subscribe(res => {
        this.centroCostoDetalle = { real: 0, proyectado: 0, ivareal: 0, ivaproyectado: 0 };
        resolve(res);
      },
        err => reject(new Error(err)));
    });
  }

  cargaTablaOC(e) {
    // console.log(e);
    if (e.ordenCompra) {
      if (e.ordenCompra.includes("OP"))
        this.idOP = e.id;
      else
        this.idOC = e.id;
      this._sOrdenComra.getOrdenComprabyID(e.id).subscribe(res => {
        this.ordenCompra = res;
        this.ordenCompra.indice = e.indice - 1;
        if (this.ordenCompra.cotizacion)
          this._sCotizacion.getCotizacionesbyID(this.ordenCompra.cotizacion).subscribe(res => {
            this.ordenCompra.adjunto = res.adjunto;
          });

        this._sComunesFechas.calendario();
        this.ordenCompra.compromiso = this._sComunesFechas.retFechaFormat(this.ordenCompra.estadosPagos[this.ordenCompra.indice].fecha);
      });
    }


  }

  jobInListado(listado: any[], accVal, accIVA) {
    listado.forEach(el => {
      this.centroCostoDetalle[accVal] += el.costo;
      if (el.indice == 1)
        this.centroCostoDetalle[accIVA] += el.iva + el.boleta;
      if (el.cotizacion)
        this._sCotizacion.getCotizacionesbyID(el.cotizacion).subscribe(res => {
          el.adjunto = res.adjunto
        });
    });
  }


  cerrarPopUp() {
    this.ordenCompra = null;
    this.idOC = null;
    this.idOP = null;
  }

  graficar() {
    if (this.centroCosto)
      this.grafico = true;
  }

  cerrarReporte() {
    this.grafico = false;
  }

  Filtrar(e: Buscador) {
    this.buscador = null;
    this.confirmados$ = null;
    this.pendientes$ = null;
    this.confirmados$ = this.BuscadorComponent.retViewCentroCostoConfirmados(this.centroCosto, e);
    this.pendientes$ = this.BuscadorComponent.retViewCentroCostoPendientes(this.centroCosto, e);
    // this.loading = true;
    // this.CargaDetalleOCPromise()
    //   .then((ordenes: Array<any>) => {
    //     this.pendientes = ordenes.filter(el => el.estadoPago < 4 && (el.estado == 2 || el.estadoPago == -1) && el.subCentro && el.subCentro.nombre == this.subCentroCosto && (el.ingresoEgreso == 1 || el.ingresoEgreso == 3))

    //     this.pendientes.forEach(el => {
    //       this.centroCostoDetalle.proyectado += el.costo;
    //       if (el.indice == 1)
    //         this.centroCostoDetalle.ivaproyectado += el.iva + el.boleta;
    //       if (el.cotizacion)
    //         this._sCotizacion.getCotizacionesbyID(el.cotizacion).subscribe(res => {
    //           el.adjunto = res.adjunto
    //         });
    //     });
    //     // console.log(this.pendientes);
    //     this.confirmados = ordenes.filter(el => el.estadoPago == 4 && el.estado == 2 && el.subCentro.nombre == this.subCentroCosto && (el.ingresoEgreso == 1 || el.ingresoEgreso == 3))
    //     this.confirmados.forEach(el => {
    //       this.centroCostoDetalle.real += el.costo;
    //       if (el.indice == 1)
    //         this.centroCostoDetalle.ivareal += el.iva + el.boleta;
    //       if (el.cotizacion)
    //         this._sCotizacion.getCotizacionesbyID(el.cotizacion).subscribe(res => {
    //           el.adjunto = res.adjunto
    //         });
    //     });

    //     this.Filtrando(e);

    //     this.loading = false;
    //   })
    //   .catch(err => {
    //     this.loading = false;
    //     // console.log(err)
    //   });
  }

  Filtrando(e) {
    if (e.inicio && e.termino) {
      this.pendientes = this.pendientes.filter(el => el.fecha >= e.inicio && el.fecha <= e.termino);
      this.confirmados = this.confirmados.filter(el => el.fecha >= e.inicio && el.fecha <= e.termino);
    }
    if (e.oc) {
      // console.log(this.pendientes)
      this.pendientes = this.pendientes.filter(el => el.ordenCompra != null && el.ordenCompra.includes(e.oc));
      this.confirmados = this.confirmados.filter(el => el.ordenCompra != null && el.ordenCompra.includes(e.oc));
    }
    if (e.proveedor) {
      this.pendientes = this.pendientes.filter(el => el.proveedor.nombre == e.proveedor);
      this.confirmados = this.confirmados.filter(el => el.proveedor.nombre == e.proveedor);
    }
    if (e.cCosto) {
      this.pendientes = this.pendientes.filter(el => el.subCentro.nombre == e.cCosto);
      this.confirmados = this.confirmados.filter(el => el.subCentro.nombre == e.cCosto);
    }
    if (e.factura) {
      this.pendientes = this.pendientes.filter(el => el.factura && el.factura.includes(e.factura));
      this.confirmados = this.confirmados.filter(el => el.factura && el.factura.includes(e.factura));
    }
    if (e.pago) {
      this.pendientes = this.pendientes.filter(el => el.numero == e.pago);
      this.confirmados = this.confirmados.filter(el => el.numero == e.pago);
    }

    if (e.tipoGasto) {
      // console.log(e.tipoGasto);

      this.pendientes = this.pendientes.filter(el => el.tipoGasto && el.tipoGasto.nombre == e.tipoGasto);
      this.confirmados = this.confirmados.filter(el => el.tipoGasto && el.tipoGasto.nombre == e.tipoGasto);
    }

    if (e.subTipoGasto) {
      this.pendientes = this.pendientes.filter(el => el.subTipoGasto && el.subTipoGasto == e.subTipoGasto);
      this.confirmados = this.confirmados.filter(el => el.subTipoGasto && el.subTipoGasto == e.subTipoGasto);
    }
    // console.log(this.confirmados);
    // this.confirmados.forEach(e => {
    //   console.log(e.costo);
    // });
    // console.log(this.pendientes)
    // this.pendientes.forEach(e => {
    //   console.log(e.costo);
    // });


  }

  totalFilter(tabla: ViewCentroCosto[]): number {
    let total = 0;
    // console.log(tabla);
    if (tabla)
      tabla.forEach(element => {
        total += element.monto;
      });
    return total
  }

  TraeBuscador() {
    if (this.buscador == null) {
      this.buscador = { inicio: null, termino: null, oc: null, proveedor: null, cCosto: null, factura: null, pago: null }
    }
    else {
      this.buscador = null;
    }
  }

  desplegar() {
    if (this.paraDesplegar.hasClass("desplegado")) {
      this.paraDesplegar.removeClass("desplegado");
      $("#iconCambiar").addClass("fa-plus-square");
      $("#iconCambiar").removeClass("fa-minus-square");
    } else {
      this.paraDesplegar.addClass("desplegado");
      $("#iconCambiar").removeClass("fa-plus-square");
      $("#iconCambiar").addClass("fa-minus-square");
      this.irFinal();
    }
  }

  getHistoricos() {
    this.historico = !this.historico;
    this.loading = true;
    this._sCentroCosto.getCentroCosto().subscribe(res => {
      let subCentros = res.map(el => el.subCentroCosto).reduce((acc, el) => acc.concat(el), []);
      this.centrosCostos = this.historico ? subCentros.filter(el => !el.activo) : subCentros.filter(el => el.activo);
      this.loading = false;
    });

  }

}
