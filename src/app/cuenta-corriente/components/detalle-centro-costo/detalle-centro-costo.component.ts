import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { sCentroCosto } from '../../../services/sCentroCosto.service';

declare var $: any;

@Component({
  selector: 'app-detalle-centro-costo',
  templateUrl: './detalle-centro-costo.component.html',
  styleUrls: ['./detalle-centro-costo.component.css'],
  providers: [
    sCentroCosto
  ]
})
export class DetalleCentroCostoComponent implements OnInit {

  @Input() cCosto: Array<any>;
  @Output() cerrar = new EventEmitter;

  CentrosCosto: Array<any>;

  sumaTotalReal: number;
  sumaTotalProgramado: number;

  constructor(
    private _sCentroCosto: sCentroCosto
  ) {
    this.CentrosCosto = [];
    this.sumaTotalReal = 0;
    this.sumaTotalProgramado = 0;
  }

  ngOnInit() {
    // console.log(this.cCosto);
    this._sCentroCosto.getCentroCosto().subscribe(res => {
      res.forEach(areaNegocio => {
        areaNegocio.subCentroCosto.forEach(centroCosto => {
          centroCosto.real = 0;
          centroCosto.programado = 0;

          let ListaCC: Array<any>;
          ListaCC = this.cCosto.filter(el => el.subCentro.nombre == centroCosto.nombre)

          ListaCC.forEach(lista => {
            centroCosto.programado += lista.estadoPago < 4 ? lista.costo : 0;
            centroCosto.real += lista.estadoPago == 4 ? lista.costo : 0;
          });

          this.sumaTotalProgramado += centroCosto.programado;
          this.sumaTotalReal += centroCosto.real;

          this.CentrosCosto.push(centroCosto);
        });
        // this.CentrosCosto.forEach(centrosCosto => {
        //   centrosCosto.porcentaje=centrosCosto.valor*100/this.sumaTotal;
        // });
      });
      console.log(this.CentrosCosto);
    });
  }

  Cerrar() {
    this.cerrar.emit();
  }

  abrir(id) {
    // if (!$('#' + id).height())
    //   $('#' + id).height(this.listTipoGasto.find(el => el.id == id).height);
    // else
    //   $('#' + id).height(0);
  }

}
