import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { mProveedor } from '../../../models/mProveedor';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { Garantia, GarantiaAdd } from '../../../models/nestGarantia';
import { Proveedor } from '../../../models/nestProveedor';
import { garantiaService } from '../../../services/Nest/garantiaService.service';
import { nestProveedorService } from '../../../services/nestProfesional.service';
import { sMandante } from '../../../services/sMandante.service';

declare var Swal: any;

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styleUrls: ['./garantias.component.css'],
  providers: [
    nestProveedorService,
    sMandante,
    garantiaService
  ]
})
export class GarantiasComponent implements OnInit {

  tipoGarantia: string[]
  bancos: string[]

  garantia: GarantiaAdd;
  garantiaBool: boolean;
  garantias: Observable<Garantia[]>;

  proveedores: Observable<Proveedor[]>
  mandantes: Observable<any>

  @Input() centroCosto: CentroCosto;

  @Output() cerrar = new EventEmitter();



  constructor(
    private proveedorService: nestProveedorService,
    private sMandante: sMandante,
    private garantiaService: garantiaService
  ) {
    this.clean();
  }

  clean() {
    this.tipoGarantia = environment.tipoGarantia;
    this.garantia = this.garantiaService.init();
    this.garantiaBool = true;
    this.proveedores = this.proveedorService.getProveedores();
    this.mandantes = this.sMandante.getMandantes();
    this.bancos = environment.bancos;
  }

  ngOnInit() {
    this.garantias = this.garantiaService.getGarantiaByIdCentroCosto(this.centroCosto.idCentroCosto);
    this.garantia.centroCosto = this.centroCosto;
  }

  saveGarantia() {
    this.garantiaService.addGarantia(this.garantia).subscribe(res => {
      this.alertar();
      this.cerrar.emit();
    })
  }

  alertar() {
    Swal.fire(
      "Garantia",
      "Se ha creado de forma correcta la garantia",
      "success"
    )
  }

  editGarantia(centroCosto, item) {
    return { ...centroCosto, garantia: centroCosto.garantia.map(el => el.documentNumber == item.documentNumber ? item : el) }
  }

  changeState(item: Garantia, state: number) {
    item.estado = state;
    this.garantiaService.putGarantia(item).subscribe(res => {})
  }

}
