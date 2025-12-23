import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AreaNegocio } from '../../../models/nestAreaNegocio';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { Observable } from 'rxjs';
import { areaNegocioService } from '../../../services/Nest/areaNegocioService.service';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { comunesFechas } from '../../../share/fechas';

declare var $: any;

@Component({
  selector: 'app-edit-centro-costo-nest',
  templateUrl: './edit-centro-costo-nest.component.html',
  styleUrls: ['./edit-centro-costo-nest.component.css'],
  providers: [areaNegocioService, centroCostoService, sMovimientoService, comunesFechas]
})
export class EditCentroCostoNestComponent implements OnInit {

  @Input() eCentroCosto: CentroCosto;
  @Input() eCentroCostoStatus: boolean;
  @Output() eCerrar: EventEmitter<boolean>;
  @Output() eUpdate: EventEmitter<boolean>;

  areasNegocios$: Observable<AreaNegocio[]>;
  desplazaminetoDias: number;

  constructor(
    private areaNegocioService: areaNegocioService,
    private centroCostoService: centroCostoService,
    private sMovimientoService: sMovimientoService,
    private _sComunesFechas: comunesFechas
  ) {
    this.eCerrar = new EventEmitter();
    this.eUpdate = new EventEmitter();
    this.areasNegocios$ = this.areaNegocioService.getAreasNegocio();
    this.desplazaminetoDias = 0;
  }

  ngOnInit() {
    this.eCentroCostoStatus = this.eCentroCosto.isActive;
    this._sComunesFechas.calendario();
    this._sComunesFechas.DespliegaFechaDateUTC("#txtInicio", this.eCentroCosto.fechaInicio);
    this._sComunesFechas.DespliegaFechaDateUTC("#txtTermino", this.eCentroCosto.fechaTermino);
  }

  findAreaNegocio() {
    this.areaNegocioService.getAreaNegocioById(this.eCentroCosto.areaNegocio.idAreaNegocio).subscribe(res => {
      this.eCentroCosto.areaNegocio = res;
    })
  }

  asignaFechaInicio() {
    const temp = $("#txtInicio").val()
    this.eCentroCosto.fechaInicio = new Date(this._sComunesFechas.retFechaParaGuardar(temp));
  }

  asignaFechaTermino() {
    const temp = $("#txtTermino").val()
    this.eCentroCosto.fechaTermino = new Date(this._sComunesFechas.retFechaParaGuardar(temp));
  }

  Actualizar() {
    this.centroCostoService.updateCentroCosto(this.eCentroCosto).subscribe(res => {
      if (this.eCentroCostoStatus || this.eCentroCostoStatus == this.eCentroCosto.isActive) {
        this.eUpdate.emit(true);
      }
    });
    if (!this.eCentroCostoStatus && this.eCentroCostoStatus != this.eCentroCosto.isActive) {
      this.sMovimientoService.addDayToCentroCosto(this.desplazaminetoDias, this.eCentroCosto.idCentroCosto).subscribe(res => {
        this.eUpdate.emit(true);
      });
    }
  }

  cerrar() {
    this.eCerrar.emit(false)
  }

}
