import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { EstadosEP } from '../../../models/estadosEP';
import { CuentaCorriente } from '../../../models/mCuentaCorriente';
import { subTipoGastoEnv } from '../../../models/subTipoGastoEnv';
import { TiposMovimientos } from '../../../models/tiposMovimientos';

declare var $: any;
declare var Swal: any;


@Component({
  selector: 'app-get-cuenta-corriente',
  templateUrl: './get-cuenta-corriente.component.html',
  styleUrls: ['./get-cuenta-corriente.component.css']
})
export class GetCuentaCorrienteComponent implements OnInit {

  @Input() flujos: CuentaCorriente[];
  @Input() tipo: number;

  @Output() updateElement: EventEmitter<boolean>;

  tiposMovimiento: TiposMovimientos;
  estadosEP: EstadosEP;
  nombreSubTipoGasto: subTipoGastoEnv;
  idMovimiento: number | null;
  idMovimientoEP: number | null;
  egreso: number | null;
  ingreso: number | null;

  constructor() {
    this.tiposMovimiento = environment.tiposOC;
    this.estadosEP = environment.estadoEP;
    this.nombreSubTipoGasto = environment.nombreSubTipoGasto;
    this.idMovimiento = null;
    this.idMovimientoEP = null;
    this.egreso = null;
    this.ingreso = null;
    this.updateElement = new EventEmitter();
  }

  ngOnInit() {
  }

  MesAprobadas(actual, indice) {
    if (!actual) return false;
    actual = new Date(actual);
    if (!this.flujos[indice - 1]) return true
    if (
      new Date(actual).getMonth() !=
      new Date(this.flujos[indice - 1].fechaPago).getMonth()
    )
      return true;
    else return false;
  }

  Mes(actual: string, array: CuentaCorriente[], indice) {
    const fechaActual = new Date(actual)
    if (!actual || this.esPasado(fechaActual)) return false;
    if (!array[indice - 1] || fechaActual.getMonth() != new Date(array[indice - 1].fechaPago).getMonth()) {
      return true
    }
    else return false;
  }

  esPasado(fecha: Date) {
    const fechaGuardada = new Date(fecha);
    let mesActual = new Date().getMonth();
    let agnoActual = new Date().getFullYear();

    // console.log("Fecha Registro", fecha);
    // console.log(fechaGuardada.getFullYear(), "vs", agnoActual);
    if (fechaGuardada.getFullYear() < agnoActual)
      return true
    if (fechaGuardada.getMonth() < mesActual && fechaGuardada.getFullYear() <= agnoActual)
      return true
    else
      return false
  }

  PopUp(movimiento: CuentaCorriente) {
    switch (movimiento.tipoOC) {
      case this.tiposMovimiento.ordenCompra:
        this.idMovimiento = movimiento.idMovimiento;
        break;
      case this.tiposMovimiento.egreso:
        this.egreso = movimiento.idMovimiento;
        break;
      case this.tiposMovimiento.ingreso:
        this.ingreso = movimiento.idMovimiento;
        break;
      case this.tiposMovimiento.contrato:
        this.ingreso = movimiento.idMovimiento;
        break;
      case this.tiposMovimiento.ordenPedido:
        this.idMovimientoEP = movimiento.idMovimiento
        break;
      default:
        break;
    }
  }

  cargaDatos() {

  }

  update() {
    this.updateElement.emit(true);
  }

}
