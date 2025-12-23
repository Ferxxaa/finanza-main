import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { mOrdenPedido } from '../../../models/mOrdenPedido';
import { mOrdenCompra } from '../../../models/mOrdenCompra';
import { sOrdenPedido } from '../../../services/sOrdenPedido.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { sBolsas } from '../../../services/sBolsas.service';
import { mBolsa } from '../../../models/mBolsa';

declare var Swal: any;

interface pago {
  fechaPago: string;
  monto: number;
  gastado: number;
}

@Component({
  selector: 'popUp-orden-pedido',
  templateUrl: './orden-pedido.component.html',
  styleUrls: ['./orden-pedido.component.css'],
  providers: [
    sOrdenPedido,
    sOrdenComra,
    sBolsas
  ]
})
export class PopUpOrdenPedidoComponent implements OnInit {

  @Input() id: string;
  @Output() actualizar = new EventEmitter();
  @Output() cerrar = new EventEmitter();

  ordenPedido: mOrdenPedido;
  ordenCompra: mOrdenCompra;

  bolsa: mBolsa;
  pago: pago;
  saldoSumar: number;

  constructor(
    private _sOrdenPedido: sOrdenPedido,
    private _sOrdenCompra: sOrdenComra,
    private _sBolsas: sBolsas
  ) { }

  ngOnInit() {
    console.clear()
    this.getOrdenPedido();
    // console.log(this.ordenPedido);

  }

  private getOrdenPedido() {
    this._sOrdenPedido.getOrdenPedidobyID(this.id).subscribe(OP => {
      this.ordenPedido = OP;
      // console.log(OP);

      this._sOrdenCompra.getOrdenComprabyID(OP.idOrdenCompra).subscribe(OC => {
        this.ordenCompra = OC;
      });
    },
      error => {
        Swal.fire("Centro de Pedido", "ha ocurrido un error: " + error, "error");
        this.Cerrar();
      });
  }

  setEstadoAEstadosPago(estadosPago: Array<any>) {
    estadosPago.forEach(estadoPago => {
      if ((estadoPago.estado < 2 && estadoPago.numeroPago) || estadoPago.metodoPago == 2) {
        estadoPago.estado = 2;
      }
      if (estadoPago.estado < 3 && estadoPago.factura) {
        estadoPago.estado = 3;
      }
    });
  }

  private getBolsa(oc: mOrdenCompra | mOrdenPedido) {
    this._sBolsas.getBolsas().subscribe(bolsas => {
      this.bolsa = bolsas.find(bolsa => bolsa.subCentroCosto.nombre == oc.subCentroCosto && bolsa.tipoGasto.includes(oc.tipoGasto.nombre)) ? bolsas.find(bolsa => bolsa.subCentroCosto.nombre == oc.subCentroCosto && bolsa.tipoGasto.includes(oc.tipoGasto.nombre)) : this.bolsa;
      if (this.bolsa)
        this.pago = this.bolsa ? this.bolsa.pagos.find(pago => pago.monto > 0) ? this.bolsa.pagos.find(pago => pago.monto > 0) : this.bolsa.pagos[bolsas.pagos.length - 1] : null;
      // console.log("Bolsa:", this.bolsa);
      // console.log("Pago de la bolsa:", this.pago)
    });
  }

  devolverSaldoOC(monto: number) {
    if (this.pago)
      this.pago.gastado -= monto;
    let EP: any[] = this.ordenCompra.estadosPagos
    let divisor = EP.filter(el => el.estado <= 3).length
    this.ordenCompra.estadosPagos = EP.map(el => {
      if (el.estado <= 3)
        return { ...el, monto: el.monto + (monto / divisor) }
      return { ...el }
    });
  }

  guardar() {
    this.setEstadoAEstadosPago(this.ordenPedido.estadosPagos);
    // console.log(this.ordenPedido);
    this._sOrdenPedido.putOrdenPedido(this.ordenPedido)
      .subscribe(OP => {
        this.actualizar.emit();
        Swal.fire("Centro de Pedido", "Se ha actualizado de forma correcta la orden de pedido", "success");
        this.Cerrar();
      });
    // this._sBolsas.putBolsa(this.bolsa).subscribe(res => console.log(res));
    this._sOrdenCompra.putOrdenCompra(this.ordenCompra).subscribe(el => console.log(el));
  }

  cambiarTipo(e) {
    this.ordenPedido.tipoGasto = e;
  }

  cambiarSubTipo(e) {
    this.ordenPedido.subTipoGasto = e;
  }

  OpSobregirar(e) {
    console.log("se realiza sobregiro por: ", e);

    this.ordenPedido.sobregiro = e.sobregiro;
  }

  Cerrar() {
    this.cerrar.emit();
  }

}
