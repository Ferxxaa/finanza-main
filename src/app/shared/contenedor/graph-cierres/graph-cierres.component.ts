import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { GarphCierresComponent } from '../../components/garph-cierres/garph-cierres.component';

@Component({
  selector: 'app-graph-cierres',
  templateUrl: './graph-cierres.component.html',
  styleUrls: ['./graph-cierres.component.css']
})
export class GraphCierresComponent implements OnInit {

  @ViewChild(GarphCierresComponent) graficoCierres: GarphCierresComponent
  @Output() cerrar = new EventEmitter

  constructor() { }

  ngOnInit() {
  }

  displayGraph(e) {
    this.graficoCierres.genGraph(e)
  }

  salir() {
    this.cerrar.emit();
  }

  noCerrar(e){
    e.stopPropagation();
  }

}
