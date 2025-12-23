import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { mCotizacion } from '../../../models/mCotizacion';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Cotizacion } from '../../../models/nestCotizacion';
import { cotizacionService } from '../../../services/cotizacionService.service';

@Component({
  selector: 'app-mis-cotizaciones',
  templateUrl: './mis-cotizaciones.component.html',
  styleUrls: ['./mis-cotizaciones.component.css'],
  providers: [
    cotizacionService
  ]
})
export class MisCotizacionesComponent implements OnInit {

  cotizaciones$: Observable<Cotizacion[]>;
  cotizaciones: Array<mCotizacion>;
  url: string

  constructor(
    private _Router: Router,
    private cotizacionesService: cotizacionService
  ) {
    this.cotizaciones$ = this.cotizacionesService.getCotizacionesPendientes();
    this.url = environment.node + "adjuntar/";
  }

  ngOnInit() {
    console.clear();
  }


  Detalle(cot) {
    localStorage.setItem('cotizacion', JSON.stringify(cot));
    this._Router.navigate(['/OrdenCompra']);
  }

  eliminar(cotizacion: Cotizacion) {
    this.cotizacionesService.deleteCotizacion(cotizacion.idCotizacion).subscribe(res => {
      this.cotizaciones$ = null;
      this.cotizaciones$ = this.cotizacionesService.getCotizacionesPendientes();
    })
  }

}
