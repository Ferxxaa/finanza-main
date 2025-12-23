import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { EstadoPago } from '../../../models/nestEstadoPago';
import { FijarFlujoService } from '../../../services/Nest/fijar-flujo.service';
import { estadoPagoService } from '../../../services/sEstadoPagoservice';
import { comunesFechas } from '../../../share/fechas';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-condicion-pop-up',
  templateUrl: './condicion-pop-up.component.html',
  styleUrls: ['./condicion-pop-up.component.css'],
  providers: [
    comunesFechas,
    estadoPagoService
  ]
})
export class CondicionPopUpComponent implements OnInit {

  @Input() estadoPagos: EstadoPago[];
  @Input() tipoMovimiento: number;
  @Output() sobregirar = new EventEmitter();
  @Output() anular = new EventEmitter();
  @Output() update = new EventEmitter();

  estadosPagosPrev: EstadoPago[];

  saldoDiponibleVal: number;
  sobregiro: number;
  GerenteAdmin: boolean;

  // fijarFlujoCheck: boolean;

  constructor(
    private _sComunesFechas: comunesFechas,
    private estadoPagoService: estadoPagoService,
    private fijarFlujoService: FijarFlujoService
  ) {
    // this.fijarFlujoCheck = false;
    this.saldoDiponibleVal = 0;
    this.sobregiro = 0;
    this.GerenteAdmin = false;
  }

  ngOnInit() {
    this.getSubGerente();
    // console.log(this.estadoPagos);
    this.estadoPagos = this.estadoPagos.sort((a, b) => new Date(a.fechaPago) > new Date(b.fechaPago) ? 1 : -1)
    this.estadoPagos.forEach((estadoPago, i) => {
      estadoPago.monto = Math.round(estadoPago.monto);
      this.saldoDiponibleVal += estadoPago.estado != environment.estadoEP.Pagado ? estadoPago.monto : 0;
      // console.log(estadoPago, i);
      // console.log(estadoPago.fechaPago);

      this._sComunesFechas.DespliegaFechaDateUTC("#txtCompromiso" + i, estadoPago.fechaPago);
    });
    this.copiaEstadoPagoPrev();
    this._sComunesFechas.calendario();
    if (!this.sobregiro) {
      this.sobregiro = 0;
    }
  }

  copiaEstadoPagoPrev(): void {
    this.estadosPagosPrev = [];
    this.estadoPagos.forEach((EP: EstadoPago) => {
      if (this.estadosPagosPrev.length)
        this.estadosPagosPrev = [...this.estadosPagosPrev, { ...EP }]
      else
        this.estadosPagosPrev = [{ ...EP }]
    });
    // console.log("Estado Pago Prev", this.estadosPagosPrev);

  }

  setFechaEP(index: number) {
    this.estadoPagos[index].fechaPago = new Date(this._sComunesFechas.getFechaHtmlElement($('#txtCompromiso' + index)))
  }

  getSaldosPendientes(indice?: number): Array<any> {
    if (indice >= 0) {
      return this.estadoPagos.filter((estadoPago, i) => (estadoPago.estado < 4 && i != indice && !estadoPago.cheque));
    }
    return this.estadoPagos.filter(estadoPago => (estadoPago.estado < 4 && !estadoPago.cheque));
  }

  saldoDiponible(i?: number): number {
    let total = 0;
    if (i >= 0) {
      this.getSaldosPendientes(i).forEach(estadoPago => {
        total += estadoPago.monto;
      });
    } else {
      this.getSaldosPendientes().forEach(estadoPago => {
        total += estadoPago.monto;
      });
    }
    return total
  }

  AsignaFechaCompromiso(i): void {
    this.estadoPagos[i].fechaPago = new Date(this._sComunesFechas.getFechaHtmlElement($("#txtCompromiso" + i)));
  }

  validaMonto(i: number): void {
    if (this.tipoMovimiento) {
      if (this.estadoPagos[i].monto > this.estadosPagosPrev[i].monto) {
        this.montoMayor(i);
      } else {
        // console.log("el valor asignado es menor que el anterior");
        this.montoMenor(i)
      }
    }
  }

