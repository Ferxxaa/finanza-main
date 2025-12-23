import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { mCentroCosto } from '../../../../models/mCentroCosto';
import { mOrdenCompra } from '../../../../models/mOrdenCompra';
import { mSubCentroCosto } from '../../../../models/mSubCentroCosto';
import { sCentroCosto } from '../../../../services/sCentroCosto.service';
import { Comunes } from '../../../../Share/Comunes';

@Component({
  selector: 'app-card-ocelement',
  templateUrl: './card-ocelement.component.html',
  styleUrls: ['./card-ocelement.component.css'],
  providers: [
    Comunes
  ]
})
export class CardOcelementComponent implements OnInit {

  centroCosto: mSubCentroCosto;

  @Input() orden: mOrdenCompra;
  @Input() centrosCosto: mCentroCosto[];

  whiteColor: number;

  clicked: boolean;

  constructor(
    private comunes: Comunes
  ) {
    this.whiteColor = 0;
    this.clicked = false;
  }

  ngOnInit() {
    console.log(this.orden);

    let areaNegocio = this.centrosCosto.find(el => el.subCentroCosto.map(el => el.nombre).includes(this.orden.subCentroCosto));
    let subCentro = areaNegocio.subCentroCosto.find(el => el.nombre == this.orden.subCentroCosto);
    this.centroCosto = subCentro;
    let color = this.comunes.hexToRgb(this.centroCosto.fondo);
    this.whiteColor = color.r + color.g + color.b;
  }

  totalOC(): number {
    return this.orden.estadosPagos.reduce((acc, el) => acc + el.monto, 0);
  }

}
