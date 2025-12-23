import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TipoGasto } from '../../../models/nestTipoGasto';
import { tipoGastoService } from '../../../services/sTipoGasto.service';

declare var Swal: any;

@Component({
  selector: 'app-add-tipo-gasto',
  templateUrl: './add-tipo-gasto.component.html',
  styleUrls: ['./add-tipo-gasto.component.css'],
  providers: [tipoGastoService]
})
export class AddTipoGastoComponent implements OnInit {

  @Output() addTipoGasto: EventEmitter<boolean>;

  gasto: TipoGasto;

  constructor(
    private tipoGastoService: tipoGastoService
  ) {
    this.addTipoGasto = new EventEmitter();
    this.Limpiar();
  }

  ngOnInit() {
  }

  Agregar() {
    this.tipoGastoService.addTiposGasto(this.gasto).subscribe(res => {
      this.Limpiar();
      Swal.fire(
        "Tipo de gasto",
        "Se ha creado correctamente el tipo de gasto",
        "success"
      );
      this.addTipoGasto.emit(true);
    });
  }

  Limpiar() {
    this.gasto = this.tipoGastoService.init();
  }

}
