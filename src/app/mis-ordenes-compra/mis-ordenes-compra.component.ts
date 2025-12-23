import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { mCentroCosto } from '../models/mCentroCosto';
import { mOrdenCompra } from '../models/mOrdenCompra';
import { sCentroCosto } from '../services/sCentroCosto.service';
import { sOrdenComra } from '../services/sOrdenComra.service';
import { sOrdenPedido } from '../services/sOrdenPedido.service';

@Component({
  selector: 'app-mis-ordenes-compra',
  templateUrl: './mis-ordenes-compra.component.html',
  styleUrls: ['./mis-ordenes-compra.component.css'],
  providers:[
    sOrdenComra,
    sCentroCosto,
    sOrdenPedido
  ]
})
export class MisOrdenesCompraComponent implements OnInit {

  ordenesCompra$: Observable<mOrdenCompra[]>
  centrosCosto$: Observable<mCentroCosto[]>

  constructor(
    private sOrdencompra: sOrdenComra,
    private sCentroCosto:sCentroCosto
  ) {
    this.ordenesCompra$ = this.sOrdencompra.getOrdenCompra();
    this.centrosCosto$ = this.sCentroCosto.getCentroCosto();
  }

  ngOnInit() {
  }

}
