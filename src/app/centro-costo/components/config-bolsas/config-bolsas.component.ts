import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Observable } from "rxjs/Observable";

//Modelo
import { mBolsa, Pagos } from "../../../models/mBolsa";
import { mSubCentroCosto } from "../../../models/mSubCentroCosto";
import { CentroCosto } from "../../../models/nestCentroCosto";
import { TipoGasto } from "../../../models/nestTipoGasto";
import { Bolsa, BolsaAdd } from "../../../models/nestBolsa";
import { PagosBolsa, PagosBolsaAdd } from "../../../models/nestPagosBolsa";

//Servicio
import { comunesFechas } from "../../../share/fechas";
import { tipoGastoService } from "../../../services/sTipoGasto.service";
import { bolsaService } from "../../../services/Nest/bolsaService.service";

declare var $: any;
declare var Swal: any;

@Component({
  selector: "app-config-bolsas",
  templateUrl: "./config-bolsas.component.html",
  styleUrls: ["./config-bolsas.component.css"],
  providers: [comunesFechas, tipoGastoService, bolsaService],
})
export class ConfigBolsasComponent implements OnInit {
  @Input() centroCosto: CentroCosto;
  @Output() cerrar = new EventEmitter();

  //Desplegables en HTML
  total: number;
  montoOtasBolsas: number;
  pagosTotal: number;
  pagosTotalGastado: number;
  pagosTotalDisponible: number;
  subCentro: mSubCentroCosto;
  txtBotonGuardar: string;

  //Objeto
  bolsa: BolsaAdd;
  // bolsas$: Observable<Bolsa[]>;
  bolsas: Bolsa[];
  tiposUtilizados: string[];

  //Pagos
  cantPagos: number;

  //CheckBox
  TiposGastos: TipoGasto[];

  //Async
  TiposGastos$: Observable<TipoGasto[]>;

  constructor(
    private _comunesFechas: comunesFechas,
    private tipoGastoService: tipoGastoService,
    private bolsaService: bolsaService
  ) {
    this.txtBotonGuardar = "Guardar"
  }

  limpiar() {
    this.cantPagos = 1;
    this.bolsa = this.bolsaService.init();
    this.bolsa.centroCosto = this.centroCosto.idCentroCosto;
    this.bolsa.areaNegocio = this.centroCosto.areaNegocio.idAreaNegocio;
    this.pagosTotal = 0;
    this.montoOtasBolsas = 0;
    this.tiposUtilizados = [];
    this.tipoGastoService.getTiposGastos().subscribe(res => {
      this.TiposGastos = res;
    });
    this.bolsaService.getBolsaByIdCentroCosto(this.centroCosto.idCentroCosto).subscribe(res => {
      this.bolsas = res
      this.calcTotalPagosBolsa(this.bolsa.tipoBolsa);
    });
  }

  ngOnInit() {
    console.clear();
    // console.log(this.centroCosto);
    // this.cargaTipoGastos();
    this.limpiar();

    // this.cargaDatosCentroCostoABolsa(this.centroCosto);
    // this.valorSubCentro(this.centroCosto._id, this.centroCosto.subCentroCosto)
  }

  /********************** Primera Carga de Pagina **********************/

  // valorSubCentro(idCentroCosto: string, subCentro: string) {
  //   this._sCentroCosto.getCentroCostobyID(idCentroCosto).subscribe(centroCosto => {
  //     this.subCentro = centroCosto.subCentroCosto.find(subCentroCosto => subCentroCosto.nombre == subCentro)
  //     // console.log(this.subCentro);
  //   })
  // }

  private calcTotalPagosBolsa(tipoBolsa: number) {
    if (this.bolsas) {
      this.montoOtasBolsas = this.otrasBolsas(tipoBolsa).reduce((acc, el) => acc + this.calcTotalBolsa(el.pagosBolsa), 0)
    }
  }

  calcTotalBolsa(pagosBolsa: PagosBolsa[]): number {
    return pagosBolsa.reduce((acc, el) => acc + el.monto, 0)
  }

