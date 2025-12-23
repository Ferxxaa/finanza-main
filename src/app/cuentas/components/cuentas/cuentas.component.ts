import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

import { mCuentas } from '../../../models/mCuentas';
import { sCuentas } from '../../../services/sCuentas.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css'],
  providers: [
    sCuentas
  ]
})
export class CuentasComponent implements OnInit {

  cuentas: Array<mCuentas>;
  cuenta: mCuentas;
  eCuenta: mCuentas;

  indexEdit: number;

  total: number;

  //Totales
  totalDisponible: number;
  totalUtilizado: number;
  totalSaldo: number;

  constructor(
    private _sCuentas: sCuentas
  ) {
    this.Limpiar();
  }

  Limpiar() {
    this.total = 0;
    this.totalDisponible = 0;
    this.totalUtilizado = 0;
    this.totalSaldo = 0;
    this.cuenta = { _id: null, nombre: null, rut: null, razonSocial: null, montoDisponible: null, montoUtilizado: null, saldo: null, fechaCreacion: null };
    this.eCuenta = { _id: '', nombre: '', rut: '', razonSocial: '', montoDisponible: null, montoUtilizado: null, saldo: null, fechaCreacion: null };
  }

  ngOnInit() {
    console.clear();
    $('.rut').mask('09.000.000-K', { translation: { 'K': { pattern: /[k0-9]/, optional: false } } });
    this._sCuentas.getCuentas().subscribe(res => {
      this.cuentas = res;
      this.calculaTotales();
    });
  }

  retTotalCuentas(cuentas) {
    let total = 0;
    cuentas.forEach(element => {
      total += element.saldo - element.montoUtilizado;
    });
    return total;
  }

  retTotalMontos(cuentas) {
    return cuentas.reduce((acc, el) => acc + el.saldo + el.montoDisponible - el.montoUtilizado, 0);
  }

  calculaTotales() {
    this.cuentas.forEach(el => {
      this.totalDisponible += el.montoDisponible
      this.totalUtilizado += el.montoUtilizado
      this.totalSaldo += el.saldo
    });
  }

  muestraTotal() {
    this.total = 0;
    // this.total += this.cuenta.montoDisponible ? this.cuenta.montoDisponible : 0;
    this.total -= this.cuenta.montoUtilizado ? this.cuenta.montoUtilizado : 0;
    this.total += this.cuenta.saldo ? this.cuenta.saldo : 0;
  }

  retTotal(saldo, utilizado) {
    let totalcuenta = 0;
    totalcuenta += saldo ? saldo : 0;
    totalcuenta -= utilizado ? utilizado : 0;
    return totalcuenta;
  }

  popUp(i) {
    // console.log(this.cuentas[i]);
    // console.log(this.cuentas[i].nombre);
    this.indexEdit = i;
    this.eCuenta._id = this.cuentas[i]._id;
    this.eCuenta.nombre = this.cuentas[i].nombre;
    this.eCuenta.rut = this.cuentas[i].rut;
    this.eCuenta.razonSocial = this.cuentas[i].razonSocial;
    this.eCuenta.montoDisponible = this.cuentas[i].montoDisponible;
    this.eCuenta.montoUtilizado = this.cuentas[i].montoUtilizado;
    this.eCuenta.saldo = this.cuentas[i].saldo;
    this.eCuenta.fechaCreacion = this.cuentas[i].fechaCreacion;
  }

  /********************************* CRUD  *********************************/

  Agregar() {

    if (this.ValidaDatos()) {
      !this.cuenta.montoDisponible ? this.cuenta.montoDisponible = 0 : this.cuenta.montoDisponible = this.cuenta.montoDisponible;
      !this.cuenta.montoUtilizado ? this.cuenta.montoDisponible = 0 : this.cuenta.montoDisponible = this.cuenta.montoUtilizado;
      this._sCuentas.postCuentas(this.cuenta).subscribe(res => {
        this.ngOnInit();
        this.Limpiar();
        Swal.fire(
          'Cuentas de Banco',
          'Se ha creado correctamente la cuenta',
          'success'
        );
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Cuentas de Banco',
        text: 'Debe completar todos los datos'
      })
    }
  }

  ValidaDatos(): Boolean {
    if (!this.cuenta.nombre)
      return false;
    if (!this.cuenta.rut)
      return false;
    if (!this.cuenta.razonSocial)
      return false;
    if (!this.cuenta.saldo)
      return false;
    return true;
  }

  Actualizar() {
    if (this.ValidaDatosEdit())
      this._sCuentas.putCuentas(this.eCuenta).subscribe(res => {
        this.cuentas[this.indexEdit] = res;
        this.Limpiar();
        Swal.fire(
          'Cuentas de Banco',
          'Se ha actualizado correctamente la cuenta',
          'success'
        );
      });
  }

  ValidaDatosEdit(): Boolean {
    let bol = true;

    !this.eCuenta.nombre ? bol = false : bol = bol;
    !this.eCuenta.rut ? bol = false : bol = bol;
    !this.eCuenta.razonSocial ? bol = false : bol = bol;
    !this.eCuenta.montoDisponible == null ? bol = false : bol = bol;
    !this.eCuenta.montoUtilizado == null ? bol = false : bol = bol;
    !this.eCuenta.saldo == null ? bol = false : bol = bol;

    return bol;
  }

  Eliminar() {
    const self = this
    Swal.fire({
      title: 'Cuenta de Banco',
      text: "¿Esta seguro de eliminar la cuenta de banco?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value)
        self.Eliminando();
    })
  }

  Eliminando() {
    this._sCuentas.deleteCuentas(this.eCuenta).subscribe(res => {
      this.cuentas.splice(this.indexEdit, 1);
      this.Limpiar();
      Swal.fire(
        'Cuenta de Banco',
        'Se ha eliminado correctamente la cuenta',
        'success'
      )
    });
  }

}
