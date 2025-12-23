import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { mCotizacion } from '../../../models/mCotizacion';
import { mSubCentroCosto } from '../../../models/mSubCentroCosto';
import { Cotizacion } from '../../../models/nestCotizacion';
import { sCentroCosto } from '../../../services/sCentroCosto.service';
import { Comunes } from '../../../Share/Comunes';

@Component({
  selector: 'mis-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
  providers: [
    Comunes
  ]
})
export class MiCotizacionComponent implements OnInit {

  @Input() cotizacion: Cotizacion;

  centroCosto: mSubCentroCosto;

  url: string;
  whiteColor: number;

  constructor(
    private _centroCosto: sCentroCosto,
    private comunes: Comunes
  ) {
    this.url = environment.node + "adjuntar/";
    this.whiteColor = 0;
  }

  ngOnInit() {
    // this.centroCosto = this._centroCosto.findCentroCosto(this.cotizacion.centroCosto);
    if (this.centroCosto && this.centroCosto.fondo) {
      console.log(this.centroCosto);
      let color = this.comunes.hexToRgb(this.centroCosto.fondo);
      this.whiteColor = color.r + color.g + color.b;
    }
  }

}