  // cargaDatosCentroCostoABolsa(_centroCosto) {
  //   let { _id, centroCosto, subCentroCosto } = _centroCosto;
  //   this.bolsa.idCentroCosto = _id;
  //   this._sCentroCosto.getCentroCostobyID(_id).subscribe((centroCosto) => {
  //     // console.log(centroCosto)
  //     this.bolsa.subCentroCosto = {
  //       ...centroCosto.subCentroCosto.find(
  //         (subCentro) => subCentro.nombre == subCentroCosto
  //       ),
  //     };
  //     delete centroCosto.subCentroCosto;
  //     this.bolsa.CentroCosto = { ...centroCosto };
  //     this.cargaBolsas(
  //       this.bolsa.idCentroCosto,
  //       this.bolsa.subCentroCosto.nombre
  //     );
  //   });
  // }

  // cargaBolsas(idCentroCosto: string, subCentroCosto: string) {
  //   this._sBolsas
  //     .getBolsasIdCentroCosto(idCentroCosto, subCentroCosto)
  //     .subscribe((bolsas) => {
  //       this.bolsas = bolsas;
  //       // console.log(bolsas);
  //       this.descuentaTotalOtrasBolsas(this.bolsa.tipoBolsa);
  //     });
  // }

  // cargaBolsasPromise(idCentroCosto: string, subCentroCosto: string) {
  //   return new Promise((resolve, reject) => {
  //     this._sBolsas
  //       .getBolsasIdCentroCosto(idCentroCosto, subCentroCosto)
  //       .subscribe(
  //         (bolsas) => {
  //           this.bolsas = bolsas;
  //           this.descuentaTotalOtrasBolsas(this.bolsa.tipoBolsa);
  //           resolve(bolsas);
  //         },
  //         (err) => {
  //           reject(err);
  //         }
  //       );
  //   });
  // }

  private otrasBolsas(tipoBolsa: number): Bolsa[] {
    return this.bolsas.filter((bolsa) => bolsa.tipoBolsa != tipoBolsa);
  }

  tipoUtilizadoOtraBolsa(tipoBolsa: number, tipoGasto: string): boolean {
    if (this.bolsas) {
      let otrosTiposGasto: string[];
      otrosTiposGasto = this.otrasBolsas(tipoBolsa).reduce((acc, el) => acc.concat(el.tipoGastos), []).map(el => el.nombreTipoGasto);
      return otrosTiposGasto.includes(tipoGasto);
    }
  }

  validateFecha(fechaPago: Date): boolean {
    const month = new Date().getMonth();
    const pagoMonth = new Date(fechaPago).getMonth();
    const year = new Date().getFullYear();
    const pagoYear = new Date(fechaPago).getFullYear();
    if (pagoYear < year) return false;
    if (pagoMonth < month && pagoYear <= year) return false;
    return true
  }

  // descuentaTotalOtrasBolsas(tipoBolsa: number) {
  //   this.montoOtrasBolsas = 0;
  //   let otrasBolsas: Array<mBolsa>;
  //   otrasBolsas = this.bolsas.filter((bolsa) => bolsa.tipoBolsa != tipoBolsa);
  //   // console.log(otrasBolsas);
  //   otrasBolsas.forEach((bolsa) => {
  //     bolsa.pagos.forEach((pago) => {
  //       this.montoOtrasBolsas += pago.monto;
  //     });
  //   });
  //   // console.log(this.montoOtrasBolsas);
  //   this._comunesFechas.calendario();
  // }

  /********************** Funciones en pag **********************/
  addTipoGasto(index: number, nombre: string) {
    let checker: any = document.getElementById('chkTipoDato' + index);
    if (checker.checked)
      this.bolsa.tipoGastos.push(this.TiposGastos.find(el => el.nombreTipoGasto == nombre));
    else {
      const index = this.bolsa.tipoGastos.findIndex((el) => el.nombreTipoGasto == nombre);
      this.bolsa.tipoGastos.splice(index, 1);
    }
  }

