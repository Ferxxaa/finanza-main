import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";

import { mCentroCosto } from "../../../models/mCentroCosto";
import { mSubCentroCosto } from "../../../models/mSubCentroCosto";
import { CentroCosto } from "../../../models/nestCentroCosto";
import { sCentroCosto } from "../../../services/sCentroCosto.service";
import { sMandante } from "../../../services/sMandante.service";
import { AddCentroCostoComponent } from "../add-centro-costo/add-centro-costo.component";

declare var Swal: any;

@Component({
  selector: "app-centro-costo",
  templateUrl: "./centro-costo.component.html",
  styleUrls: ["./centro-costo.component.css"],
  providers: [sCentroCosto, sMandante],
})
export class CentroCostoComponent implements OnInit {
  p: any;

  @ViewChild(AddCentroCostoComponent) AddCentroCostoComponent: AddCentroCostoComponent;

  mandantes$: Observable<any>;

  centroCosto: mCentroCosto;
  subCentroCosto: mCentroCosto;
  eCentroCosto: mCentroCosto;
  subCentroCostoDatos: mSubCentroCosto;
  eSubCentroCostoDatos: mSubCentroCosto;
  centrosCostos: Array<mCentroCosto>;
  tabla: Array<any>;

  indiceSub: number;

  garantiaCentroCosto: CentroCosto;

  //PopUp
  loading: boolean;
  bolsa: any;
  confBolsa: Object;
  confIngresos: Object;
  confContratos: Object;

  cliente: any;

  constructor(
    private _sCentroCosto: sCentroCosto,
    private Mandante: sMandante
  ) {
    this.bolsa = null;
    this.loading = true;
    this.confBolsa = null;
    this.confIngresos = null;
    this.Limpiar();
  }

  reloadAreaNegocio() {
    this.AddCentroCostoComponent.getAreasNegocio();
  }

  reloadCentroCosto() {

  }

  Limpiar() {
    this.eCentroCosto = null;
    this.eSubCentroCostoDatos = null;
    this.garantiaCentroCosto = null;
    this.centroCosto = {
      _id: null,
      nombre: null,
      subCentroCosto: [],
      fechaCreacion: null,
      activo: true
    };
    this.subCentroCosto = {
      _id: "0",
      nombre: null,
      subCentroCosto: [],
      fechaCreacion: null,
      activo: true
    };
    this.subCentroCostoDatos = {
      nombre: null,
      responsable: [],
      activo: true,
      fondo: "#ffffff",
      letras: "#000000",
      montoProgramado: null,
      contrato: null
    };
  }

  CargaDatos() {
    this.tabla = [];
    this._sCentroCosto.getCentroCosto().subscribe(
      (res) => {
        this.centrosCostos = res;
        res.forEach((ccosto) => {
          let index: number = 0;
          ccosto.subCentroCosto.forEach((sccosto) => {
            this.tabla.push({
              _id: ccosto._id,
              indice: index,
              centroCosto: ccosto.nombre,
              subCentroCosto: sccosto.nombre,
              fondo: sccosto.fondo,
              letras: sccosto.letras,
              responsable: sccosto.responsable,
              activo: sccosto.activo
            });
            index++;
          });
        });
        this.loading = false;
      },
      (error) => {
        Swal.fire(
          "Error",
          "Error al cargar los datos, favor intentar nuevamente",
          "error"
        );
        this.loading = false;
      }
    );
    // this._sCentroCosto.getCentroCosto().subscribe(res => {
    //   this.centrosCostos = res;
    //   this.tabla = res;
    //   console.log(this.tabla);
    // });
  }

  ngOnInit() {
    console.clear();
    this.CargaDatos();
    // console.log("Llamar a mandantes");
    this.mandantes$ = this.Mandante.getMandantes();
    // this.mandantes$.subscribe(res => console.log(res));
  }

  agregaBolsas(areaNegocio) {
    this.bolsa = areaNegocio;
  }

  configurarBolsas(el) {
    this.confBolsa = el;
  }

  configurarIngresos(el) {
    this.confIngresos = el;
  }

  configurarContratos(el) {
    this.confContratos = el;
  }

  cambiaCliente(cliente) {
    this.mandantes$.subscribe(res => {
      this.subCentroCostoDatos.cliente = res.find(el => el.IdMandante == cliente);
    })
  }

  Agregar() {
    this.loading = true;
    this._sCentroCosto.postCentroCosto(this.centroCosto).subscribe((res) => {
      this.Limpiar();
      this.CargaDatos();
      this.loading = false;
      Swal.fire(
        "Area de negocio",
        "Se ha creado correctamente el Area de negocio",
        "success"
      );
    });
  }

  AsignaCentroCosto() {
    this._sCentroCosto
      .getCentroCostobyID(this.subCentroCosto._id)
      .subscribe((res) => {
        this.subCentroCosto = res;
      });
  }

  AgregaSubCentroCosto() {
    this.loading = true;
    this.subCentroCosto.subCentroCosto.push(this.subCentroCostoDatos);
    this._sCentroCosto.putCentroCosto(this.subCentroCosto).subscribe((res) => {
      this.Limpiar();
      this.CargaDatos();
      this.loading = false;
      Swal.fire(
        "Centro de Costo",
        "Se ha creado correctamente el centro de costo",
        "success"
      );
    });
  }

  garantiaCentroCostos(centroCosto:CentroCosto) {
    // console.log(subcentro);
    this.garantiaCentroCosto = centroCosto;
  }

  popUp(i) {
    this.indiceSub = i.indice;
    // console.log(i);
    // console.log(this.tabla[i]);
    this._sCentroCosto.getCentroCostobyID(i._id).subscribe((res) => {
      this.eCentroCosto = res;
      this.eSubCentroCostoDatos = res.subCentroCosto[i.indice];
    });
  }

  // Actualizar() {
  //   this.loading = true;
  //   this.eCentroCosto.subCentroCosto.splice(this.indiceSub, 1);
  //   this.eCentroCosto.subCentroCosto.push(this.eSubCentroCostoDatos);
  //   this._sCentroCosto.putCentroCosto(this.eCentroCosto).subscribe(res => {
  //     this.Limpiar();
  //     this.CargaDatos();
  //     this.loading = false;
  //     Swal.fire(
  //       'Centro de Costo',
  //       'Se ha actualizado de forma correcta el centro de costo',
  //       'success'
  //     );
  //   });
  //   // console.log(this.eCentroCosto);
  // }

  cargando(e) {
    this.loading = e;
  }
}
