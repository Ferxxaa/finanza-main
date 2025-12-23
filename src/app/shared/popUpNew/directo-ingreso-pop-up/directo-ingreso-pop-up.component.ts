import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimiento, MovimientoRelationShip } from '../../../models/movimiento';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { CondicionPopUpComponent } from '../condicion-pop-up/condicion-pop-up.component';

@Component({
  selector: 'app-directo-ingreso-pop-up',
  templateUrl: './directo-ingreso-pop-up.component.html',
  styleUrls: ['./directo-ingreso-pop-up.component.css'],
  providers:[
    sMovimientoService
  ]
})
export class DirectoIngresoPopUpComponent implements OnInit {
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

  guardar(movimiento: Movimiento) {
    this.estadoPagoComponent.updateEP();
    this.movimientoService.updateMovimiento(movimiento).subscribe(res => console.log(res));
  }

  updateEmit(){
    this.update.emit();
    this.Cerrar();
  }

  Cerrar() {
    this.close.emit();
  }

}
