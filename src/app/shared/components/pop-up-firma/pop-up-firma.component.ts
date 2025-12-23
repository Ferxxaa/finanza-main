import { Component, OnInit, Input } from '@angular/core';
import { sUsuario } from '../../../services/sUsuario.service';

@Component({
  selector: 'app-pop-up-firma',
  templateUrl: './pop-up-firma.component.html',
  styleUrls: ['./pop-up-firma.component.css'],
  providers: [sUsuario]
})
export class PopUpFirmaComponent implements OnInit {

  @Input() usuarioCreador;
  @Input() Estado;

  creador:string;

  constructor(
    private _sUsuario: sUsuario
  ) {
    this.creador=null;
   }

  ngOnInit() {
    this.retUsuario(this.usuarioCreador);
  }

  retUsuario(id) {
    this.creador = null;
    // this._sUsuario.getUsuarioPersonaByIdUsuario(id).subscribe((res) => {
    //   this.creador = res.nombre + " " + res.paterno;
    // });
  }

}
