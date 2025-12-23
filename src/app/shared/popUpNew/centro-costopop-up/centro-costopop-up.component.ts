import { Component, Input, OnInit } from '@angular/core';
import { AreaNegocio } from '../../../models/nestAreaNegocio';
import { CentroCosto } from '../../../models/nestCentroCosto';

@Component({
  selector: 'app-centro-costopop-up',
  templateUrl: './centro-costopop-up.component.html',
  styleUrls: ['./centro-costopop-up.component.css']
})
export class CentroCostopopUpComponent implements OnInit {

  @Input() areaNegocio: AreaNegocio;
  @Input() centroCosto: CentroCosto;

  constructor() { }

  ngOnInit() {
  }

}
