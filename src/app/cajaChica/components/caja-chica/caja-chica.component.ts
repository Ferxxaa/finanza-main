import { Component, OnInit, ViewChild } from '@angular/core';
import { sProfesionales } from '../../../services/sProfesionales.service';
import { mCajaChica } from '../../../models/mCajaChica';
import { sCentroCosto } from '../../../services/sCentroCosto.service';
import { sCajaChica } from './../../../services/sCajaChica'
import { mProfesional } from '../../../models/mProfesional';
import { sCorreo } from '../../../services/sCorreo.service';
import { sGastos } from '../../../services/sGastos.service';
import { mGastos } from '../../../models/mGastos';
import { Observable } from 'rxjs';
import { Profesional } from '../../../models/nestProfesional';
import { profesionalService } from '../../../services/Nest/profesionalesService.service';
import { tipoGastoService } from '../../../services/sTipoGasto.service';
import { TipoGasto } from '../../../models/nestTipoGasto';
import { centroCostoService } from '../../../services/sCentroCostoNest.service';
import { CentroCosto } from '../../../models/nestCentroCosto';
import { SubTipoGasto } from '../../../models/nestSubTipoGasto';
import { subTipoGastoService } from '../../../services/sSubTipoGasto.service';
import { CajaChica } from '../../../models/nestCajaChica';
import { cajaChicaService } from '../../../services/Nest/cajaChicaService.service';
import { environment } from '../../../../environments/environment';
import { ResumenProfesionalComponent } from '../resumen-profesional/resumen-profesional.component';

declare var Swal: any;

@Component({
  selector: 'app-caja-chica',
  templateUrl: './caja-chica.component.html',
  styleUrls: ['./caja-chica.component.css'],
  providers: [
    profesionalService,
    tipoGastoService,
    subTipoGastoService,
    centroCostoService,
    cajaChicaService,
    sCentroCosto,
    sCajaChica,
    sGastos,
    sCorreo,
    sProfesionales
  ]
})
export class CajaChicaComponent implements OnInit {

  @ViewChild(ResumenProfesionalComponent) ResumenProfesionalComponent: ResumenProfesionalComponent;

  cajaChica: CajaChica;
  //Select
  profesionalId: string;
  centroCostoId: string;
  tipoGastoId: string;
  //Async
  centroCosto$: Observable<CentroCosto[]>;
  profesionales$: Observable<Profesional[]>;
  gastos$: Observable<TipoGasto[]>;
  subTipoGasto$: Observable<SubTipoGasto[]>;

  timeoutIdProf: number;

  subTipoGasto
  //loading
  loading: boolean;
  persona: Profesional;

  constructor(
    private profesionalService: profesionalService,
    private tipoGastoService: tipoGastoService,
    private subTipoGastoService: subTipoGastoService,
    private centroCostoService: centroCostoService,
    private cajaChicaService: cajaChicaService,
    private _sCajaChica: sCajaChica,
    private _sCorreo: sCorreo,
  ) {
    this.limpiar()
    this.loading = false;
    this.profesionales$ = this.profesionalService.getProfesionales();
    this.gastos$ = this.tipoGastoService.getTiposGastos();
    this.subTipoGasto$ = this.subTipoGastoService.getSubTiposGastos();
    this.centroCosto$ = this.centroCostoService.getCentroCosto();
  }

  limpiar() {
    this.cajaChica = { idCajaChica: null, monto: null, tipo: 1, descripcion: null, estado: 1, nombreAdjunto: null, isActive: true, fechaCreacion: new Date() }
    this.profesionalId = null;
    this.centroCostoId = null;
    this.timeoutIdProf = null;
    this.persona = null;
  }

  reloadProfesional() {
    this.profesionales$ = this.profesionalService.getProfesionales();
    this.ResumenProfesionalComponent.init();
  }

  ngOnInit() { }

  // selectProfesional(idProfesional: number) {
  // this.timeoutIdProf = null;
  // if (idProfesional)
  //   this.cajaChica.profesional = null;
  // else
  //   this.cajaChica.profesional = null;
  // setTimeout(() => {
  //   this.timeoutIdProf = idProfesional
  // }, 10);
  // }

  // selectCentroCosto(nombre: string) {
  // if (nombre)
  //   this.cajaChica.subCentroCosto = this._sCentroCosto.findCentroCosto(nombre);
  // else
  //   this.cajaChica.subCentroCosto = null;
  // }

  selectTipoGasto(idTipoGasto: any) {
    if (typeof this.cajaChica.tipoGasto == "number")
      this.subTipoGasto$ = this.subTipoGastoService.getSubTipoGastoByIdTipoGasto(this.cajaChica.tipoGasto);
  }

  valida(): boolean {
    if (!this.cajaChica.profesional) {
      Swal.fire(
        "Caja chica",
        "Debe seleccionar un profesional",
        "error"
      );
      return false
    }
    if (this.cajaChica.monto < 1) {
      Swal.fire(
        "Caja chica",
        "No se puede agregar una caja chica con saldo 0 o menor",
        "error"
      );
      return false
    }
    if (!this.cajaChica.centroCosto) {
      Swal.fire(
        "Caja chica",
        "Debe seleccionar un Centro de costo",
        "error"
      );
      return false
    }
    return true
  }

  abrirRendicion() {
    if (typeof this.cajaChica.profesional == "number")
      this.profesionalService.getProfesionalById(this.cajaChica.profesional).subscribe(res => this.persona = res);
  }

  cerrarRendicion(persona: Profesional) {
    this.persona = null;
    this.cajaChica.profesional = 0;
    this.ResumenProfesionalComponent.init()
    setTimeout(() => {
      this.cajaChica.profesional = persona.idProfesional
    }, 200);
    // this.selectProfesional(this.cajaChica.profesional._id);
  }

  reloadResumen() {
    this.ResumenProfesionalComponent.init()
  }

  /****** CRUD ******/

  agregarCajaChica() {
    if (this.valida()) {
      // console.log(this.cajaChica);
      // this._sCajaChica.postCajaChica(this.cajaChica).subscribe(cajaChica => {
      //   this.enviaCorreoGuardar(cajaChica);
      // });
      this.cajaChicaService.addCajaChica(this.cajaChica).subscribe(res => {
        Swal.fire(
          "Caja chica",
          "Se ha registrado un nuevo ingreso de Caja chica para " + res.profesional.nombreProfesional,
          "success"
        );
        this.limpiar();
      });
    }
  }

  enviaCorreoGuardar(cajaChica: CajaChica) {
    this.ResumenProfesionalComponent.init();
    this._sCorreo.postCuentas({
      subject: 'Caja chica',
      // para: 'gomez.romero.oscar@gmail.com',
      para: environment.correoNotificacion,
      messaje: `Estimado,<br><br>Informamos a Ud que se ha creado una caja chica para su gestión
        <br><br>
        <table><tr><td>Descripción : </td><td>${cajaChica.descripcion}</td></tr>
        <tr><td>Centro Costo : </td><td>${this.cajaChica.centroCosto}</td></tr>
        <tr><td>Monto : </td><td>$ ${cajaChica.monto}</td></tr>
        <tr><td>Persona : </td><td>${cajaChica.profesional}</td></tr>
        </table>
        <br><br>
        <a href='http://finanzas.trazas-nbi.com/CajaChica' target='_blank'>Caja Chica<a>`
    }).subscribe(el => {
      Swal.fire(
        "Caja chica",
        "Se ha registrado un nuevo ingreso de Caja chica para " + cajaChica.profesional,
        "success"
      );
      this.limpiar();
    });
  }

}
