import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { comunesFechas } from '../../../share/fechas';
import { sMonto } from '../../../services/sMonto.service';
import { Http, Response } from '@angular/http';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-pop-up-condicion',
  templateUrl: './pop-up-condicion.component.html',
  styleUrls: ['./pop-up-condicion.component.css'],
  providers: [
    comunesFechas,
    sMonto
  ]
})
export class PopUpCondicionComponent implements OnInit {

  @Input() estadosPagos;
  @Input() metodoPago;
  @Input() indice;
  @Input() sobregiro: number;

  @Output() sobregirar = new EventEmitter();
  @Output() anular = new EventEmitter();


  imprimir: boolean;
  estadosPagosPrev: Array<any>;
  GerenteAdmin: boolean;
  // montoOrigen: number;

  constructor(
    private _sComunesFechas: comunesFechas,
    private _sMontoInicial: sMonto,
    private _http: Http
  ) {
    this.imprimir = false;
    this.estadosPagosPrev = [];
    this.GerenteAdmin = false;
  }

  ngOnInit() {
    this.getSubGerente();
    this.estadosPagos.forEach((estadoPago, i) => {
      this._sComunesFechas.DespliegaFecha("#txtCompromiso" + i, estadoPago.fecha);
      estadoPago.monto = Math.round(estadoPago.monto);
    });
    this.copiaEstadoPagoPrev();
    this._sComunesFechas.calendario();
    if (!this.sobregiro) {
      this.sobregiro = 0;
    }
  }

  copiaEstadoPagoPrev(): void {
    this.estadosPagosPrev = [];
    this.estadosPagos.forEach(estadoPago => {
      if (this.estadosPagosPrev.length)
        this.estadosPagosPrev = [...this.estadosPagosPrev, { ...estadoPago }]
      else
        this.estadosPagosPrev = [{ ...estadoPago }]
    });
    // console.log("Estado Pago Prev", this.estadosPagosPrev);

  }

  getSaldosPendientes(indice?: number): Array<any> {
    if (indice >= 0) {
      return this.estadosPagos.filter((estadoPago, i) => (estadoPago.estado < 4 && i != indice && !estadoPago.cheque));
    }
    return this.estadosPagos.filter(estadoPago => (estadoPago.estado < 4 && !estadoPago.cheque));
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
    this.estadosPagos[i].fecha = this._sComunesFechas.getFechaHtmlElement($("#txtCompromiso" + i));
  }

  validaMonto(i: number): void {
    if (this.estadosPagos[i].monto > this.estadosPagosPrev[i].monto) {
      this.montoMayor(i);
    } else {
      // console.log("el valor asignado es menor que el anterior");
      this.montoMenor(i)
    }
  }

  montoMayor(i: number) {
    let faltante = this.getSaldoFaltante(i);
    if (this.saldoDiponible(i) - faltante < 0) {
      // Sobregirar
      // console.log("Sobregirar");
      if (faltante <= this._sMontoInicial.getSobregiro()) {
        this.sobregiro = faltante;
        this.sobregirar.emit({ sobregiro: this.sobregiro });
        // this.estadosPagos[i].monto += faltante;
      }
      else {
        this.sobregiro = this._sMontoInicial.getSobregiro();
        this.sobregirar.emit({ sobregiro: this.sobregiro });
        this.estadosPagos[i].monto = this.estadosPagosPrev[i].monto + this.sobregiro;
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
      this.estadosPagosPrev[i].monto = this.estadosPagos[i].monto;
    }
  }

  montoMenor(i: number) {
    let sobrante: number = this.estadosPagosPrev[i].monto - this.estadosPagos[i].monto;
    let cantEstadosSobrantes: number = this.getSaldosPendientes(i).length;
    if (cantEstadosSobrantes) {
      this.distribuir(i, sobrante)
    } else {
      let newEstado = { ...this.estadosPagos[i] }
      newEstado.monto = sobrante;
      newEstado.numeroPago = null;
      newEstado.factura = null;
      console.log(newEstado.fecha);
      this.estadosPagos.push(newEstado);
      console.log(this.estadosPagos.length);

      this._sComunesFechas.DespliegaFecha("#txtCompromiso" + (this.estadosPagos.length - 1), newEstado.fecha);
      this.copiaEstadoPagoPrev();
      this._sComunesFechas.calendario();
    }
  }

  getSaldoFaltante(indice: number) {
    return this.estadosPagos[indice].monto - this.estadosPagosPrev[indice].monto
  }

  emitido(i) {
    this.estadosPagos[i].cheque = true;
  }

  distribuir(i, sobrante) {
    if (this.getSaldosPendientes(i).length) {
      this.getSaldosPendientes(i).forEach(estadosPendientes => {
        estadosPendientes.monto += sobrante / this.getSaldosPendientes(i).length;;
      });
      // this.estadosPagos[i].monto -= sobrante;
      if (this.estadosPagos[i].monto - sobrante == 0) {
        this.estadosPagos.splice(i, 1);
      }
      this.copiaEstadoPagoPrev();
    } else {
      Swal.fire("Estados de Pago", "No se puede distribuir ya que no existen mas estados de pagos", "error");
    }
  }

  getSubGerente() {
    let usuario
    let urlBase: string = 'http://trazas-nbi.com:1234/api/'
    let controlador: string = 'UsuariosPerfiles/'
    let urlFull: string = urlBase + controlador
    usuario = JSON.parse(localStorage.usuario);
    this._http.get(urlFull + 'GetUsuariosPerfilesByIdUsuario/IdUsuario=' + usuario.idUsuario)
      .map((res: Response) => res.json())
      .subscribe((data: Array<any>) => {
        data.forEach(element => {
          if (element.idPerfil == 11) this.GerenteAdmin = true;
        });
      });
  }

  Pagar(i) {
    this.estadosPagos[i].estado = 4
    let fecha = new Date();
    this.estadosPagos[i].fecha = fecha.getFullYear() + '-' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '-' + fecha.getDate().toString().padStart(2, '0') + 'T00:00:00'
  }

  rechazar(i) {
    this.estadosPagos[i].estado = 5;
    this.anular.emit(this.estadosPagos[i].monto)
  }

  reiniciarEP(i) {
    let EP = this.estadosPagos[i];
    EP.estado = 1;
    this._sComunesFechas.DespliegaFecha("#txtCompromiso" + i, EP.fecha);
    EP.monto = Math.round(EP.monto);
    this._sComunesFechas.calendario();
  }
}
