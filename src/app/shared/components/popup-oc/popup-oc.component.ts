import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { estadoPago, mOrdenCompra } from '../../../models/mOrdenCompra';
import { mOrdenPedido } from '../../../models/mOrdenPedido';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { sCotizacion } from '../../../services/sCotizacion.service';
import { sOrdenPedido } from '../../../services/sOrdenPedido.service';
import { sBolsas } from '../../../services/sBolsas.service';
import { mBolsa } from '../../../models/mBolsa';

declare var Swal: any;

interface pago {
  fechaPago: string;
  monto: number;
  gastado: number;
}

@Component({
  selector: 'app-popup-oc',
  templateUrl: './popup-oc.component.html',
  styleUrls: ['./../orden-pedido/orden-pedido.component.css'],
  providers: [
    sOrdenComra,
    sCotizacion,
    sBolsas
  ]
})
export class PopupOcComponent implements OnInit {

  @Input() id: string;
  @Output() actualizar = new EventEmitter;
  @Output() cerrar = new EventEmitter();

  url: string;

  ordenCompra: mOrdenCompra;
  ordenesPedido: mOrdenPedido;
  bolsa: mBolsa;
  adjunto: any;
  bolAnular: boolean;

  pago: pago;
  saldoSumar: number;

  constructor(
    private _sOrdenCompra: sOrdenComra,
    private _sCotizacion: sCotizacion,
    private _sOrdenPedido: sOrdenPedido,
    private _sBolsas: sBolsas
  ) {
    this.url = environment.node + "adjuntar/";
    this.bolAnular = false;
    this.bolsa = null;
    this.saldoSumar = 0;
  }

  ngOnInit() {
    console.clear();
    this.getOC(this.id);
    this.getOp(this.id);
  }

  getOC(id): void {
    this._sOrdenCompra.getOrdenComprabyID(id).subscribe(OC => {
      // console.log(OC);
      this.ordenCompra = OC
      if (this.ordenCompra)
        this.getBolsa(OC);
    },
      error => {
        this.Cerrar();
      });
    this.getAnulable(id);
  }

  getOp(id) {
    this._sOrdenPedido.getOrdenPedidobyOrdenCompra(id).subscribe(OP => {
      this.ordenesPedido = OP;
      if (this.ordenesPedido)
        this.getBolsa(OP);
    });
  }

  getAnulable(id) {
    this._sOrdenCompra.getOrdenCompraAnulable(id).subscribe(res => {
      this.bolAnular = res.anulable;
    });
  }

  setEstadoAEstadosPago(estadosPago: Array<any>) {  
    estadosPago.forEach(estadoPago => {
      if ((estadoPago.estado < 2 && estadoPago.numeroPago) || (estadoPago.metodoPago == 2 && estadoPago.estado < 4)) {
        estadoPago.estado = 2;
      }
      if (estadoPago.estado < 3 && estadoPago.factura) {
        estadoPago.estado = 3;
      }
    });
  }

  cambiarTipo(e) {
    this.ordenCompra.tipoGasto = e;
  }

  cambiarSubTipo(e) {
    this.ordenCompra.subTipoGasto = e;
  }

  OcSobregirar(e) {
    // console.log("se realiza sobregiro por: ", e);
    this.ordenCompra.sobregiro = e.sobregiro;
  }

  anular() {
    // console.log(this.ordenCompra);
    let self = this;
    Swal.fire({
      title: "Anular Orden de compra",
      text: "¿Esta seguro de anular la Orden de compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.value)
        self.anulando();
    });
  }

  private anulando() {
    this.ordenCompra.Estado = 5;
    this.anularEP(this.ordenCompra.estadosPagos);
    let totalRestaurar: number = this.ordenCompra.estadosPagos.filter((el: estadoPago) => el.estado < 4).reduce((acc, el: estadoPago) => acc + el.monto, 0)
    this.sumaSaldaoBolsa(totalRestaurar);
    this._sOrdenCompra.putOrdenCompra(this.ordenCompra).subscribe(ordenCompra => {
      this.actualizar.emit();
      Swal.fire("Centro de Costo", "Se ha actualizado de forma correcta el Centro de costo", "success");
      this.Cerrar();
    });
    this._sBolsas.putBolsa(this.bolsa).subscribe(res => console.log(res));
  }

  private anularEP(estadosPagos: any[]) {
    estadosPagos = estadosPagos.map(EP => EP.estado = 5);
  }

  private getBolsa(oc: mOrdenCompra | mOrdenPedido) {
    if (oc && oc.estadosPagos)
      this._sBolsas.getBolsas().subscribe(bolsas => {
        this.bolsa = bolsas.find(bolsa => bolsa.subCentroCosto.nombre == oc.subCentroCosto && bolsa.tipoGasto.includes(oc.tipoGasto.nombre)) ? bolsas.find(bolsa => bolsa.subCentroCosto.nombre == oc.subCentroCosto && bolsa.tipoGasto.includes(oc.tipoGasto.nombre)) : this.bolsa;
      });
  }

  sumaSaldaoBolsa(monto: number) {
    if (this.bolsa) {
      let pagos = this.bolsa.pagos;
      for (let i = pagos.length - 1; i >= 0; i--) {
        if (monto <= 0)
          return null;

        const pago = pagos[i];
        if (pago.gastado > 0)
          if (pago.gastado < monto) {
            monto -= pago.gastado;
            pago.gastado = 0;
          } else {
            pago.gastado -= monto;
            monto = 0;
          }
      }
    }
  }


  guardar() {
    this.setEstadoAEstadosPago(this.ordenCompra.estadosPagos);

    // console.log(
    //   this.ordenCompra.estadosPagos
    // );
    this._sOrdenCompra.putOrdenCompra(this.ordenCompra).subscribe(ordenCompra => {
      this.actualizar.emit();
      Swal.fire("Centro de Costo", "Se ha actualizado de forma correcta el Centro de costo", "success");
      this.Cerrar();
    });
    this._sBolsas.putBolsa(this.bolsa).subscribe(res => console.log('Cargado'));

  }

  Cerrar() {
    this.cerrar.emit();
  }

  genPDF(orden: mOrdenCompra) {
    // console.log(orden);
    // this.loading = true;
    this._sOrdenCompra.getOrdenComprabyID(orden._id).subscribe(el => {
      var formData = new FormData();
      var xhr = new XMLHttpRequest();

      // console.log(el);
      // this._sOrdenCompra.RetPDF(el).save('asdasd')
      var pdf = this._sOrdenCompra.RetPDF(el).output("blob");

      formData.append("adjuntar", pdf, el.folio + "_" + el.proveedor.nombre + "_" + el.subCentroCosto + ".pdf");

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4)
          if (xhr.status != 200)
            return null;
      };
      xhr.open("POST", environment.node + "adjuntarOC", true);
      xhr.send(formData);
      // this.loading = false;
    })
  }

}
