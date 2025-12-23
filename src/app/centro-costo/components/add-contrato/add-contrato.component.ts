import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { mContrato, mCentroCosto } from "./../../../models/mCentroCosto";
import { sCentroCosto } from "../../../services/sCentroCosto.service";
import { mSubCentroCosto } from "../../../models/mSubCentroCosto";
import { contratoService } from "../../../services/Nest/contratoService.service";
import { Contrato, ContratoAdd } from "../../../models/nestContrato";
import { Observable } from "rxjs";
import { CentroCosto } from "../../../models/nestCentroCosto";

declare var Swal: any;

@Component({
  selector: "app-add-contrato",
  templateUrl: "./add-contrato.component.html",
  styleUrls: ["./add-contrato.component.css"],
  providers: [
    contratoService
  ]
})
export class AddContratoComponent implements OnInit {
  @Input() centroCosto: CentroCosto;
  @Output() cerrar = new EventEmitter();

  contratos$: Observable<Contrato[]>;

  contrato: ContratoAdd;
  indiceSubCentro: number;
  indiceEditar: number;

  constructor(
    private _sCentroCosto: sCentroCosto,
    private contratoService: contratoService
  ) {
    this.contrato = this.contratoService.init();
    this.indiceSubCentro = null;
    this.indiceEditar = -1;
  }

  ngOnInit() {
    console.clear();
    // console.log(this.centroCosto);
    this.contrato.centroCosto = this.centroCosto.idCentroCosto;
    this.contratos$ = this.contratoService.getContratoByIdCentroCosto(this.centroCosto.idCentroCosto);
    // this.getCentroCosto(
    //   this.idCentroCosto._id,
    //   this.idCentroCosto.subCentroCosto
    // );
  }

  // getCentroCosto(id: string, subCentro: string) {
  //   this._sCentroCosto.getCentroCostobyID(id).subscribe((centroCosto) => {
  //     this.centroCosto = centroCosto;
  //     this.indiceSubCentro = centroCosto.subCentroCosto.findIndex(
  //       (el) => el.nombre == subCentro
  //     );
  //     this.subCentro = centroCosto.subCentroCosto[this.indiceSubCentro];
  //     this.subCentro.contrato = this.subCentro.contrato.filter(el => el.monto > 0)
  //   });
  // }

  crearContrato() {
    // console.log(this.subCentro.contrato);
    // if (this.indiceEditar >= 0) {
    //   this.subCentro.contrato.splice(this.indiceEditar, 1, this.contrato)
    // } else {
    //   this.subCentro.contrato.push(this.contrato);
    // }
    this.contratoService.addContrato(this.contrato).subscribe(res => {
      this.cancelar();
      Swal.fire(
        "Contrato",
        "Se ha creado de forma correcta el contrato",
        "success"
      );
    })
    // this.subCentro.contrato = this.subCentro.contrato.filter(el => el.monto > 0)
    // this.centroCosto.subCentroCosto.splice(this.indiceSubCentro, 1, this.subCentro);
    // console.log(this.centroCosto);
    // this._sCentroCosto
    //   .putCentroCosto(this.centroCosto)
    //   .subscribe((centroCosto) => {
    //     this.cancelar();
    //     Swal.fire(
    //       "Contrato",
    //       "Se ha creado de forma correcta el contrato",
    //       "success"
    //     );
    //   },
    //     error => {
    //       Swal.fire(
    //         "Contrato",
    //         "Ha ocurrido un error al guardar el contrato",
    //         "error"
    //       );
    //     });
  }

  cargaContrato(contrato: Contrato) {
    this.contratoService.getContratoById(contrato.idContrato).subscribe(res => {
      this.contrato = { ...res, centroCosto: res.centroCosto.idCentroCosto, empresa: res.empresa.idEmpresa };
    })
  }

  cancelar() {
    this.cerrar.emit();
  }
}
