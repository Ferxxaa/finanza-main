import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { mOrdenCompra } from '../../../models/mOrdenCompra';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { comunesFechas } from '../../../share/fechas';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-pop-up-directos',
  templateUrl: './pop-up-directos.component.html',
  styleUrls: ['./pop-up-directos.component.css'],
  providers: [sOrdenComra]
})
export class PopUpDirectosComponent implements OnInit {

  @Input() id: string;
  @Output() actualizar = new EventEmitter();
  @Output() cerrar = new EventEmitter();

  ordenCompra: mOrdenCompra;
  exenta: boolean

  totalOc: number;

  constructor(
    private _sOrdenCompra: sOrdenComra,
    private _sComunesFechas: comunesFechas
  ) {
    this.exenta = false;
    this.totalOc = 0;
  }

  ngOnInit() {
    this.getOc(this.id);
    this._sComunesFechas.calendario();
  }

  getOc(id: string) {
    this._sOrdenCompra.getOrdenComprabyID(id).subscribe(OC => {
      // console.log(OC);
      this.ordenCompra = OC;
      this.asignaFechas(this.ordenCompra.estadosPagos);
      this.totalOc = this.ordenCompra.estadosPagos.reduce((acc, el) => acc + el.monto, 0);
    });
  }

  asignaFechas(estadosPago: Array<any>) {
    estadosPago.forEach((estadoPago, i) => {
      this._sComunesFechas.DespliegaFecha("#txtCompromiso" + i, estadoPago.fecha)
    });
  }

  AsignaFechaCompromiso(i) {
    let fecha: string = $('#txtCompromiso' + i).val();
    this.ordenCompra.estadosPagos[i].fecha = this._sComunesFechas.retFechaParaGuardar(fecha)
  }

  cambiarTipo(e) {
    this.ordenCompra.tipoGasto = e;
  }

  cambiarSubTipo(e) {
    this.ordenCompra.subTipoGasto = e;
  }

  emitido(i) {
    this.ordenCompra.estadosPagos[i].cheque = true;
  }

  Pagar(i) {
    this.ordenCompra.estadosPagos[i].estado = 4
  }

  rechazar(i) {
    this.ordenCompra.estadosPagos[i].estado = 5
  }

  Cerrar() {
    this.cerrar.emit();
  }

  addFecha(ep) {
    // console.log(ep);
    ep.fechaEmisionFactura = new Date().getFullYear() + "-" + (new Date().getMonth() + 1).toString().padStart(2, "0") + "-" + new Date().getDate().toString().padStart(2, "0") + 'T00:00:00';
    // console.log(ep);
  }

  /************************************ CRUD **************************************/
  guardar() {

    if (this.exenta)
      this.ordenCompra.afecta = false;
    else
      this.ordenCompra.afecta = true;

    // console.log(this.ordenCompra);

    this._sOrdenCompra.putOrdenCompra(this.ordenCompra).subscribe(OC => {
      this.actualizar.emit();
      if (this.ordenCompra.ingresoEgreso == 1)
        Swal.fire("Egreso", "Se ha actualizado de forma correcta el Egreso", "success");
      else
        Swal.fire("Ingreso", "Se ha actualizado de forma correcta el Ingreso", "success");
      this.Cerrar();
    });
  }
}
