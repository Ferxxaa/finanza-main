import { Component, OnInit } from '@angular/core';
import { mMonto } from '../../../models/mMonto';
import { sMonto } from '../../../services/sMonto.service';

@Component({
  selector: 'app-monto-inicial',
  templateUrl: './monto-inicial.component.html',
  styleUrls: ['./monto-inicial.component.css'],
  providers: [
    sMonto
  ]
})
export class MontoInicialComponent implements OnInit {

  monto: mMonto;

  mensaje: any;

  constructor(
    private _sMonto: sMonto
  ) {
    this.mensaje = { ok: null, error: null };
    this.limpiar();
  }

  private limpiar() {
    this.monto = { _id: null, partida: null, sobregiro: null, iva: null, boleta: null };
  }

  ngOnInit() {
    this._sMonto.getMonto().subscribe(res => {
      if (res.length > 0)
        this.monto = res[0];
    });
  }

  guardar() {
    if (this.monto._id)
      this._sMonto.putMonto(this.monto).subscribe(res => {
        this.ngOnInit();
        this.mensaje.ok = "Se ha actualizado correctamente el punto de partida."
      });
    else
      this._sMonto.postMonto(this.monto).subscribe(res => {
        this.ngOnInit();
        this.mensaje.ok = "Se ha generado correctamente el punto de partida."
      });
  }

  cerrarPopUp() {
    this.mensaje = { ok: null, error: null };
  }

  // number() {
  //   this.monto.partida = this.monto.partida.toString().replace(/(?=(?:\d{3})+\b)/g, ".");
  // }

}