  calcPagosTotal() {
    this.pagosTotal = this.bolsa.pagosBolsa.reduce((acc, el) => acc + el.monto, 0);
    this.pagosTotalGastado = this.bolsa.pagosBolsa.reduce((acc, el) => acc + el.gastado, 0);
    this.pagosTotalDisponible = this.bolsa.pagosBolsa.reduce((acc, el) => acc + (el.monto - el.gastado), 0);
  }

  checkTipoGastoActivo() {
    if (this.bolsa.tipoGastos)
      this.bolsa.tipoGastos.forEach((tipoGasto) => {
        const indexTipoGasto: number = this.TiposGastos.findIndex((allTiposGastos) => allTiposGastos.nombreTipoGasto == tipoGasto.nombreTipoGasto)
        $("#chkTipoDato" + indexTipoGasto).prop("checked", true);
      });
  }

  bolsaActiva(tipoBolsa: number) {
    const activa: Bolsa = this.bolsas.find(el => el.tipoBolsa == tipoBolsa)
    if (activa)
      this.bolsa = { ...this.bolsa, pagosBolsa: this.bolsaService.parsePagosBolsaToPagosBolsa(activa.pagosBolsa), tipoGastos: activa.tipoGastos, idBolsa: activa.idBolsa }
    else
      this.bolsa = this.bolsaService.init();
    this.bolsa.centroCosto = this.centroCosto.idCentroCosto;
    this.bolsa.areaNegocio = this.centroCosto.areaNegocio.idAreaNegocio;
    this.bolsa.tipoBolsa = tipoBolsa;
    this.cantPagos = this.bolsa.pagosBolsa.length;
    $("[name='chkTipoDato']").prop("checked", false);
    this.calcTotalPagosBolsa(this.bolsa.tipoBolsa);
    this.calcPagosTotal();
    this._comunesFechas.calendario();
    this.despliegaEstadosPagos();
    this.checkTipoGastoActivo();
  }

  private despliegaEstadosPagos() {
    this.bolsa.pagosBolsa.forEach((pago, i) => {
      console.log(pago.fechaPago, new Date(pago.fechaPago));

      this._comunesFechas.DespliegaFechaDateAdd1("#txtFecha" + i, new Date(pago.fechaPago));
    });
  }

  corrigeSaldoInicial(pagos: Pagos[]) {
    // console.log(pagos);
    // pagos.forEach(pagos => {
    //   pagos.monto -= pagos.gastado;
    // });
  }

  /********************** Pagos **********************/
  asignaFechas(i) {
    const calendario = $("#txtFecha" + i);
    console.log(calendario);
    console.log(calendario.val());
    console.log(this._comunesFechas.stringToFecha(calendario.val()));

    this.bolsa.pagosBolsa[i].fechaPago = this._comunesFechas.stringToFecha(calendario.val());
  }

  agregaPagos() {
    if (this.cantPagos < this.bolsa.pagosBolsa.length) {
      this.bolsa.pagosBolsa.splice(this.cantPagos);
    } else {
      for (let i = this.bolsa.pagosBolsa.length; i < this.cantPagos; i++) {
        this.bolsa.pagosBolsa.push({ fechaPago: null, monto: null, gastado: 0, isActive: true, idPagoBolsa: null, fechaCreacion: new Date() });
        if (this.bolsa.pagosBolsa[i - 1] && this.bolsa.pagosBolsa[i - 1].fechaPago) {
          let lastFecha = new Date(this.bolsa.pagosBolsa[i - 1].fechaPago);
          this.bolsa.pagosBolsa[i].fechaPago = lastFecha;
          this._comunesFechas.DespliegaFechaDate("#txtFecha" + i, new Date(this.bolsa.pagosBolsa[i].fechaPago));
        }
      }
    }
    this.calcPagosTotal();
    this._comunesFechas.calendario();
  }

