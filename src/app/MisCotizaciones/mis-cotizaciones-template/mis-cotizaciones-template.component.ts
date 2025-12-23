import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from '../../models/login-user';
import { mCentroCosto } from '../../models/mCentroCosto';
import { mCotizacion } from '../../models/mCotizacion';
import { Cotizacion } from '../../models/nestCotizacion';
import { cotizacionService } from '../../services/cotizacionService.service';
import { sCentroCosto } from '../../services/sCentroCosto.service';
import { sCotizacion } from '../../services/sCotizacion.service';

@Component({
  selector: 'app-mis-cotizaciones-template',
  templateUrl: './mis-cotizaciones-template.component.html',
  styleUrls: ['./mis-cotizaciones-template.component.css'],
  providers: [
    sCotizacion,
    sCentroCosto,
    cotizacionService
  ]
})
export class MisCotizacionesTemplateComponent implements OnInit {

  usuario: LoginUser;
  misCotizaciones$: Observable<Cotizacion[]>

  centroCosto$: Observable<mCentroCosto>

  constructor(
    private cotizacionesService: cotizacionService,
    private cotizaciones: sCotizacion,
    private scentroCosto: sCentroCosto
  ) {
    this.usuario = JSON.parse(localStorage.usuario);
    this.centroCosto$ = this.scentroCosto.getCentroCosto();
  }

  ngOnInit() {
    this.misCotizaciones$ = this.cotizacionesService.getMisCotizaciones(this.usuario.idUsuario);
  }

}
