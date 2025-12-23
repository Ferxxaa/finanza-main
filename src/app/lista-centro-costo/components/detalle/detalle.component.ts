import { Component, OnInit, Input } from '@angular/core';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { mOrdenCompra } from '../../../models/mOrdenCompra';
import { sCentroCosto } from '../../../services/sCentroCosto.service';
import { mSubCentroCosto } from '../../../models/mSubCentroCosto';

declare var $: any;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() centroCosto: any;

  centroDB: mSubCentroCosto
  ordenesCompra: mOrdenCompra[];

  constructor(
    private _sCentroCosto: sCentroCosto,
    private _sOrdenCompra: sOrdenComra
  ) {
    this.ordenesCompra = [];
  }

  ngOnInit() {
    // console.log(this.centroCosto);
    this.centroDB = this.centroCosto
    this.getOcCentroCosto(this.centroCosto.nombre);
  }

  getOcCentroCosto(nombreCentroCosto: string) {
    this._sOrdenCompra.getOrdenComprabyCentroCosto(nombreCentroCosto).subscribe(OC => {
      this.ordenesCompra = OC;
    });
  }

  claseToggle() {
    // console.log(this.centroCosto);
    $("#desplegable").toggleClass("h0D");
  }

  retIngresos(): mOrdenCompra[] {
    if (this.ordenesCompra.length)
      return this.ordenesCompra.filter(orden => orden.ingresoEgreso == 2 && (orden.Estado == 2 || orden.Estado == 6))
    else
      return [];
  }

  retTotalIngresos(): number {
    let total = 0;
    // console.log(this.centroDB);
    if (this.centroDB.contrato)
      this.centroDB.contrato.forEach(contrato => {
        total += contrato.monto;
      });
    return total;
  }

}
