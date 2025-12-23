import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AreaNegocio } from '../../../models/nestAreaNegocio';
import { areaNegocioService } from '../../../services/Nest/areaNegocioService.service';

declare var Swal: any;

@Component({
  selector: 'app-add-area-negocio',
  templateUrl: './add-area-negocio.component.html',
  styleUrls: ['./add-area-negocio.component.css'],
  providers: [
    areaNegocioService
  ]
})
export class AddAreaNegocioComponent implements OnInit {

  @Output() addAreaNegocio: EventEmitter<boolean>;

  areaNegocio: AreaNegocio;

  constructor(
    private areaNegocioService: areaNegocioService
  ) {
    this.addAreaNegocio = new EventEmitter()
    this.Limpiar();
  }

  ngOnInit() {
  }

  Agregar() {
    this.areaNegocioService.addAreaNegocio(this.areaNegocio).subscribe(res => {
      Swal.fire(
        "Area de Negocio",
        "Se ha creado correctamente el area de negocio",
        "success"
      );
      this.Limpiar();
      this.addAreaNegocio.emit(true);
    })
  }

  Limpiar() {
    this.areaNegocio = this.areaNegocioService.init();
  }

}
