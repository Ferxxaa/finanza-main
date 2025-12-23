import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { sOrdenPedido } from '../../../services/sOrdenPedido.service';
import { mOrdenPedido } from '../../../models/mOrdenPedido';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { Observable } from 'rxjs';
import { MovimientoRelationShip } from '../../../models/movimiento';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edita-oc',
  templateUrl: './edita-oc.component.html',
  styleUrls: ['./edita-oc.component.css'],
  providers: [
    sOrdenComra,
    sOrdenPedido,
    sMovimientoService
  ]
})
export class EditaOcComponent implements OnInit {

  rechazados: Observable<MovimientoRelationShip[]>;
  ordenCompra: Array<any>;

  //PopUp
  buscador: boolean;

  constructor(
    private _sOrdenComra: sOrdenComra,
    private _sOrdenPedido: sOrdenPedido,
    private _Router: Router,
    private movimientoService: sMovimientoService,
  ) {
    this.ordenCompra = [];
    this.buscador = false;
    this.rechazados = this.movimientoService.getRechazadas();
  }

  ngOnInit() {
    console.clear();
    this.ordenCompra = [];
    this._sOrdenComra.getOrdenComprabyEstado(3).subscribe(res => {
      this.ordenCompra = this.generaObjetoAllData(res);
      this.getOc();
    });
  }

  private generaObjetoAllData(res: any) {
    let oc = [];
    res.forEach(OC => {
      let obj: any;
      obj = {
        _id: OC._id, folio: OC.folio, proveedor: OC.proveedor, descripcion: OC.descripcion,
        subCentroCosto: OC.centroCosto.subCentroCosto.filter(el => el.nombre == OC.subCentroCosto)[0],
        monto: 0, motivo: OC.motivo,
        fecha: OC.fechaCreacion
      };
      OC.estadosPagos.forEach(estadosPago => {
        obj.monto += estadosPago.monto;
      });
      oc.push(obj);
    });
    return oc.sort(this.orderOc);
  }

  orderOc(a, b) {
    let fecha1 = new Date(a.fecha);
    let fecha2 = new Date(b.fecha);
    if (fecha1.getFullYear() < fecha2.getFullYear())
      return 1
    if (fecha1.getFullYear() == fecha2.getFullYear() && fecha1.getMonth() < fecha2.getMonth())
      return 1
    if (fecha1.getFullYear() == fecha2.getFullYear() && fecha1.getMonth() == fecha2.getMonth() && fecha1.getDate() < fecha2.getDate())
      return 1
    return -1;
  }

  getOc() {
    this._sOrdenPedido.getOrdenPedido().subscribe(OP => {
      OP.filter((orden: mOrdenPedido) => orden.Estado == 3).forEach(OPedido => {
        // console.log("Orden pedido: ",OPedido);

        let obj: any;
        obj = {
          _id: OPedido._id, folio: "OP " + OPedido.correlativo, proveedor: OPedido.proveedor, descripcion: OPedido.descripcion,
          subCentroCosto: OPedido.centroCosto.subCentroCosto.find(el => el.nombre == OPedido.subCentroCosto),
          monto: 0, motivo: OPedido.motivo, fecha: OPedido.fechaCreacion
        };
        // console.log("Objeto: ",obj);   

        OPedido.estadosPagos.forEach(estadosPago => {
          obj.monto += estadosPago.monto;
        });
        this.ordenCompra.push(obj);
      });
      this.ordenCompra.sort(this.orderOc);
    });
  }

  Editar(movimiento: MovimientoRelationShip) {
    // localStorage.setItem('editarOC', movimiento.idMovimiento.toString());
    if (movimiento.tipo == environment.tiposOC.ordenPedido) {
      this._Router.navigate(['/OrdenPedido/' + movimiento.idMovimiento]);
    } else if (movimiento.tipo == environment.tiposOC.ordenCompra) {
      this._Router.navigate(['/OrdenCompra/' + movimiento.idMovimiento]);
    }
  }

  Filtrar(e) {
    this.buscador = null;
    this._sOrdenComra.fetchOrdenComprabyEstado(3)
      .then((ordenes: Array<any>) => {
        this.ordenCompra = this.generaObjetoAllData(ordenes);
        if (e.inicio && e.termino)
          this.ordenCompra = this.ordenCompra.filter(el => el.fechaCreacion >= e.inicio && el.fechaCreacion <= e.termino);
        if (e.oc)
          this.ordenCompra = this.ordenCompra.filter(el => el.folio && el.folio.includes(e.oc));
        if (e.proveedor)
          this.ordenCompra = this.ordenCompra.filter(el => el.proveedor.nombre == e.proveedor);
        if (e.cCosto)
          this.ordenCompra = this.ordenCompra.filter(el => el.subCentro.nombre == e.cCosto);
      })
      .catch(err => console.log(new Error(err)));
  }

}
