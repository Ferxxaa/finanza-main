import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-cuenta-corriente',
  templateUrl: './item-cuenta-corriente.component.html',
  styleUrls: ['./item-cuenta-corriente.component.css']
})
export class ItemCuentaCorrienteComponent implements OnInit {

  @Input() flujo;
  @Input() fechaPrevia;

  constructor() { }

  ngOnInit() {
  }

  getClassFondo(flujo) {
    // if (flujo.ingresoEgreso == 2)
    //   return 'ingreso'
      // 'bolsaGenerales': flujo.descripcion == 'Gastos Generales',
      //   'bolsaMatSub': flujo.descripcion == 'Materiales - Sub Contrato',
      //     'bolsaSueldos': flujo.descripcion == 'Mano de Obra Sueldos',
      //       'bolsaImpuesto': flujo.descripcion == 'Impuesto',
      //         'bolsaImposiciones': flujo.descripcion == 'Mano de Obra Imposiciones',
      //           'iva': flujo.tipoGasto && flujo.tipoGasto.nombre == 'IMPUESTOS',
      //             'manoObra': flujo.tipoGasto && flujo.tipoGasto.nombre == 'MANO DE OBRA',
      //               'imposiciones': flujo.tipoGasto && flujo.tipoGasto.nombre == 'IMPOSICIONES',
      //                 'financiero': flujo.subTipoGasto && flujo.subTipoGasto == 'GASTOS FINANCIEROS'
  }

  Mes(actual) {
    if (!actual) return false;
    if (this.esPasado(actual))
      return false
    // if (!this.arr[this.indice - 1]) {
    //   return true
    // }
    if (!this.fechaPrevia)
      return true
    // if (
    //   new Date(actual).getMonth() !=
    //   new Date(this.arr[this.indice - 1].fecha).getMonth()
    // )
    if (
      new Date(actual).getMonth() !=
      new Date(this.fechaPrevia.fecha).getMonth()
    )
      return true;
    else return false;
  }

  esPasado(fecha) {
    let fechaGuardada = new Date(fecha);
    let mesActual = new Date().getMonth();
    let agnoActual = new Date().getFullYear();

    // console.log("Fecha Registro", fecha);
    // console.log(fechaGuardada.getFullYear(), "vs", agnoActual);
    if (fechaGuardada.getFullYear() < agnoActual)
      return true
    if (fechaGuardada.getMonth() < mesActual && fechaGuardada.getFullYear() <= agnoActual)
      return true
    else
      return false
  }

  getContrato(OC): string {
    return OC.subCentro.contrato[parseInt(OC.ordenCompra)].nombre + " " + OC.indice + "/" + OC.maxIndice
  }

}
