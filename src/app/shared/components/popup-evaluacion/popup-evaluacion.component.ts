import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { mVis_UsuarioPersona } from '../../../models/mVis_UsuarioPersona';
import { Evaluacion } from '../../../models/nestEvaluacion';
import { evaluacionService } from '../../../services/Nest/evaluacionService.service';
import { sVis_UsuarioPersona } from '../../../services/sVis_UsuarioPersona.service';

@Component({
  selector: 'app-popup-evaluacion',
  templateUrl: './popup-evaluacion.component.html',
  styleUrls: ['./popup-evaluacion.component.css'],
  providers: [
    sVis_UsuarioPersona,
    evaluacionService
  ]
})
export class PopupEvaluacionComponent implements OnInit {

  @Input() idMovimiento: number;
  @Input() solicitante;

  evaluacion$: Observable<Evaluacion>;
  persona$: Observable<mVis_UsuarioPersona>;

  constructor(
    private UsuarioPersona: sVis_UsuarioPersona,
    private evaluacionService: evaluacionService
  ) {

  }

  ngOnInit() {
    // console.log(this.evaluacion);
    console.log(this.solicitante);

    if (this.solicitante)
      this.persona$ = this.UsuarioPersona.getVis_UsuarioPersonabyidUsuario(this.solicitante)
    if (this.solicitante.id)
      this.persona$ = this.UsuarioPersona.getVis_UsuarioPersonabyidUsuario(this.solicitante.id)
    this.evaluacion$ = this.evaluacionService.getEvaluacionByIdMovimiento(this.idMovimiento);
  }

  retPromedio(evaluacion: Evaluacion): number {
    let { disponibilidad, precio, tiempo, calidad, ssoma } = evaluacion
    if (ssoma)
      return (disponibilidad + precio + tiempo + calidad + ssoma) / 5
    else
      return (disponibilidad + precio + tiempo + calidad) / 4
  }

}
