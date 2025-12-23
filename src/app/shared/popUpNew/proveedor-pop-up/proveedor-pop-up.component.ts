import { Component, Input, OnInit } from '@angular/core';
import { Proveedor } from '../../../models/nestProveedor';

@Component({
  selector: 'app-proveedor-pop-up',
  templateUrl: './proveedor-pop-up.component.html',
  styleUrls: ['./proveedor-pop-up.component.css']
})
export class ProveedorPopUpComponent implements OnInit {

  @Input() proveedor: Proveedor;

  constructor() { }

  ngOnInit() {
  }

}
