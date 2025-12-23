import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { sCentroCosto } from "../../../services/sCentroCosto.service";
import { sBolsas } from "../../../services/sBolsas.service";

@Component({
  selector: "app-view-bolsas",
  templateUrl: "./view-bolsas.component.html",
  styleUrls: ["./view-bolsas.component.css"],
  providers: [sCentroCosto, sBolsas],
})
export class ViewBolsasComponent implements OnInit {
  @Output() cerrar = new EventEmitter();

  loading: boolean;
  centroCostoBolsas: Array<any>;

  constructor(private _sCentroCosto: sCentroCosto, private _sBolsas: sBolsas) {
    this.loading = true;
    this.centroCostoBolsas = [];
  }

  ngOnInit() {
    console.clear();
    this.traeCentros();
  }

  traeCentros() {
    this._sCentroCosto.fetchCentroCosto().then((centrosCosto) => {
      centrosCosto.forEach((centroCosto, icentroCosto) => {
        centroCosto.subCentroCosto.forEach((subCentro, isubCentro) => {
          this.getDatosBolsa(
            centroCosto,
            subCentro,
            icentroCosto,
            isubCentro,
            centrosCosto,
            centroCosto.subCentroCosto
          );
        });
      });
    });
  }

  getDatosBolsa(
    centroCosto,
    subCentro,
    indiceCentro: number,
    indiceSubCentro: number,
    arrCentroCosto: Array<any>,
    arrSubCentro: Array<any>
  ) {
    this._sBolsas
      .getBolsasIdCentroCosto(centroCosto._id, subCentro.nombre)
      .subscribe((bolsas) => {
        let { nombre } = subCentro;
        this.centroCostoBolsas.push({
          nombre,
          ...subCentro,
          ...this.retValorBolsas(bolsas),
        });
        console.log(arrCentroCosto.length, indiceCentro);
        console.log(arrSubCentro.length, indiceSubCentro);
        if (
          arrCentroCosto.length - 1 == indiceCentro &&
          arrSubCentro.length - 1 == indiceSubCentro
        )
          this.loading = false;
      });
  }

  retValorBolsas(bolsas) {
    let generales: number = 0,
      manoObra: number = 0,
      materiales: number = 0,
      imposiciones: number = 0,
      iva: number = 0,
      total: number = 0;
    bolsas.forEach((bolsa) => {
      switch (bolsa.tipoBolsa) {
        case 1:
          generales = this.retTotalPorTipoBolsa(bolsa.pagos);
          break;
        case 2:
          manoObra = this.retTotalPorTipoBolsa(bolsa.pagos);
          break;
        case 3:
          materiales = this.retTotalPorTipoBolsa(bolsa.pagos);
          break;
        case 4:
          imposiciones = this.retTotalPorTipoBolsa(bolsa.pagos);
          break;
        case 5:
          iva = this.retTotalPorTipoBolsa(bolsa.pagos);
          break;
      }
    });
    total = generales + manoObra + materiales + imposiciones + iva;
    return { generales, manoObra, materiales, imposiciones, iva, total };
  }

  retTotalPorTipoBolsa(pagos: Array<any>) {
    let total: number = 0;
    pagos.forEach((pagos) => {
      total += pagos.monto - pagos.gastado;
    });
    return total;
  }

  cancelar() {
    this.cerrar.emit();
  }
}
