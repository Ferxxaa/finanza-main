import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MovimientoRelationShip } from '../../../models/movimiento';
import { EvaluacionAdd } from '../../../models/nestEvaluacion';
import { evaluacionService } from '../../../services/Nest/evaluacionService.service';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { sOrdenPedido } from '../../../services/sOrdenPedido.service';

declare var Swal: any;
declare var $: any;

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
  providers: [
    sOrdenComra,
    sOrdenPedido,
    sMovimientoService,
    evaluacionService
  ]
})
export class EvaluacionComponent implements OnInit {

  @Input() Orden: number;
  @Output() cerrar = new EventEmitter;
  @Output() actualizar = new EventEmitter;

  evaluacion: EvaluacionAdd;
  movimiento: MovimientoRelationShip;

  constructor(
    private _sOrdenCompra: sOrdenComra,
    private _sORdenPedido: sOrdenPedido,
    private movimientoService: sMovimientoService,
    private evaluacionService: evaluacionService
  ) {
    this.evaluacion = { disponibilidad: 3, precio: 3, tiempo: 3, calidad: 3, ssoma: 3, Comentario: null, empresa: environment.empresa, fechaCreacion: new Date(), isActive: true, movimiento: null };
  }

  ngOnInit() {
    // if (this.Orden.proveedor.categoria == 1)
    //   this.evaluacion = { disponibilidad: 3, precio: 3, tiempo: 3, calidad: 3, ssoma: null, observacion: null };
    this.getMovimiento(this.Orden)
  }

  getMovimiento(idMovimiento: number) {
    this.evaluacion.movimiento = idMovimiento;
    this.movimientoService.getMovimientoById(idMovimiento).subscribe(res => {
      this.movimiento = res;
      if (this.movimiento.proveedor.categoria == 1)
        this.evaluacion = { ...this.evaluacion, disponibilidad: 3, precio: 3, tiempo: 3, calidad: 3, ssoma: null };
    });
  }

  evaluar() {
    this.evaluacionService.addEvaluacion(this.evaluacion).subscribe(res => {
      Swal.fire("Evaluación", "Se ha registrado su evaluacion de forma correcta.", "success");
      this.Cerrar();
    });
    // console.log(this.Orden);
    // this.Orden.evaluacion = this.evaluacion;
    // if (this.Orden.folio) {
    //   // console.log("Es una OC");
    //   this._sOrdenCompra.putOrdenCompra(this.Orden).subscribe(res => {
    //     this.actualizar.emit();
    //   });
    // } else {
    //   // console.log("Es una OP");
    //   this._sORdenPedido.putOrdenPedido(this.Orden).subscribe(op => {
    //     this.actualizar.emit();
    //   });
    // }
  }

  Cerrar() {
    this.cerrar.emit();
  }

}
