import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EstadoPago } from '../../../models/nestEstadoPago';
import { estadoPagoService } from '../../../services/sEstadoPagoservice';

declare var $: any;

@Component({
  selector: 'app-rad-estado-pago',
  templateUrl: './rad-estado-pago.component.html',
  styleUrls: ['./rad-estado-pago.component.css'],
  providers: [
    estadoPagoService
  ]
})
export class RadEstadoPagoComponent implements OnInit, OnChanges {

  @Input() estadoPago: EstadoPago[];
  @Input() total: number;
  @Input() metodoPago: number;
  @Output() emitCondicion = new EventEmitter<string>()
  @Output() emitEP = new EventEmitter<EstadoPago[]>()
  opcion: number;
  cantidadEstadosPago: number;
  condicionPago: string;

  constructor(
    private estadoPagoService: estadoPagoService
  ) {
    this.cantidadEstadosPago = 1;
    this.opcion = null;
  }

  ngOnInit() {
    // console.log(this.estadoPago);
    this.setFechaEstadosPago(0, 2)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setMetodoPago();
  }

  calendario() {
    $(".date").datetimepicker({ format: "DD/MM/YYYY" });
  }

  AgregarEstadosPago() {
    // this.estadosPagos = [{ opcion: '7', fecha: null }];
    if (this.estadoPago.length < this.cantidadEstadosPago)
      for (
        let i = this.estadoPago.length - 1;
        i < this.cantidadEstadosPago - 1;
        i++
      ) {
        this.opcion = 7;
        this.estadoPago.push({ ...this.estadoPagoService.retNewEp(), metodoPago: this.metodoPago });
      }
    else {
      this.estadoPago.splice(this.cantidadEstadosPago);
    }

    // this.ordenCompra.estadosPagos = this.estadosPagos;
    let origin = this;
    setTimeout(() => {
      $("[name='txtEstadoPagoMonto']").each(function () {
        this.value = 100 / origin.cantidadEstadosPago;
      });
      this.calendario();
      this.cambiaTodosMontos();
      // this.setValEp();
    }, 300);
  }

  setFechaEstadosPago(indice: number, opcion: number) {
    switch (opcion) {
      case 1:
        this.opcion = 1;
        this.estadoPago = [this.estadoPagoService.retNewEp()];
        this.estadoPago[indice].fechaPago = new Date();
        this.estadoPago[indice].monto = this.total;
        // this.ordenCompra.estadosPagos = this.estadosPagos;
        this.condicionPago = 'Contado';
        break;
      case 2:
        this.opcion = 2;
        this.estadoPago = [this.estadoPagoService.retNewEp()];
        this.estadoPago[indice].fechaPago = this.addDays(30);
        this.estadoPago[indice].monto = this.total;
        // this.ordenCompra.estadosPagos = this.estadosPagos;
        this.condicionPago = 'Credito 30 Dias';
        break;
      case 3:
        this.opcion = 3;
        this.estadoPago = [this.estadoPagoService.retNewEp()];
        this.estadoPago[indice].fechaPago = this.addDays(45);
        this.estadoPago[indice].monto = this.total;
        // this.ordenCompra.estadosPagos = this.estadosPagos;
        this.condicionPago = 'Credito 45 Dias';
        break;
      case 4:
        this.opcion = 4;
        this.estadoPago = [this.estadoPagoService.retNewEp()];
        this.estadoPago[indice].fechaPago = this.addDays(60);
        this.estadoPago[indice].monto = this.total;
        // this.ordenCompra.estadosPagos = this.estadosPagos;
        this.condicionPago = 'Credito 60 Dias';
        break;
      case 5:
        this.opcion = 5;
        this.estadoPago = [this.estadoPagoService.retNewEp()];
        this.estadoPago[indice].fechaPago = this.addDays(90);
        this.estadoPago[indice].monto = this.total;
        // this.ordenCompra.estadosPagos = this.estadosPagos;
        this.condicionPago = 'Credito 90 Dias';
        break;
      case 6:
        this.opcion = 6;
        this.estadoPago = [this.estadoPagoService.retNewEp()];
        this.estadoPago[indice].monto = this.total;
        // this.ordenCompra.estadosPagos = this.estadosPagos;
        setTimeout(() => {
          this.calendario();
        }, 1000);
        this.condicionPago = 'A Convenir';
        break;
      case 7:
        this.cantidadEstadosPago = 1;
        this.estadoPago[indice].fechaPago = null;
        this.opcion = 7;
        this.estadoPago = [this.estadoPagoService.retNewEp()];
        this.estadoPago.forEach(el => {
          el.monto = this.total / this.cantidadEstadosPago;
        })
        setTimeout(() => {
          this.calendario();
          $("[name='txtEstadoPagoMonto']")[0].value = 100;
          this.cambiaTodosMontos();
          // this.setValEp();
        }, 300);
        this.condicionPago = 'Estados de Pago';
        break;
    }
    // console.log(this.estadoPago);
    this.setMetodoPago();
    this.estadoPago[indice].monto = this.total;
    this.emitEP.emit(this.estadoPago)
    this.emitCondicion.emit(this.condicionPago);
  }

  setMetodoPago() {
    this.estadoPago.forEach(el => {
      el.metodoPago = this.metodoPago;
    })
  }

  setCondicion() {

    this.emitCondicion.emit(this.condicionPago);
  }

  addDays(dias: number): Date {
    let fecha: Date;
    fecha = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * dias);
    return fecha;
  }

  cambiaTodosMontos() {
    let indice = 0;
    let origin = this;
    $("[name='txtEstadoPagoMonto']").each(function () {
      origin.estadoPago[indice].monto = (origin.total * this.value) / 100;
      indice++;
    });
  }

  AsignaFechaEstadosPago(nombre: string, indice: number = 0) {
    // console.log("entre!" + indice);
    let nombreElement: string;
    if (nombre == 'txtConvenir')
      nombreElement = '#' + nombre
    else
      nombreElement = '#' + nombre + indice
    let dia = $(nombreElement)
      .val()
      .split("/")[0];
    let mes = $(nombreElement)
      .val()
      .split("/")[1];
    let agno = $(nombreElement)
      .val()
      .split("/")[2];
    // if (indice)
    //   indice = 0;
    this.estadoPago[indice].fechaPago =
      new Date(agno + "-" + mes + "-" + dia + "T00:00:00");
    // this.ordenCompra.estadosPagos = this.estadosPagos;
  }

  cambiaMonto(valor, indice) {
    this.estadoPago[indice].monto = (this.total * valor) / 100;
  }

}
