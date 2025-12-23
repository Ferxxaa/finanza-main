import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { EstadosEP } from '../../../models/estadosEP';
import { ViewCentroCosto } from '../../../models/nestViewCentroCosto';
import { TiposMovimientos } from '../../../models/tiposMovimientos';

@Component({
  selector: 'app-get-view-centro-costo',
  templateUrl: './get-view-centro-costo.component.html',
  styleUrls: ['./get-view-centro-costo.component.css']
})
export class GetViewCentroCostoComponent implements OnInit {

  @Input() tipo: number;
  @Input() flujos: ViewCentroCosto[];

  @Output() popUpEmit = new EventEmitter;
  @Output() popUpload = new EventEmitter;

  tiposMovimiento: TiposMovimientos;
  estadosEP: EstadosEP;
  idMovimiento: number | null;
  egreso: number | null;
  ingreso: number | null;
  idMovimientoEP: number | null;

  constructor() { }

  ngOnInit() {
    this.tiposMovimiento = environment.tiposOC;
    this.estadosEP = environment.estadoEP;
    this.idMovimiento = null;
    this.egreso = null;
    this.ingreso = null;
  }

  update(){
    this.popUpload.emit('upload')
  }

  PopUp(movimiento: ViewCentroCosto) {
    // this.popUpEmit.emit({ id });
    switch (movimiento.tipoOC) {
      case this.tiposMovimiento.ordenCompra:
        this.idMovimiento = movimiento.idMovimiento;
        break;
      case this.tiposMovimiento.egreso:
        this.egreso = movimiento.idMovimiento;
        break;
      case this.tiposMovimiento.ingreso:
        this.ingreso = movimiento.idMovimiento;
        break;
        case this.tiposMovimiento.ordenPedido:
          this.idMovimientoEP = movimiento.idMovimiento
          break;
      default:
        break;
    }
  }

}
