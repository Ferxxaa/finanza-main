import { Component, Input, OnInit } from '@angular/core';
import { viewDetalleCentroCosto } from '../../../models/detalleCentroCosto';

declare var $: any;

@Component({
  selector: 'app-view-detalle-centro-costo',
  templateUrl: './view-detalle-centro-costo.component.html',
  styleUrls: ['./view-detalle-centro-costo.component.css']
})
export class ViewDetalleCentroCostoComponent implements OnInit {

  @Input() detalleCentroCosto: viewDetalleCentroCosto;

  constructor() { }

  ngOnInit() {
    
  }

  claseToggle() {
    $("#desplegable").toggleClass("h0D");
  }

  // retTotalIngresos(): number {
  //   let total = 0;
  //   // console.log(this.centroDB);
  //   if (this.centroDB.contrato)
  //     this.centroDB.contrato.forEach(contrato => {
  //       total += contrato.monto;
  //     });
  //   return total;
  // }

}