  confirmEliminar(bolsa: Bolsa) {
    Swal.fire({
      title: 'Eliminar bolsa',
      text: "¿Esta seguro de eliminar esta bolsa?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.eliminar(bolsa)
      }
    })
  }

  /********************** Salir **********************/
  cancelar() {
    this.cerrar.emit();
  }

  /********************** CRUD **********************/

  validar(): boolean {
    if (!this.bolsa.pagosBolsa.length) {
      Swal.fire("Bolsas", "Debe tener pagos", "error");
      return false;
    }
    if (!this.bolsa.tipoBolsa) {
      Swal.fire("Bolsas", "Debe seleccionar una bolsa", "error");
      return false;
    }
    if (this.centroCosto.montoProgramado - this.montoOtasBolsas - this.pagosTotal < 0) {
      Swal.fire(
        "Bolsas",
        "El total no puede quedar en saldo negativo",
        "error"
      );
      return false;
    }
    if (this.pagosTotal <= 0) {
      Swal.fire(
        "Bolsas",
        "No se pueden guardar montos con resultado 0 o menor",
        "error"
      );
      return false;
    }
    if (this.valFechas(this.bolsa.pagosBolsa)) {
      Swal.fire("Bolsas", "Debe ingresar todas las fechas de proyección", "error");
      return false;
    }
    return true;
  }

  valFechas(pagosArray: PagosBolsaAdd[]): boolean {
    let bol: boolean = false;
    pagosArray.forEach((pago) => {
      if (!pago.fechaPago) {
        bol = true;
        return true;
      }
    });
    return bol;
  }

  corrigePagos() {
    this.bolsa.pagosBolsa.forEach((pago) => {
      pago.monto = pago.monto + pago.gastado;
    });
  }

  guardar() {
    if (this.validar()) {
      this.txtBotonGuardar = "Guardando"
      this.bolsaService.addBolsa(this.bolsa).subscribe(res => {
        this.txtBotonGuardar = "Guardar";
        Swal.fire(
          "Bolsas",
          "Se ha guardado de forma correcta la Bolsa",
          "success"
        );
        this.limpiar();
      })
      //   this.eliminaPagosVacios();
      //   this.corrigePagos();
      //   this.bolsa.subCentroCosto.montoProgramado = this.subCentro.montoProgramado
      //   if (!this.bolsa._id) {
      //     this._sBolsas.postBolsa(this.bolsa).subscribe((bolsa) => {
      //       this.cargaBolsas(
      //         this.bolsa.idCentroCosto,
      //         this.bolsa.subCentroCosto.nombre
      //       );
      //       this.bolsa = bolsa;
      //       this.despliegaEstadosPagos()
      //       this.txtBotonGuardar = "Guardar";
      //       Swal.fire(
      //         "Bolsas",
      //         "Se ha configurado de forma correcta la Bolsa",
      //         "success"
      //       );
      //       this.corrigeSaldoInicial(this.bolsa.pagos);
      //     });
      //   } else {
      //     this._sBolsas.putBolsa(this.bolsa).subscribe((bolsa) => {
      //       this.cargaBolsas(
      //         this.bolsa.idCentroCosto,
      //         this.bolsa.subCentroCosto.nombre
      //       );
      //       this.bolsa = bolsa;
      //       this.despliegaEstadosPagos();
      //       this.txtBotonGuardar = "Guardar";
      //       Swal.fire(
      //         "Bolsas",
      //         "Se ha actualizado de forma correcta la Bolsa",
      //         "success"
      //       );
      //       this.corrigeSaldoInicial(this.bolsa.pagos);
      //     });
      //   }
    }
  }

  eliminar(bolsa: Bolsa) {
    this.bolsaService.delBolsaById(bolsa.idBolsa).subscribe(res => {
      this.limpiar();
      Swal.fire(
        "Bolsas",
        "Se ha eliminado la Bolsa seleccionada",
        "success"
      );
    });
    // console.log(bolsa);
    // this._sBolsas.deleteBolsa(bolsa)
    //   .subscribe(eliminar => {
    //     this.cargaBolsas(
    //       bolsa.idCentroCosto,
    //       bolsa.subCentroCosto.nombre
    //     );
    //     this.bolsa.tipoBolsa = 0;
    //     this.bolsaActiva(0)
    //     Swal.fire(
    //       "Bolsas",
    //       "Se ha eliminado la Bolsa seleccionada",
    //       "success"
    //     );
    //   });
  }
}
