import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { sUsuario } from '../../../services/sUsuario.service';

@Component({
  selector: 'app-pop-up-oc',
  templateUrl: './pop-up-oc.component.html',
  styleUrls: ['./pop-up-oc.component.css'],
  providers: [
    sUsuario
  ]
})
export class PopUpOcComponent implements OnInit {

  @Input() OC: any;
  @Output() cerrar = new EventEmitter;

  ordenCompra: any;
  indice: number;

  url: string;

  imprimir: boolean;

  creador: string;

  constructor(
    private _sUsuario: sUsuario
  ) {
    this.ordenCompra = {
      Items: [], _id: null, folio: "0000000", proveedor: {},
      centroCosto: { subCentroCosto: [] }, subCentroCosto: null, tipoGasto: { subTipoGasto: [] },
      subTipoGasto: null, metodoPago: "0", estadosPagos: [], solicita: null, descripcion: null, despacho: null,
      usuarioCreador: null, usuarioAprovador: null, evaluacionCantidad: false, evaluacionCalidad: false, observacionCantidad: null,
      Estado: null, cotizacion: null, fechaCreacion: null, pagar: null, totalOC: null, afecto: null, TotalPagar: null,
      indice: 0, adjunto: null, compromiso: null
    }
    this.url = environment.node + "adjuntar/";
    this.indice = 0;
    this.imprimir = false;
  }

  ngOnInit() {
    this.indice = this.OC.indice;
    this.ordenCompra = this.OC;
    this.retUsuario(this.ordenCompra.usuarioCreador)
    // console.log(this.OC);
  }

  Cerrar() {
    this.cerrar.emit();
  }

  retUsuario(id) {
    this.creador = null;
    this._sUsuario.getUsuarioPersonaByIdUsuario(id).subscribe(res => {
      this.creador = res.nombre + " " + res.paterno;
    });
  }

}