  montoMayor(i: number) {
    let faltante = this.getSaldoFaltante(i);
    if (this.saldoDiponible(i) - faltante < 0) {
      // Sobregirar
      // console.log("Sobregirar");
      if (faltante <= 10000) {
        this.sobregiro = faltante;
        this.sobregirar.emit({ sobregiro: this.sobregiro });
        // this.estadosPagos[i].monto += faltante;
      }
      else {
        this.sobregiro = 10000;
        this.sobregirar.emit({ sobregiro: this.sobregiro });
        this.estadoPagos[i].monto = this.estadosPagosPrev[i].monto + this.sobregiro;
      }
      // console.log("Saldo Disponible: ", this.saldoDiponible(i));
      // console.log("El monto excedente es de: ", faltante);
      // console.log("Sobre giro Actual", this.sobregiro);
      // console.log("Sobre giro maximo", this._sMontoInicial.getSobregiro());
    } else {
      // this._sMontoInicial.getSobregiro()
      this.getSaldosPendientes(i).forEach(estadosPagosPendiente => {
        if (estadosPagosPendiente.monto < faltante) {
          faltante -= estadosPagosPendiente.monto
          estadosPagosPendiente.monto = 0
        } else {
          estadosPagosPendiente.monto -= faltante
          faltante = 0;
        }

      });
      this.estadosPagosPrev[i].monto = this.estadoPagos[i].monto;
    }
  }

  montoMenor(i: number) {
    let sobrante: number = this.estadosPagosPrev[i].monto - this.estadoPagos[i].monto;
    let cantEstadosSobrantes: number = this.getSaldosPendientes(i).length;
    if (cantEstadosSobrantes) {
      this.distribuir(i, sobrante)
    } else {
      let newEstado = { ...this.estadoPagos[i] }
      newEstado.monto = sobrante;
      newEstado.numeroPago = null;
      newEstado.numeroFactura = null;
      // console.log(newEstado.fecha);
      this.estadoPagos.push(newEstado);
      // console.log(this.estadoPagos.length);

      this._sComunesFechas.DespliegaFechaDate("#txtCompromiso" + (this.estadoPagos.length - 1), newEstado.fechaPago);
      this.copiaEstadoPagoPrev();
      this._sComunesFechas.calendario();
    }
  }

  getSaldoFaltante(indice: number) {
    return this.estadoPagos[indice].monto - this.estadosPagosPrev[indice].monto
  }

  emitido(i) {
    this.estadoPagos[i].cheque = true;
  }

  display(index: number) {
    const close = $('.block');
    const display = $('#display' + index);
    let isactive: boolean = false;
    if (display.hasClass("block"))
      isactive = true;
    close.removeClass('block');
    // console.log(display);
    if (isactive)
      display.removeClass('block')
    else
      display.addClass('block');
  }

  distribuir(i, sobrante) {
    $('.block').removeClass('block');
    if (this.getSaldosPendientes(i).length) {
      this.getSaldosPendientes(i).forEach(estadosPendientes => {
        estadosPendientes.monto += sobrante / this.getSaldosPendientes(i).length;;
      });
      // this.estadosPagos[i].monto -= sobrante;
      if (this.estadoPagos[i].monto - sobrante == 0) {
        this.estadoPagos.splice(i, 1);
      }
      this.copiaEstadoPagoPrev();
    } else {
      Swal.fire("Estados de Pago", "No se puede distribuir ya que no existen mas estados de pagos", "error");
    }
  }

  fijarFlujo(i) {
    // this.fijarFlujoCheck = true;
    this.display(i);
    this.fijarFlujoService.indice = i;
    this.fijarFlujoService.estadosPago = this.estadoPagos;
    this.fijarFlujoService.monto = this.estadoPagos[i].monto;
  }

  getSubGerente() {
    if (localStorage.hasOwnProperty('perfiles')) {
      const perfilesConfig = environment.perfiles;
      const perfiles: number[] = JSON.parse(localStorage.perfiles).map(el => el.idPerfil);
      this.GerenteAdmin = perfiles.includes(perfilesConfig.gerenteAdmin || perfilesConfig.sistema || perfilesConfig.subgerente);
      // console.log(this.GerenteAdmin, perfiles);
    }
  }

  Pagar(i) {
    $('.block').removeClass('block');
    this.estadoPagos[i].estado = 4
    let fecha = new Date();
    this.estadoPagos[i].fechaPago = new Date(fecha.getFullYear() + '-' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '-' + fecha.getDate().toString().padStart(2, '0') + 'T00:00:00');
  }

  rechazar(i) {
    $('.block').removeClass('block');
    this.estadoPagos[i].estado = 5;
    this.anular.emit(this.estadoPagos[i].monto)
  }

  reiniciarEP(i) {
    let EP = this.estadoPagos[i];
    EP.estado = 1;
    this._sComunesFechas.DespliegaFechaDateAdd1("#txtCompromiso" + i, EP.fechaPago);
    EP.monto = Math.round(EP.monto);
    this._sComunesFechas.calendario();
  }

  updateEP() {
    // console.log(this.estadoPagos);
    this.estadoPagoService.updateEstadoPago(this.estadoPagos).subscribe(res => {
      // console.log(res)
      this.update.emit();
    });
  }

}
