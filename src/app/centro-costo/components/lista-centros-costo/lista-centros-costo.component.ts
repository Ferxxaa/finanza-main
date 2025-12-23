import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';

@Component({
  selector: 'app-lista-centros-costo',
  templateUrl: './lista-centros-costo.component.html',
  styleUrls: ['./lista-centros-costo.component.css'],
  providers: [centroCostoService]
})
export class ListaCentrosCostoComponent implements OnInit {

  @Output() configBolsa: EventEmitter<CentroCosto>;
  @Output() configIngreso: EventEmitter<CentroCosto>;
  @Output() configContrato: EventEmitter<CentroCosto>;
  @Output() configGarantia: EventEmitter<CentroCosto>;

  p: number;
  centrosCosto$: Observable<CentroCosto[]>;
  eCentroCosto: CentroCosto;

  constructor(
    private centroCostoService: centroCostoService
  ) {
    this.configBolsa = new EventEmitter();
    this.configIngreso = new EventEmitter();
    this.configContrato = new EventEmitter();
    this.configGarantia = new EventEmitter();
    this.centrosCosto$ = this.centroCostoService.getCentroCostoWithParentFull();
    this.eCentroCosto = null;
  }

  ngOnInit() {
  }

  update() {
    this.centrosCosto$ = this.centroCostoService.getCentroCostoWithParentFull();
    this.eCentroCosto = null;
  }

  popUp(centroCoosto: CentroCosto) {
    this.centroCostoService.getCentroCostoById(centroCoosto.idCentroCosto).subscribe((res) => {
      this.eCentroCosto = res;
    });
  }

  configurarBolsas(centroCosto: CentroCosto) {
    this.configBolsa.emit(centroCosto);
  }

  configurarIngresos(centroCosto: CentroCosto) {
    this.configIngreso.emit(centroCosto);
  }

  configurarContratos(centroCosto: CentroCosto) {
    this.configContrato.emit(centroCosto);
  }

  garantiaCentroCostos(centroCosto: CentroCosto) {
    this.configGarantia.emit(centroCosto);
  }

}
