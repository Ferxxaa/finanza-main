import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SubTipoGasto } from '../../../models/nestSubTipoGasto';
import { TipoGasto } from '../../../models/nestTipoGasto';
import { subTipoGastoService } from '../../../services/sSubTipoGasto.service';
import { tipoGastoService } from '../../../services/sTipoGasto.service';

@Component({
  selector: 'app-tipo-gasto-pop-up',
  templateUrl: './tipo-gasto-pop-up.component.html',
  styleUrls: ['./tipo-gasto-pop-up.component.css'],
  providers: [
    tipoGastoService,
    subTipoGastoService
  ]
})
export class TipoGastoPopUpComponent implements OnInit {

  @Input() tipoGasto: TipoGasto;
  @Input() subTipoGasto: SubTipoGasto;

  @Output() emitSubTipoGasto: EventEmitter<SubTipoGasto>

  tipoGasto$: Observable<TipoGasto[]>
  subTipoGasto$: Observable<SubTipoGasto[]>
  idsubTipoGasto: number;

  constructor(
    private tipoGastoService: tipoGastoService,
    private subTipoGastoService: subTipoGastoService
  ) {
    this.emitSubTipoGasto = new EventEmitter<SubTipoGasto>();
    this.tipoGasto$ = this.tipoGastoService.getTiposGastos();
  }

  ngOnInit() {
    if (this.tipoGasto)
      this.subTipoGasto$ = this.subTipoGastoService.getSubTipoGastoByIdTipoGasto(this.tipoGasto.idTipoGasto);
    else {
      this.tipoGasto = this.tipoGastoService.init();
      this.subTipoGasto = this.subTipoGastoService.init();
      this.idsubTipoGasto = this.subTipoGastoService.init().idSubTipoGasto;
    }
    this.idsubTipoGasto = this.subTipoGasto && this.subTipoGasto.idSubTipoGasto ? this.subTipoGasto.idSubTipoGasto : 0;
  }

  loadSubTipoGasto() {
    if (this.tipoGasto)
      this.subTipoGasto$ = this.subTipoGastoService.getSubTipoGastoByIdTipoGasto(this.tipoGasto.idTipoGasto);
  }

  changeSubTipoGasto(idSubtipo: number) {
    this.subTipoGastoService.getSubTiposGastosById(idSubtipo).subscribe(res => {
      // console.log(res);
      // this.subTipoGasto = res;
      this.emitSubTipoGasto.emit(res);
    })
  }

}
