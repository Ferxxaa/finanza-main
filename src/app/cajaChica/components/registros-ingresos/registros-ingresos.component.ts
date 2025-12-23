import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { mCajaChica } from '../../../models/mCajaChica';
import { sCajaChica } from '../../../services/sCajaChica';
import { Observable } from 'rxjs';
import { sProfesionales } from '../../../services/sProfesionales.service';
import { environment } from '../../../../environments/environment';
import { Http, Response } from '@angular/http';
import { mOrdenCompra } from '../../../models/mOrdenCompra';
import { mCentroCosto } from '../../../models/mCentroCosto';
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { comunesFechas } from '../../../share/fechas';
import { Profesional } from '../../../models/nestProfesional';
import { profesionalService } from '../../../services/Nest/profesionalesService.service';
import { CajaChica } from '../../../models/nestCajaChica';
import { cajaChicaService } from '../../../services/Nest/cajaChicaService.service';

declare var Swal: any;

@Component({
  selector: 'app-registros-ingresos',
  templateUrl: './registros-ingresos.component.html',
  styleUrls: ['./registros-ingresos.component.css'],
  providers: [
    sOrdenComra,
    comunesFechas,
    sProfesionales,
    profesionalService,
    cajaChicaService
  ]
})
export class RegistrosIngresosComponent implements OnInit, OnChanges {

  @Input() profesionalId: number;
  @Output() rendicion = new EventEmitter();
  @Output() reloadResumenProfesional = new EventEmitter();

  profesional$: Observable<Profesional>;
  // cajaChicas$: Observable<mCajaChica[]>;
  // saldo: number;

  // ngIf
  GerenteAdmin

  //Links
  url: string;

  constructor(
    private profesionalService: profesionalService,
    private cajaChicaServive: cajaChicaService,
    private _sCajaChica: sCajaChica,
    private _sProfesional: sProfesionales,
    private _http: Http,
    private _sOrdenCompra: sOrdenComra,
    private _sComunesFechas: comunesFechas
  ) {
    // this.saldo = 0
    this.url = environment.node + "adjuntar/";
    this.GerenteAdmin = false;
  }

  ngOnInit() {
    // console.log(this.profesionalId);
    // this._sProfesional.getProfesionalesId(this.profesionalId).subscribe(prof => {
    //   this.profesional = prof;
    //   this.saldo = prof.saldo;
    // });
    // this.cajaChicas$ = this._sCajaChica.getCajaChicaByProfesional(this.profesionalId);
    // console.log(this.cajaChicas$);
    this.profesional$ = this.profesionalService.getProfesionalById(this.profesionalId)
    this.getPerfil();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.profesional$ = this.profesionalService.getProfesionalById(this.profesionalId);
  }

  getPerfil() {
    let user = JSON.parse(localStorage.usuario);
    this._http.get('http://trazas-nbi.com:1234/api/UsuariosPerfiles/GetUsuariosPerfilesByIdUsuario/IdUsuario=' + user.idUsuario)
      .map((res: Response) => res.json())
      .subscribe(data => {
        // console.log(this.usuario);
        // console.log(data);
        data.forEach(element => {
          if (element.idPerfil == 11) this.GerenteAdmin = true;
        });
        // console.log(this.GerenteAdmin);
      });
  }

  activarPopUp() {
    this.rendicion.emit();
  }

  Aprobar(cajaChica: CajaChica) {
    // console.log(cajaChica);
    // cajaChica.estado = 3;
    // this._sCajaChica.putCajaChica(cajaChica).subscribe(actualizado => {
    //   this.agregarFlujoCaja(actualizado);
    //   this.cajaChicas$ = this._sCajaChica.getCajaChicaByProfesional(this.profesionalId);
    // });
    this.cajaChicaServive.aprobarCajaChica(cajaChica).subscribe(res => {
      this.profesional$ = this.profesionalService.getProfesionalById(this.profesionalId);
      this.reloadResumenProfesional.emit();
      Swal.fire(
        "Caja chica",
        "Se ha aprobado la caja chica",
        "success"
      );
    });
  }

  agregarFlujoCaja(cajaChica: CajaChica) {
    // let ordenCompra: mOrdenCompra;
    // let item: any;
    // let centroCosto: mCentroCosto;

    // item = { codigo: null, detalle: null, cantidad: 1, declaracion: null, moneda: 'CLP', precioUnitario: null };
    // centroCosto = new mCentroCosto(null, "Caja chica", [cajaChica.subCentroCosto], true, null)
    // ordenCompra = { _id: null, folio: null, proveedor: { nombre: null, direccion: null, rutProveedor: null, telefono: null, contacto: null, mail: null }, centroCosto: centroCosto, subCentroCosto: cajaChica.subCentroCosto.nombre, tipoGasto: cajaChica.tipoGasto, subTipoGasto: cajaChica.subTipoGasto, metodoPago: "0", Items: [], estadosPagos: [{ opcion: "7", fecha: cajaChica.fechaCreacion, monto: cajaChica.monto, metodoPago: 0, estado: 4 }], solicita: null, descripcion: "Caja chica " + cajaChica.profesional.nombre, despacho: null, usuarioCreador: null, usuarioAprovador: null, evaluacion: null, observacionCantidad: null, observacionCalidad: null, Estado: 2, fechaCreacion: null, cotizacion: null, prioridad: null, iva: 0, boleta: 0, correo: false, ingresoEgreso: 1, motivo: null, condicionPago: null, chequeEmitido: false, sobregiro: 0 };


    // console.log(ordenCompra);
    // this._sOrdenCompra.postOrdenCompra(ordenCompra).subscribe(OC => {
    // });
  }

  rechazar(cajaChica: CajaChica) {
    // console.log(cajaChica);
    // cajaChica.estado = 2
    // this._sCajaChica.putCajaChica(cajaChica).subscribe(actualizado => {
    //   Swal.fire(
    //     "Caja chica",
    //     "Se ha rechazado la caja chica",
    //     "error"
    //   );
    //   this.cajaChicas$ = this._sCajaChica.getCajaChicaByProfesional(this.profesionalId);
    // });
    this.cajaChicaServive.anularCajaChica(cajaChica).subscribe(res => {
      this.reloadResumenProfesional.emit();
      this.profesional$ = this.profesionalService.getProfesionalById(this.profesionalId);
      Swal.fire(
        "Caja chica",
        "Se ha aprobado la caja chica",
        "success"
      );
    });
  }

  // retSaldo(monto: number) {
  //   let saldo = 0;
  //   saldo = this.saldo + monto;
  //   return saldo
  // }

}
