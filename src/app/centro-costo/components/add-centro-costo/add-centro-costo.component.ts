import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaNegocio } from '../../../models/nestAreaNegocio';
import { CentroCostoAdd } from '../../../models/nestCentroCosto';
import { areaNegocioService } from '../../../services/Nest/areaNegocioService.service';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';
import { sMandante } from '../../../services/sMandante.service';

declare var Swal: any;

@Component({
  selector: 'app-add-centro-costo',
  templateUrl: './add-centro-costo.component.html',
  styleUrls: ['./add-centro-costo.component.css'],
  providers: [areaNegocioService, centroCostoService]
})
export class AddCentroCostoComponent implements OnInit {

  @Output() addCentroCostoEvent: EventEmitter<boolean>;

  areasNegocio$: Observable<AreaNegocio[]>
  // mandantes$: Observable<any[]>;

  centroCosto: CentroCostoAdd;

  constructor(
    private areaNegocioService: areaNegocioService,
    private centroCostoService: centroCostoService
  ) {
    this.getAreasNegocio();
    this.Limpiar();
    this.addCentroCostoEvent = new EventEmitter();
    // this.mandantes$ = this.Mandante.getMandantes();
  }

  Limpiar() {
    this.centroCosto = this.centroCostoService.init();
  }

  ngOnInit() {
  }

  getAreasNegocio() {
    this.areasNegocio$ = this.areaNegocioService.getAreasNegocio();
  }

  addCentroCosto() {
    this.centroCostoService.addCentroCosto(this.centroCosto).subscribe(res => {
      Swal.fire(
        "Centro Costo",
        "Se ha creado correctamente el centro de costo",
        "success"
      );
      this.Limpiar()
      this.addCentroCostoEvent.emit(true);
    })
  }

}
