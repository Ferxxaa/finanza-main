import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { mGastos } from '../../../models/mGastos';

import { sGastos } from '../../../services/sGastos.service';

@Component({
  selector: 'app-pop-up-tipo-gasto',
  templateUrl: './pop-up-tipo-gasto.component.html',
  styleUrls: ['./pop-up-tipo-gasto.component.css'],
  providers: [
    sGastos
  ]
})
export class PopUpTipoGastoComponent implements OnInit {

  @Input() tipoGasto;
  @Input() subTipoGasto;
  @Output() cambiaTipoGasto=new EventEmitter()
  @Output() cambiaSubTipoGasto=new EventEmitter()

  listaTiposGastos: mGastos;

  constructor(
    private _sGastos: sGastos
  ) {
    this._sGastos.getGastos().subscribe(gasto => {
      this.listaTiposGastos = gasto;
    })
  }

  ngOnInit() {
    // console.log(this.tipoGasto);
  }

  AsignaTipoGasto() {
    this.subTipoGasto=0;
    // console.log(this.tipoGasto);
    this._sGastos.getGastosbyID(this.tipoGasto._id).subscribe(gasto =>{
      this.tipoGasto = gasto;
      // console.log(this.tipoGasto);
      this.cambiaTipoGasto.emit(gasto);
    })
  }

  cambiaSubTipo(){
    // console.log(this.subTipoGasto);
    this.cambiaSubTipoGasto.emit(this.subTipoGasto)
  }

}
