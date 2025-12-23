import { Component, OnInit } from '@angular/core';
import { sMovimientoService } from '../../../services/sMovimiento.service';
import { Observable } from 'rxjs';
import { Movimiento } from '../../../models/movimiento';
import { EvaluacionAdd } from '../../../models/nestEvaluacion';
import { evaluacionService } from '../../../services/Nest/evaluacionService.service';

declare var Swal: any;

@Component({
  selector: 'app-evaluacion-masiva',
  templateUrl: './evaluacion-masiva.component.html',
  styleUrls: ['./evaluacion-masiva.component.css'],
  providers: [
    sMovimientoService,
    evaluacionService
  ]
})
export class EvaluacionMasivaComponent implements OnInit {

  rutProveedor: string;

  movimientos$: Observable<Movimiento[]>

  evaluacion: EvaluacionAdd;
  selectedIndex: number;

  movimientosSeleccionados: Set<Movimiento>;

  constructor(
    private movimientoService: sMovimientoService,
    private evaluacionService: evaluacionService
  ) {
    this.rutProveedor = null;
    this.selectedIndex = -1;
    this.evaluacion = { disponibilidad: 0, precio: 0, tiempo: 0, calidad: 0, ssoma: 0, Comentario: '', isActive: true, fechaCreacion: new Date(), empresa: 3, movimiento: 0 }
    this.movimientosSeleccionados = new Set<Movimiento>();
  }

  ngOnInit() {
  }

  activarEvaluacion(rutProveedor: string) {
    console.log(rutProveedor);

    this.rutProveedor = rutProveedor
    this.movimientos$ = this.movimientoService.getMovbimientoByRutProveedor(rutProveedor);
  }

  selectItem(event: Event, movimiento: Movimiento) {
    const target = (event.target as HTMLElement).closest('li');

    if (target.classList.contains('selected')) {
      target.classList.remove('selected');
      this.movimientosSeleccionados.delete(movimiento);
    } else {
      target.classList.add('selected');
      this.movimientosSeleccionados.add(movimiento);
    }

  }

  getSelectedMovimientos() {
    return Array.from(this.movimientosSeleccionados);
  }

  Actualizar() {
    const selectedItem = this.getSelectedMovimientos();
    const evaluacion: EvaluacionAdd[] = selectedItem.map(el => {
      this.evaluacion.movimiento = el.idMovimiento
      return this.evaluacion
    })
    // console.log(evaluacion);

    this.evaluacionService.addEvaluacionMasiva(evaluacion).subscribe(res => {
      Swal.fire("Evaluación", "Se ha registrado su evaluacion de forma correcta.", "success");
      this.limpiar();
    });

  }

  limpiar() {
    this.rutProveedor = null;
  }

}
