import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SubTipoGasto } from '../../../models/nestSubTipoGasto';
import { TipoGasto } from '../../../models/nestTipoGasto';
import { subTipoGastoService } from '../../../services/sSubTipoGasto.service';
import { tipoGastoService } from '../../../services/sTipoGasto.service';

declare var Swal: any;

@Component({
  selector: 'app-list-tipos-gasto',
  templateUrl: './list-tipos-gasto.component.html',
  styleUrls: ['./list-tipos-gasto.component.css'],
  providers: [tipoGastoService, subTipoGastoService]
})
export class ListTiposGastoComponent implements OnInit {

  @Output() updTipoGasto: EventEmitter<boolean>;

  tiposGastos$: Observable<TipoGasto[]>

  tipoGasto: TipoGasto;
  subTipoGasto: SubTipoGasto;

  tabIndex: number;

  constructor(
    private tipoGastoService: tipoGastoService,
    private subTipoGastoService: subTipoGastoService
  ) {
    this.updTipoGasto = new EventEmitter();
    this.tabIndex = 0;
    this.Limpiar();
  }

  Limpiar() {
    this.tiposGastos$ = null;
    this.tiposGastos$ = this.tipoGastoService.getTiposGastosWithChild();
    this.tipoGasto = null;
    this.subTipoGasto = null;
    this.tabIndex = 0;
  }

  ngOnInit() {
  }

  onTabChanged(e) {
    if (e.index == 0)
      this.subTipoGasto = null;
    this.tabIndex = e.index;
  }

  popUp(idTipoGasto: number) {
    this.tipoGastoService.getTiposGastosById(idTipoGasto).subscribe(res => {
      this.tipoGasto = res;
    })
  }

  editSubTipo(idSubTipoGasto: number) {
    this.subTipoGastoService.getSubTiposGastosById(idSubTipoGasto).subscribe(res => {
      this.subTipoGasto = res;
      this.onTabChanged({ index: 1 });
    })
  }

  EliminarTipo() {
    let self = this;
    Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar el tipo de gasto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.value)
        self.EliminarTipoGasto();
      self.Limpiar();
    });
  }

  EliminarSub() {
    let self = this;
    Swal.fire({
      title: "Eliminar Sub tipo gasto",
      text: "¿Esta seguro de eliminar el sub tipo de gasto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.value)
        self.eliminandoSubTipoGasto();
    });
  }

  ActualizarTipoGasto() {
    this.tipoGastoService.putTiposGasto(this.tipoGasto).subscribe(res => {
      Swal.fire(
        "Tipo de gasto",
        "Se ha actualizado correctamente el tipo de gasto",
        "success"
      );
      this.Limpiar();
      this.updTipoGasto.emit(true);
    });
  }

  private EliminarTipoGasto() {
    this.tipoGastoService.delTiposGasto(this.tipoGasto.idTipoGasto).subscribe(res => {
      this.Limpiar()
      this.updTipoGasto.emit(true);
    })
  }

  ActualizarSubTipoGasto() {
    this.subTipoGastoService.putSubTiposGasto(this.subTipoGasto).subscribe(res => {
      this.Limpiar()
      Swal.fire(
        "Sub tipo de gasto",
        "Se ha actualizado correctamente el sub tipo de gasto",
        "success"
      );
    })
  }

  private eliminandoSubTipoGasto() {
    this.subTipoGastoService.delSubTiposGasto(this.subTipoGasto.idSubTipoGasto).subscribe(res => {
      this.Limpiar()
    })
  }

}
