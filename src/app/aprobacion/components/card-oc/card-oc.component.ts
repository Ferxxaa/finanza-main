import { Component, OnInit, Input } from '@angular/core';
import { mOrdenCompra } from '../../../models/mOrdenCompra';

@Component({
  selector: 'app-card-oc',
  templateUrl: './card-oc.component.html',
  styleUrls: ['./card-oc.component.css']
})
export class CardOcComponent implements OnInit {

  @Input() ordenCompra:mOrdenCompra;

  constructor() { }

  ngOnInit() {
    console.log(this.ordenCompra);
  }

  retTotal(estadosPago:any[]){
    let total = 0;
    estadosPago.forEach(estadoPago =>{
      total = estadoPago.monto
    });
    return total;
  }

}
