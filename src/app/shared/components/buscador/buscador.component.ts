import { Component, OnInit, Output, EventEmitter, Input, HostListener, ElementRef } from '@angular/core';
import { comunesFechas } from '../../../share/fechas';

import { mProveedor } from '../../../models/mProveedor';
import { mGastos } from '../../../models/mGastos';
import { sProveedor } from '../../../services/sProveedor.service';
import { sCentroCosto } from '../../../services/sCentroCosto.service';
import { sGastos } from '../../../services/sGastos.service';
import { Observable } from 'rxjs/Observable';
import { Buscador } from '../../../models/buscadoEntity';
import { Proveedor } from '../../../models/nestProveedor';
import { TipoGasto } from '../../../models/nestTipoGasto';
import { tipoGastoService } from '../../../services/sTipoGasto.service';
import { SubTipoGasto } from '../../../models/nestSubTipoGasto';
import { subTipoGastoService } from '../../../services/sSubTipoGasto.service';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';
import { CuentaCorriente } from '../../../models/mCuentaCorriente';
import { ViewCentroCosto } from '../../../models/nestViewCentroCosto';
import { ViewListadoMovimiento } from '../../../models/nestViewListadoMovimientos';
import { sViewListadoMovimientosService } from '../../../services/sViewListadoMovimientos';
import { viewCentroCostoService } from '../../../services/sViewCentroCosto.service';
import { SCuentaCorrienteService } from '../../../services/s-cuenta-corriente.service';
import { nestProveedorService } from '../../../services/nestProfesional.service';

declare var $: any;

@Component({
  selector: 'buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  providers: [
    sProveedor,
    comunesFechas,
    tipoGastoService,
    subTipoGastoService,
    centroCostoService,
    SCuentaCorrienteService,
    viewCentroCostoService,
    sViewListadoMovimientosService,
    nestProveedorService
  ]
})
export class BuscadorComponent implements OnInit {

  @Input() vista: any;
  @Input() tipoGasto?: boolean;
  @Output() event = new EventEmitter<Buscador>();

  //Observables
  // proveedores$: Observable<Proveedor>;
  tiposGastos$: Observable<TipoGasto[]>;
  subTipoGasto$: Observable<SubTipoGasto[]>;
  centroCosto$: Observable<CentroCosto[]>;

  //Array
  proveedores: Array<mProveedor>;
  proveedores$: Observable<Proveedor[]>;
  tiposGastos: mGastos[];

  buscador: Buscador;

  contadorCerrar: number;

  constructor(
    private _sProveedor: sProveedor,
    private _sComunesFechas: comunesFechas,
    private eRef: ElementRef,
    private tipoGastoService: tipoGastoService,
    private subTipoGastoService: subTipoGastoService,
    private centroCostoService: centroCostoService,
    private cuentaCorrienteService: SCuentaCorrienteService,
    private viewCentrocostoService: viewCentroCostoService,
    private viewListadoMovimientoService: sViewListadoMovimientosService,
    private proveedorService: nestProveedorService
  ) {
    this.vista = true;
    this.buscador = { inicio: null, termino: null, oc: null, proveedor: '', cCosto: '', factura: null, pago: null, tipoGasto: '', subTipoGasto: '', estado: 0 }
    this.contadorCerrar = 0;
    this.tiposGastos$ = this.tipoGastoService.getTiposGastos()
    this.subTipoGasto$ = this.subTipoGastoService.getSubTiposGastos();
    this.centroCosto$ = this.centroCostoService.getCentroCosto();
    this.proveedores$ = this.proveedorService.getProveedores();
  }

  ngOnInit() {
    this._sComunesFechas.calendario();
    this.cargaDatos();
    $.getScript("https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.js", function (data, textStatus, jqxhr) {
      $("#drdProveedor").select2();
      $("#drdProveedor").show();
    });
  }

  cargaDatos() {
    this.cargaProveedor();
  }

  private cargaProveedor() {
    this.proveedores = [];
    this._sProveedor.getProveedor().subscribe(res => {
      this.proveedores = res;
    });
  }

  asignaFechaInicio() {
    let temp = $("#txtInicio").val()
    this.buscador.inicio = this._sComunesFechas.retFechaParaGuardar(temp);
  }

  asignaFechaTermino() {
    let temp = $("#txtTermino").val()
    this.buscador.termino = this._sComunesFechas.retFechaParaGuardar(temp);
  }

  Buscar() {
    // console.log(this.buscador);
    let proveedor = $('#select2-drdProveedor-container').text().trim();
    if (!proveedor.includes('---'))
      this.buscador.proveedor = proveedor;
    this.event.emit(this.buscador);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    // console.log(this.contadorCerrar);
    if (!this.eRef.nativeElement.contains(event.target) && this.contadorCerrar)
      this.event.emit(this.buscador);
    if (!this.contadorCerrar)
      this.contadorCerrar = 1;
  }

  retCuentacorrienteConfirmados(buscador: Buscador): Observable<CuentaCorriente[]> {
    return this.cuentaCorrienteService.getCuentaCorrienteConfirmadosFilter(buscador)
  }

  retCuentacorrientePendientes(buscador: Buscador): Observable<CuentaCorriente[]> {
    return this.cuentaCorrienteService.getCuentaCorrientePendientesfilter(buscador)
  }

  retViewCentroCostoConfirmados(id: number, buscador: Buscador): Observable<ViewCentroCosto[]> {
    return this.viewCentrocostoService.getViewCentroCostoByConfirmadosFilter(id, buscador)
  }

  retViewCentroCostoPendientes(id: number, buscador: Buscador): Observable<ViewCentroCosto[]> {
    return this.viewCentrocostoService.getViewCentroCostoByPendientesFilter(id, buscador)
  }

  retViewListadoMovimientos(buscador: Buscador): Observable<ViewListadoMovimiento[]> {
    return this.viewListadoMovimientoService.getViewListadoMovimientosFilter(buscador)
  }

}
