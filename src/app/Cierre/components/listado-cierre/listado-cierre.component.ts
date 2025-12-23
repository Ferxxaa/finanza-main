import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { sCierre } from '../../../services/sCierre.service';

declare var $: any;

@Component({
  selector: 'app-listado-cierre',
  templateUrl: './listado-cierre.component.html',
  styleUrls: ['./listado-cierre.component.css'],
  providers: [
    sCierre
  ]
})
export class ListadoCierreComponent implements OnInit {

  @Input() totales: any[];
  centrosSelected: string[];

  listado: any[];
  cierresCentros: any[];

  listado$: Observable<any>;


  constructor(
    private Cierre: sCierre
  ) {
    this.listado$ = this.Cierre.getCierre();
    this.centrosSelected = [];
  }

  ngOnInit() {
  }

  setValueCierres(res) {
    this.listado = res;
    this.cierresCentros = res.map(cierre => ({ _id: cierre._id, centros: cierre.OC.concat(cierre.OP).map(el => el.subCentroCosto) }))
  }

  getCentroCosto(el) {
    let ordenes = el.OC.concat(el.OP);
    let centrosCosto = ordenes.map(el => el.subCentroCosto).filter((v, i, a) => a.indexOf(v) === i);
    // console.log(centrosCosto);
    return centrosCosto;
  }

  display(id) {
    $("#" + id).toggleClass("oculto");
  }

  // retPorcentaje(item) {
  //   console.log(item);
  // }

  displayCentro(centros: string[]) {
    this.cierresCentros.forEach(regAgno => {
      centros.forEach(centro => {
        if (regAgno.centros.includes(centro))
          $("#" + regAgno._id).removeClass("oculto")
      });
      this.centrosSelected = centros;
    });
  }

}
