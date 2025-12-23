import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { mCentroCosto } from "../../../models/mCentroCosto";
import { sCentroCosto } from "../../../services/sCentroCosto.service";
import { sVis_UsuarioPersona } from "../../../services/sVis_UsuarioPersona.service";
import { mVis_UsuarioPersona } from "../../../models/mVis_UsuarioPersona";
import { mSubCentroCosto } from "../../../models/mSubCentroCosto";
import { sMandante } from "../../../services/sMandante.service";
import { Observable } from "rxjs";

declare var Swal: any;

@Component({
  selector: "app-edit-centro-costo",
  templateUrl: "./edit-centro-costo.component.html",
  styleUrls: ["./edit-centro-costo.component.css"],
  providers: [sVis_UsuarioPersona, sMandante],
})
export class EditCentroCostoComponent implements OnInit {
  @Input() eCentroCosto: mCentroCosto;
  @Input() indiceSub: any;
  @Output() loadingEmit = new EventEmitter();
  @Output() cerrarEmit = new EventEmitter();
  @Output() carDatos = new EventEmitter();

  eSubCentroCostoDatos: mSubCentroCosto;
  usuarios: mVis_UsuarioPersona[];

  cliente: number;
  mandantes$: Observable<any>;

  constructor(
    private _sCentroCosto: sCentroCosto,
    private _sVisUsuarioPersona: sVis_UsuarioPersona,
    private Mandante: sMandante
  ) { }

  ngOnInit() {
    console.clear();
    // this.eCentroCosto.solicita.id=this.eCentroCosto.solicita && this.eCentroCosto.solicita.id ? this.eCentroCosto.solicita.id : 0;
    this.eSubCentroCostoDatos = this.eCentroCosto.subCentroCosto[
      this.indiceSub
    ];
    if (!this.eSubCentroCostoDatos.contrato)
      this.eSubCentroCostoDatos.contrato = [{ nombre: this.eSubCentroCostoDatos.nombre, monto: null }]
    this._sVisUsuarioPersona.getVis_UsuarioPersona().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
    this.mandantes$ = this.Mandante.getMandantes();
  }

  // selectUsuario() {
  //   console.log(this.eSubCentroCostoDatos.solicita);
  //   this._sVisUsuarioPersona
  //     .getVis_UsuarioPersonabyID(this.eSubCentroCostoDatos.solicita.idUsuario)
  //     .subscribe(usuario => {
  //       // console.log(usuario);
  //       this.eSubCentroCostoDatos.solicita = usuario;
  //     });
  // }

  cambiaCliente(cliente) {
    this.mandantes$.subscribe(res => {
      this.eSubCentroCostoDatos.cliente = res.find(el => el.IdMandante == cliente);
    })
  }

  Actualizar() {
    this.loadingEmit.emit(true);
    this.eCentroCosto.subCentroCosto.splice(
      this.indiceSub,
      1,
      this.eSubCentroCostoDatos
    );
    this._sCentroCosto
      .putCentroCosto(this.eCentroCosto)
      .subscribe((res) => {
        this.carDatos.emit();
        this.loadingEmit.emit(false);
        Swal.fire(
          "Centro de Costo",
          "Se ha actualizado de forma correcta el centro de costo",
          "success"
        );
        this.cerrarEmit.emit();
      });
    // console.log(this.eCentroCosto);
  }

  cerrar() {
    this.cerrarEmit.emit();
  }
}
