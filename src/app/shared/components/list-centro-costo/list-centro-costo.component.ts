import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { mCentroCosto } from '../../../models/mCentroCosto';
import { sCentroCosto } from '../../../services/sCentroCosto.service';

@Component({
  selector: 'app-list-centro-costo',
  templateUrl: './list-centro-costo.component.html',
  styleUrls: ['./list-centro-costo.component.css'],
  providers: [
    sCentroCosto
  ]
})
export class ListCentroCostoComponent implements OnInit {


  getCentroCostos$: Observable<mCentroCosto[]>;
  centrosSelected: string[];

  @Output() listadoCentroSelected = new EventEmitter;

  constructor(
    private CentroCosto: sCentroCosto
  ) {
    this.getCentroCostos$ = this.CentroCosto.getCentroCosto();
    this.centrosSelected = [];
  }

  ngOnInit() {
  }

  activate(centro: string) {
    if (this.centrosSelected.includes(centro))
      this.centrosSelected.splice(this.centrosSelected.indexOf(centro), 1);
    else
      this.centrosSelected.push(centro);
    this.listadoCentroSelected.emit(this.centrosSelected);
  }

  isActive(centro: string) {
    if (this.centrosSelected.includes(centro))
      return true;
    else
      return false;
  }

}
