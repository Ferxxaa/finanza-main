import { Component, OnInit } from '@angular/core';

//Modelos
// import { mProveedor } from '../../models/mProveedor';
import { mCentroCosto } from '../../../models/mCentroCosto';
import { mGastos } from '../../../models/mGastos';
import { mOrdenCompra } from '../../../models/mOrdenCompra';

//Servicios
// import { sProveedor } from '../../services/sProveedor.service';
import { sCentroCosto } from '../../../services/sCentroCosto.service';
import { sGastos } from '../../../services/sGastos.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { comunesFechas } from '../../../share/fechas';


declare var jQuery: any;
declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css'],
  providers: [
    sCentroCosto,
    sGastos,
    sOrdenComra,
    comunesFechas
  ]
})
export class IngresoEgresoComponent implements OnInit {

  ordenCompra: any;
  item: any;
  // periodicidad: any;
  folio: string;

  //Select
  TiposGastos: Array<mGastos>;

  //EstadosPago
  cantEstadosPago: number;

  constructor(
    private _sOrdenComra: sOrdenComra,
    private _sGastos: sGastos,
    private _sCentroCosto: sCentroCosto,
    private _sComunesFechas: comunesFechas
  ) {
    // this.periodicidad = { activo: false, propperiodicidad: 'Cada', dias: 1, termino: null };
    // console.log(this.periodicidad.propperiodicidad);
    this.limpiar();
  }

  limpiar() {
    this.item = { codigo: null, detalle: null, cantidad: 1, declaracion: null, moneda: 'CLP', precioUnitario: null };
    this.ordenCompra = { _id: null, folio: null, proveedor: { nombre: null, direccion: null, rutProveedor: null, telefono: null, contacto: null, mail: null }, centroCosto: { _id: 0 }, subCentroCosto: "0", tipoGasto: { _id: 0 }, subTipoGasto: "0", metodoPago: "0", Items: [], estadosPagos: [{ opcion: "7", fecha: null, monto: null, metodoPago: 0, estado: 1 }], solicita: null, descripcion: null, despacho: null, usuarioCreador: null, usuarioAprovador: null, evaluacion: null, observacionCantidad: null, observacionCalidad: null, Estado: 2, fechaCreacion: null, cotizacion: null, prioridad: null, iva: 0, boleta: 0, correo: false, ingresoEgreso: null, motivo: null, condicionPago: null, chequeEmitido: false, sobregiro: 0 };
    this.cantEstadosPago = 1;
    this._sGastos.getGastos().subscribe(res => {
      this.TiposGastos = res;
    });
    this.AsignaCentroCosto();
  }

  ngOnInit() {
    console.clear();
    this._sComunesFechas.calendario();
  }

  AsignaCentroCosto() {
    this.ordenCompra.centroCosto.subCentroCosto = [];
    this._sCentroCosto.getCentroCosto().subscribe(res => {
      this.ordenCompra.subCentroCosto = "0";
      res.forEach(centrosCosto => {
        centrosCosto.subCentroCosto.filter(el => el.activo).forEach(subCentros => {
          this.ordenCompra.centroCosto.subCentroCosto.push(subCentros);
        });
      });
    });
  }

  AsignaTipoGasto() {
    if (this.ordenCompra.tipoGasto._id && this.ordenCompra.tipoGasto._id != "0") {
      this.ordenCompra.tipoGasto.subTipoGasto = [];
      this._sGastos.getGastosbyID(this.ordenCompra.tipoGasto._id).subscribe(res => {
        this.ordenCompra.tipoGasto = res;
        this.ordenCompra.subTipoGasto = "0";
      });
    }
  }

  agregaEstadosPago() {
    if (this.cantEstadosPago < this.ordenCompra.estadosPagos.length) {
      this.ordenCompra.estadosPagos.splice(this.cantEstadosPago);
    } else {
      for (let i = this.ordenCompra.estadosPagos.length; i < this.cantEstadosPago; i++) {
        this.ordenCompra.estadosPagos.push({ opcion: "7", fecha: null, monto: this.ordenCompra.estadosPagos[i - 1].monto, metodoPago: 0, estado: 1 });
        if (this.ordenCompra.estadosPagos[i - 1] && this.ordenCompra.estadosPagos[i - 1].fecha) {
          let lastFecha = new Date(this.ordenCompra.estadosPagos[i - 1].fecha);
          this.ordenCompra.estadosPagos[i].fecha = this._sComunesFechas.cortaFecha(lastFecha);
          this._sComunesFechas.DespliegaFecha("#txtFechaPago" + i, this.ordenCompra.estadosPagos[i].fecha);
        }
      }
    }
    // console.log(this.ordenCompra);
    this._sComunesFechas.calendario();
  }

  asignaFechaPago(i: number) {
    this.ordenCompra.estadosPagos[i].fecha = this._sComunesFechas.retFechaParaGuardar($("#txtFechaPago" + i).val());
  }

  retTotal(): number {
    let total = 0
    this.ordenCompra.estadosPagos.forEach(estadoPago => {
      total += estadoPago.monto;
    });
    return total
  }

  quitaVacios() {
    this.ordenCompra.estadosPagos.forEach((estadoPago, i) => {
      if ((!estadoPago.fecha || !estadoPago.monto) && this.ordenCompra.estadosPagos.lengt > 1)
        this.ordenCompra.estadosPagos.splice(i, 1);
    });
  }

  valida(): boolean {
    if (!this.ordenCompra.estadosPagos.length) {
      this.error("Debe poseer al menos 1 estado de pago Valido");
      return false
    }
    if (this.retTotal() < 1) {
      this.error("El ingreso/egreso no puede ser por un monto de 0 o menor");
      return false
    }
    if (!this.ordenCompra.ingresoEgreso) {
      this.error("Debe seleccionar si es un Ingreso o un Egreso");
      return false
    }
    if (!this.ordenCompra.descripcion) {
      this.error("Debe escribir una descripción")
      return false
    }

    return true
  }

  error(mensaje: string) {
    Swal.fire(
      "Ingreso/Egreso",
      mensaje,
      "error"
    );
  }

  /* ******************************* CRUD ******************************* */

  guardar() {
    this.item.detalle = this.ordenCompra.descripcion
    this.ordenCompra.Items = this.item;
    this.quitaVacios();
    if (this.valida()) {
      this.ordenCompra.Items.precioUnitario = this.retTotal();
      this._sOrdenComra.postOrdenCompra(this.ordenCompra).subscribe(res => {
        console.log(res);
        Swal.fire(
          "Ingreso/Egreso",
          "Se ha creado de forma correcta el Ingreso/Egreso",
          "success"
        );
        this.limpiar();
      });
    }
  }

}
