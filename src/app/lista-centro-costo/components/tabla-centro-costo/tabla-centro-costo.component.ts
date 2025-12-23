import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-centro-costo',
  templateUrl: './tabla-centro-costo.component.html',
  styleUrls: ['./tabla-centro-costo.component.css']
})
export class TablaCentroCostoComponent implements OnInit {

  @Input() header: boolean;
  @Input() contenidos: Array<any>;
  @Output() popUpEmit = new EventEmitter;

  // contenidos: Array<any>;

  constructor() {
    // this.contenidos = [];
  }

  ngOnInit() {
    
  }

  PopUp(id, indice, ordenCompra) {
    // console.log(id);
    // console.log(indice);
    this.popUpEmit.emit({ id, indice, ordenCompra });
  }

}
