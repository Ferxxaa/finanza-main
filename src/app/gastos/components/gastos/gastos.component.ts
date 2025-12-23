import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { mCentroCosto } from '../../../models/mCentroCosto';
import { TipoGasto } from '../../../models/nestTipoGasto';
import { SubTipoGasto } from '../../../models/nestSubTipoGasto';
import { ListTiposGastoComponent } from '../list-tipos-gasto/list-tipos-gasto.component';
import { AddSubTipoGastoComponent } from '../add-sub-tipo-gasto/add-sub-tipo-gasto.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
  mensaje: any;

  @ViewChild(ListTiposGastoComponent) ListTiposGastoComponent: ListTiposGastoComponent;
  @ViewChild(AddSubTipoGastoComponent) AddSubTipoGastoComponent: AddSubTipoGastoComponent;

  constructor() {
    this.mensaje = { ok: null, error: null };
  }

  ngOnInit() {
    console.clear();
  }

  reload() {
    this.ListTiposGastoComponent.Limpiar();
    this.reloadSubTipo();
  }

  reloadSubTipo() {
    this.AddSubTipoGastoComponent.Limpiar()
    this.AddSubTipoGastoComponent.getTipoGasto();
  }

}
