import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimiento, MovimientoRelationShip } from '../../../models/movimiento';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { CondicionPopUpComponent } from '../condicion-pop-up/condicion-pop-up.component';

@Component({
  selector: 'app-directo-pop-up',
  templateUrl: './directo-pop-up.component.html',
  styleUrls: ['./directo-pop-up.component.css'],
  providers: [
    sMovimientoService
  ]
})
export class DirectoPopUpComponent implements OnInit {

  @Input() idMovimiento: number;
  @Output() close = new EventEmitter()
  @Output() update = new EventEmitter()

  @ViewChild(CondicionPopUpComponent) estadoPagoComponent: CondicionPopUpComponent;

  movimiento$: Observable<MovimientoRelationShip>

  constructor(
    private movimientoService: sMovimientoService
  ) { }

  ngOnInit() {
    this.movimiento$ = this.movimientoService.getMovimientoById(this.idMovimiento);
  }

  closeEvent() {
    this.close.emit();
  }

  updateEmit() {
    this.update.emit();
    this.Cerrar();
  }

  guardar(movimiento: Movimiento) {
    this.estadoPagoComponent.updateEP();
    this.movimientoService.updateMovimiento(movimiento).subscribe(res => console.clear());
  }

  Cerrar() {
    this.close.emit();
  }

}
