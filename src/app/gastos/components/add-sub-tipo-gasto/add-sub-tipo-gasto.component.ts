import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SubTipoGasto } from '../../../models/nestSubTipoGasto';
import { TipoGasto } from '../../../models/nestTipoGasto';
import { subTipoGastoService } from '../../../services/sSubTipoGasto.service';
import { tipoGastoService } from '../../../services/sTipoGasto.service';

declare var Swal: any;

@Component({
  selector: 'app-add-sub-tipo-gasto',
  templateUrl: './add-sub-tipo-gasto.component.html',
  styleUrls: ['./add-sub-tipo-gasto.component.css'],
  providers: [tipoGastoService, subTipoGastoService]
})
export class AddSubTipoGastoComponent implements OnInit {

  @Output() addSubTipoGasto: EventEmitter<boolean>;

  tipoGasto$: Observable<TipoGasto[]>

  subTipoGasto: SubTipoGasto;
  subTiposGastos$: Observable<SubTipoGasto[]>;

  constructor(
    private tipoGastoService: tipoGastoService,
    private subTipoGastoService: subTipoGastoService
  ) {
    this.addSubTipoGasto = new EventEmitter();
    this.getTipoGasto();
    this.Limpiar();
  }

  getTipoGasto() {
    this.tipoGasto$ = this.tipoGastoService.getTiposGastosWithChild();
  }

  Limpiar() {
    this.subTipoGasto = this.subTipoGastoService.init();
    this.getSubTipos();
  }

  ngOnInit() {
  }

  getSubTipos() {
    this.subTiposGastos$ = this.subTipoGastoService.getSubTipoGastoByIdTipoGasto(this.subTipoGasto.tipoGasto);
  }

  AgregarSub() {
    if (this.ValidaSubtipo()) {
      this.subTipoGastoService.addSubTiposGasto(this.subTipoGasto).subscribe(res => {
        this.Limpiar();
        this.getSubTipos();
        Swal.fire(
          "Sub tipo de gasto",
          "Se ha creado correctamente el sub tipo de gasto",
          "success"
        );
        this.addSubTipoGasto.emit(true);
      });
    } else {
      Swal.fire(
        "Sub tipo de gasto",
        "No se ha podido crear el sub tipo de gasto",
        "error"
      );
    }
  }

  private ValidaSubtipo(): Boolean {
    let bol = true;
    !this.subTipoGasto.nombreSubtipoGasto ? bol = false : bol = bol;
    !this.subTipoGasto.tipoGasto ? bol = false : bol = bol;
    return bol;
  }

}
