import { Component, OnInit, Input } from '@angular/core';
import { mProveedor } from '../../../models/mProveedor';

@Component({
  selector: 'app-pop-up-proveedor',
  templateUrl: './pop-up-proveedor.component.html',
  styleUrls: ['./pop-up-proveedor.component.css']
})
export class PopUpProveedorComponent implements OnInit {

  @Input() proveedor:mProveedor;
  @Input() fechaCreacion:string;

  constructor() { }

  ngOnInit() {
  }

}
