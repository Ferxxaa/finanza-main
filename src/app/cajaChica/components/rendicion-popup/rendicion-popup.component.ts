import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { mCentroCosto } from '../../../models/mCentroCosto';
import { sCentroCosto } from '../../../services/sCentroCosto.service';
import { Observable } from 'rxjs';
import { mCajaChica } from '../../../models/mCajaChica';
import { sCajaChica } from '../../../services/sCajaChica';
import { mProfesional } from '../../../models/mProfesional';
import { sCotizacion } from '../../../services/sCotizacion.service';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { CajaChica } from '../../../models/nestCajaChica';
import { Profesional } from '../../../models/nestProfesional';
import { cajaChicaService } from '../../../services/Nest/cajaChicaService.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-rendicion-popup',
  templateUrl: './rendicion-popup.component.html',
  styleUrls: ['./rendicion-popup.component.css'],
  providers: [
    sCotizacion
  ]
})
export class RendicionPopupComponent implements OnInit {

  @Input() persona: Profesional;
  @Output() salir = new EventEmitter();

  centroCosto$: Observable<mCentroCosto[]>;
  centrsoCosto$: Observable<CentroCosto[]>;

  cajaChica: CajaChica;

  loading: boolean;

  //Select
  centroCostoId: string;

  constructor(
    private centroCostoService: centroCostoService,
    private cajaChicaService: cajaChicaService,
    private _sCentroCosto: sCentroCosto,
    private _sCajaChica: sCajaChica,
    private _sCotizacion: sCotizacion
  ) {
    this.centrsoCosto$ = this.centroCostoService.getCentroCosto();
    // this.centroCosto$ = this._sCentroCosto.getCentroCosto();
    this.cajaChica = { idCajaChica: null, monto: null, tipo: 2, descripcion: null, estado: 1, nombreAdjunto: null, isActive: true, fechaCreacion: new Date() }
    // this.cajaChica = new mCajaChica(null, null, null, null, 2, null, 1, null, null, null);
    this.loading = false;
  }

  ngOnInit() {
    this.cajaChica.profesional = this.persona.idProfesional;
  }

  NombreArchivo() {
    $("#NombreArch").html($("#fileupload1")[0].files[0].name);
    this.cajaChica.nombreAdjunto = $("#fileupload1")[0].files[0].name;
  }

  selectCentroCosto(nombre: string) {
    // if (nombre)
    //   this.cajaChica.subCentroCosto = this._sCentroCosto.findCentroCosto(nombre);
    // else
    //   this.cajaChica.subCentroCosto = null;
  }

  cerrar() {
    this.salir.emit(this.persona);
  }

  guardar() {
    this.loading = true;
    this.centrsoCosto$.subscribe(centros => {
      const rendicion = centros.find(el => el.nombreCentroCosto == "Rendición")
      this.cajaChica.centroCosto = rendicion;
      this._sCotizacion.AdjuntarArchivo($("#fileupload1")[0].files[0]).then((res: any) => {
        this.cajaChica.nombreAdjunto = res.files.adjuntar.originalFilename;
        this.cajaChicaService.addCajaChica(this.cajaChica).subscribe(cajaChica => {
          this.loading = false;
          Swal.fire(
            "Rendición",
            "Se ha registrado un nueva rendicion de Caja chica para " + this.persona.nombreProfesional,
            "success"
          );
          this.cerrar();
        });
      });
    })
    
  }

}
