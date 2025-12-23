import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.component.html',
  styleUrls: ['./correcto.component.css']
})
export class CorrectoComponent implements OnInit {

  @Input() text: string;
  @Output() cerrarEvent = new EventEmitter;


  mensaje: string;

  limpiar: any;

  constructor() {
    this.mensaje = null;
    this.limpiar = { ok: null, error: null };
  }

  ngOnInit() {
    this.mensaje = this.text;
    // $("btnOk").focus();
  }

  cerrar() {
    this.cerrarEvent.emit();
  }

}
