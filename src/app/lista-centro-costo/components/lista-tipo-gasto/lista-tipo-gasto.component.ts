import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { mGastos } from '../../../models/mGastos';
import { reportCentroCostoInterface } from '../../../models/nestReportCentroCostoInterface';
import { sGastos } from '../../../services/sGastos.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { viewReportCentroCostoService } from '../../../services/sViewReportCentroCosto.service';

declare var $: any;

@Component({
  selector: 'app-lista-tipo-gasto',
  templateUrl: './lista-tipo-gasto.component.html',
  styleUrls: ['./lista-tipo-gasto.component.css'],
  providers: [
    sGastos,
    sOrdenComra,
    viewReportCentroCostoService
  ]
})
export class ListaTipoGastoComponent implements OnInit {

  // @Input() cCosto: string;
  @Input() idCentroCosto: number;
  @Output() cerrar = new EventEmitter;

  reportTipoGasto$: Observable<reportCentroCostoInterface[]>;
  reportSubTipoGasto$: Observable<reportCentroCostoInterface[]>;

  TiposGastos: Array<any>;

  listTipoGasto: Array<any>;

  sumaTipos: number;

  constructor(
    private _sGastos: sGastos,
    private _sOrdenCompra: sOrdenComra,
    private viewReportCentroCostoService: viewReportCentroCostoService
  ) {
    this.TiposGastos = [];
    this.listTipoGasto = [];
  }

  ngOnInit() {
    console.clear();
    this.reportTipoGasto$ = this.viewReportCentroCostoService.getViewReportCentroCostoTipoGasto(this.idCentroCosto);
    this.reportSubTipoGasto$ = this.viewReportCentroCostoService.getViewReportCentroCostoSubTipoGasto(this.idCentroCosto);
    // this._sOrdenCompra.getOrdenComprabyCentroCosto(this.cCosto).subscribe(OC => {
    //   this._sGastos.getGastos().subscribe(res => {
    //     this.TiposGastos = res;
    //     this.TiposGastos.forEach(TiposGasto => {
    //       //Calcula Valores SubTipo Gasto
    //       TiposGasto.subTipoGasto = TiposGasto.subTipoGasto.map(el => this.mapSubTipoGastoValor(el, OC, TiposGasto))
    //       //Calcula el valor de todo el Tipo Gasto
    //       TiposGasto.valor = TiposGasto.subTipoGasto.reduce((acc, el) => acc + el.valor, 0)
    //       //Calcula Porcentajes por Sub Tipo de Gasto
    //       TiposGasto.subTipoGasto.map(subTipo => ({ ...subTipo, porcentaje: subTipo.valor * 100 / TiposGasto.valor }));
    //     });
    //     this.sumaTipos = this.TiposGastos.reduce((acc, el) => acc + el.valor, 0);
    //     //Calcula Porcentajes por Tipo de Gasto
    //     this.TiposGastos = this.TiposGastos.map(TiposGasto => ({ ...TiposGasto, porcentaje: TiposGasto.valor * 100 / this.sumaTipos }));

    //     // setTimeout(() => {
    //     //   this.TiposGastos.forEach(TiposGasto => {
    //     //     this.listTipoGasto.push({ id: TiposGasto._id, height: $('#' + TiposGasto._id).height() })
    //     //     $('#' + TiposGasto._id).height(0)
    //     //   });
    //     // }, 1);

    //   });
    // });
  }

  mapSubTipoGastoValor(subTipo, ocArr, tipoGasto): Object {
    let subcentro = ocArr.filter(el => el.subTipoGasto == subTipo && (el.tipoGasto ? el.tipoGasto.nombre : null) == tipoGasto.nombre && el.Estado == 2)
    let valor = subcentro.reduce((acc, subcentro) => acc + subcentro.estadosPagos.reduce((acc, el) => acc + (el.estado <= 4 ? el.monto : 0), 0), 0)
    return { nombre: subTipo, valor: valor }
  }

  Cerrar() {
    this.cerrar.emit();
  }

  abrir(id) {

    $('#' + id).toggleClass("h0");
    // if (!$('#' + id).height())
    //   $('#' + id).toggleclas(this.listTipoGasto.find(el => el.id == id).height);
    // else
    //   $('#' + id).height(0);
  }

}
