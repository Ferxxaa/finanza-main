import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Cotizacion } from '../../../models/nestCotizacion';
import { Item } from '../../../models/nestItem';

@Component({
  selector: 'app-item-pop-up',
  templateUrl: './item-pop-up.component.html',
  styleUrls: ['./item-pop-up.component.css']
})
export class ItemPopUpComponent implements OnInit {

  @Input() items: Item[]
  @Input() cotizacion: Cotizacion;

  totalOC: number;
  boleta: number;
  afecta: number;
  url: string;

  constructor() {
    this.totalOC = 0;
    this.boleta = 0;
    this.afecta = 0;
    this.url = environment.node + "adjuntar/";
  }

  ngOnInit() {
    // console.log(this.cotizacion);
    if (this.cotizacion && this.cotizacion.nombreAdjunto) {
      this.url += this.cotizacion.nombreAdjunto;
    }
    else
      this.url = null
    // console.log(this.url);
    
    this.items.forEach(item => {
      this.totalOC += (item.precioUnitario * item.cantidad);
      this.boleta += (item.tipoDeclaracion == environment.declaracion.boleta ? item.cantidad * item.precioUnitario * .11 : 0)
      this.afecta += (item.tipoDeclaracion == environment.declaracion.afecto ? item.cantidad * item.precioUnitario * .19 : 0)
    });
  }

}
