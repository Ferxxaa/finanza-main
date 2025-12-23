import { Injectable } from '@angular/core';
import { EstadoPago } from '../../models/nestEstadoPago';

@Injectable()
export class FijarFlujoService {

  estadosPago: EstadoPago[];
  indice: number;
  monto: number;

  constructor() { }

  close() {
    this.estadosPago = null;
    this.indice = null;
    this.monto = null;
  }

  fijarFlujo() {
    const diff = this.estadosPago[this.indice].monto - this.monto;
    this.estadosPago[this.indice].monto = this.monto
    this.estadosPago.push({ ...this.estadosPago[this.indice], monto: diff, numeroPago: null, numeroFactura: null })
  }

}
