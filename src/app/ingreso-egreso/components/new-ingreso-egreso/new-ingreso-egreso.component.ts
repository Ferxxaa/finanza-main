import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimientoAdd } from '../../../models/movimiento';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { SubTipoGasto } from '../../../models/nestSubTipoGasto';
import { TipoGasto } from '../../../models/nestTipoGasto';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';
import { estadoPagoService } from '../../../services/sEstadoPagoservice';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { subTipoGastoService } from '../../../services/sSubTipoGasto.service';
import { tipoGastoService } from '../../../services/sTipoGasto.service';
import { comunesFechas } from '../../../share/fechas';

declare var jQuery: any;
declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-new-ingreso-egreso',
  templateUrl: './new-ingreso-egreso.component.html',
  styleUrls: ['./new-ingreso-egreso.component.css'],
  providers: [
    centroCostoService,
    tipoGastoService,
    subTipoGastoService,
    comunesFechas,
    sMovimientoService,
    estadoPagoService
  ]
})
export class NewIngresoEgresoComponent implements OnInit {

  centroCosto$: Observable<CentroCosto[]>
  tipoGasto$: Observable<TipoGasto[]>
  subTipoGasto$: Observable<SubTipoGasto[]>

  movimiento: MovimientoAdd;

  cantEstadosPago: number;

  constructor(
    private centroCostoService: centroCostoService,
    private tipoGastoService: tipoGastoService,
    private subtipoGastoService: subTipoGastoService,
    private _sComunesFechas: comunesFechas,
    private movimientoService: sMovimientoService,
    private estadoPagoService: estadoPagoService
  ) {
    this.centroCosto$ = this.centroCostoService.getCentroCostoWithParent();
    this.tipoGasto$ = this.tipoGastoService.getTiposGastos();
    this.subTipoGasto$ = null;
    this.movimiento = this.movimientoService.init();
    this.movimiento.estadoPago = [this.estadoPagoService.retNewEp()]
  }

  ngOnInit() {
    this.limpiar();
  }

  limpiar() {
    this.movimiento.centroCosto = 0;
    this.movimiento.tipoGasto = 0;
    this.movimiento.subTipoGasto = 0;
    this.movimiento.metodoPago = '0';
    this.movimiento.item = [{ codigo: null, detalle: null, cantidad: 1, declaracion: null, moneda: 'CLP', precioUnitario: null, tipoDeclaracion: null, idItem: null, isActive: true, fechaCreacion: new Date() }];
    this.movimiento.tipo = 2;
    this.cantEstadosPago = 1;
    this._sComunesFechas.calendario();
    this.agregaEstadosPago();
  }

  AsignaTipoGasto() {
    this.subTipoGasto$ = this.subtipoGastoService.getSubTipoGastoByIdTipoGasto(this.movimiento.tipoGasto)
  }

  selectCentroCosto() {
    this.centroCostoService.getCentroCostoById(this.movimiento.centroCosto).subscribe(res => {
      this.movimiento.areaNegocio = res.areaNegocio.idAreaNegocio;
    })
  }

  agregaEstadosPago() {
    if (this.cantEstadosPago < this.movimiento.estadoPago.length) {
      this.movimiento.estadoPago.splice(this.cantEstadosPago);
    } else if (this.movimiento.estadoPago.length < this.cantEstadosPago) {
      const indiceCopiar = this.movimiento.estadoPago.length - 1
      this.movimiento.estadoPago.push({ fechaPago: null, monto: this.movimiento.estadoPago[indiceCopiar].monto, metodoPago: 0, estado: 1, numeroPago: null, numeroFactura: null, cheque: null, isActive: true, valorCuentaCorriente: null, idEstadoPago: null, fechaCreacion: new Date() });
      let lastFecha = this._sComunesFechas.cortaFechaDate(this.movimiento.estadoPago[indiceCopiar].fechaPago, indiceCopiar);
      const indiceCrear = this.movimiento.estadoPago.length - 1
      this.movimiento.estadoPago[indiceCrear].fechaPago = lastFecha ? lastFecha : null;
      this._sComunesFechas.DespliegaFechaDate("#txtFechaPago" + indiceCrear, this.movimiento.estadoPago[indiceCrear].fechaPago);
    }
    // console.log(this.ordenCompra);
    this._sComunesFechas.calendario();
  }

  asignaFechaPago(i: number) {
    this.movimiento.estadoPago[i].fechaPago = this._sComunesFechas.retFechaParaGuardarDate($("#txtFechaPago" + i).val());
  }

  retTotal(): number {
    return this.movimiento.estadoPago.reduce((acc, el) => acc + el.monto, 0)
  }

  guardar() {
    this.movimiento.estadoPago = this.movimiento.estadoPago.map(el => ({ ...el, metodoPago: Number(this.movimiento.metodoPago) }))
    this.movimientoService.addMovimiento(this.movimiento).subscribe(res => {
      Swal.fire(
        "Ingreso/Egreso",
        "Se ha creado de forma correcta el Ingreso/Egreso",
        "success"
      );
      this.limpiar();
    });
  }

}
