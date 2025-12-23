import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { profesionalService } from '../../../services/Nest/profesionalesService.service';
import { Profesional } from '../../../models/nestProfesional';

declare var Swal: any;

@Component({
  selector: 'app-add-profesional',
  templateUrl: './add-profesional.component.html',
  styleUrls: ['./add-profesional.component.css'],
  providers: [profesionalService]
})
export class AddProfesionalComponent implements OnInit {

  @Output() addProfesional = new EventEmitter();

  profesional: Profesional;

  constructor(
    private profesionalService: profesionalService
  ) {
    this.limpiar();
  }

  limpiar() {
    this.profesional = { idProfesional: null, nombreProfesional: "", saldo: null, isActive: true, fechaCreacion: new Date() }
  }

  ngOnInit() {
  }

  agregarProfesional() {

    this.profesionalService.addProfesional(this.profesional).subscribe(profesional => {
      // this._sProfesionales.allProfesionales = [...this._sProfesionales.allProfesionales, profesional];
      // this._sProfesionales.profesionales.next(this._sProfesionales.allProfesionales);
      // this._sProfesionales.addProfesional(profesional);
      this.limpiar();
      Swal.fire(
        "Profesional",
        "Se ha registrado de forma correcta el profesional",
        "success"
      );
      this.addProfesional.emit()
    });
  }

}
