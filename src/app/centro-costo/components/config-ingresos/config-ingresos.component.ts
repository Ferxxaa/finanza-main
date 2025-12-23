import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { comunesFechas } from "../../../share/fechas";

// Model
import { mOrdenCompra } from "../../../models/mOrdenCompra";

//Servicios
import { CentroCosto } from "../../../models/nestCentroCosto";
import { contratoService } from "../../../services/Nest/contratoService.service";
import { Observable } from "rxjs";
import { Contrato } from "../../../models/nestContrato";
import { sMovimientoService } from "../../../services/sMovimiento.service";
import { estadoPagoService } from "../../../services/sEstadoPagoservice";
import { MovimientoAdd } from "../../../models/movimiento";
import { environment } from "../../../../environments/environment";
import { EstadoPago } from "../../../models/nestEstadoPago";

declare var $: any;
declare var Swal: any;

@Component({
  selector: "app-config-ingresos",
  templateUrl: "./config-ingresos.component.html",
  styleUrls: ["./config-ingresos.component.css"],
  providers: [comunesFechas, contratoService, sMovimientoService, estadoPagoService],
})
export class ConfigIngresosComponent implements OnInit {
  @Input() centroCosto: CentroCosto;
  @Output() cerrar = new EventEmitter();

  contratos$: Observable<Contrato[]>

  movimiento: MovimientoAdd;
  ingreso: EstadoPago[];

  cantPagos: number;
  contrato: number;
  total: number;

  //Select
  subcentro: any;

  //Actualización
  actualizar: boolean;

  constructor(
    private _comunesFechas: comunesFechas,
    private contratosService: contratoService,
    private movimientoService: sMovimientoService,
    private estadoPagoService: estadoPagoService
  ) {
    this.contrato = 0;
    this.cantPagos = 1;
    this.ingreso = [this.estadoPagoService.retNewEp()];

    // this.setIngreso();
    this.actualizar = false;
    this.subcentro = null;
    this.total = 0;

  }

  initMovimiento() {
    this.movimiento = this.movimientoService.init();
    this.movimiento.tipo = environment.tiposOC.contrato;
    this.movimiento.estado = environment.estadoMovimiento.contrato;
    this.movimiento.centroCosto = this.centroCosto.idCentroCosto;
    this.movimiento.areaNegocio = this.centroCosto.areaNegocio.idAreaNegocio;
  }

  setIngreso() {
    // this.ingreso = {
    //   _id: null,
    //   folio: null,
    //   proveedor: {
    //     nombre: null,
    //     direccion: null,
    //     rutProveedor: null,
    //     telefono: null,
    //     contacto: null,
    //     mail: null,
    //   },
    //   centroCosto: { _id: 0 },
    //   subCentroCosto: "0",
    //   tipoGasto: { _id: 0 },
    //   subTipoGasto: "0",
    //   metodoPago: "0",
    //   Items: [],
    //   estadosPagos: [
    //     { opcion: "7", fecha: null, monto: null, metodoPago: 0, estado: 1 },
    //   ],
    //   solicita: null,
    //   descripcion: null,
    //   despacho: null,
    //   usuarioCreador: null,
    //   usuarioAprovador: null,
    //   evaluacion: null,
    //   observacionCantidad: null,
    //   observacionCalidad: null,
    //   Estado: 6,
    //   fechaCreacion: null,
    //   cotizacion: null,
    //   prioridad: null,
    //   iva: 0,
    //   boleta: 0,
    //   correo: false,
    //   ingresoEgreso: 2,
    //   motivo: null,
    //   condicionPago: null,
    //   chequeEmitido: false,
    //   sobregiro: 0
    // };
  }

  ngOnInit() {
    console.clear();
    // console.log(this.centroCosto);
    this.initMovimiento()

    this.contratos$ = this.contratosService.getContratoByIdCentroCosto(this.centroCosto.idCentroCosto);
    // this.getCentroCosto();
    // this.selectContrato(0);
    this._comunesFechas.calendario();
  }

  /********************** Carga Inicial **********************/

  getCentroCosto() {
    // this._sCentroCosto
    //   .getCentroCostobyID(this.centroCosto._id)
    //   .subscribe((centroCosto) => {
    //     this.ingreso.subCentroCosto = this.centroCosto.subCentroCosto;

    //     this.ingreso.centroCosto = centroCosto;
    //     this.subcentro = centroCosto.subCentroCosto.find(
    //       (subCentro) => subCentro.nombre == this.centroCosto.subCentroCosto
    //     );
    //   });
    this._comunesFechas.calendario();
  }

  /********************** Funciones de Pagina **********************/

  selectContrato(contratos: Contrato[], idContrato: number) {
    // console.log(contratos, idContrato);
    const contratoFind = contratos.find(el => el.idContrato == idContrato);
    // console.log(constratoFind);
    if (contratoFind) {
      this.total = contratoFind.monto;
      this.getPagosContratoByContrato(contratoFind);
    }
    else {
      this.initMovimiento();
      this.ingreso = [this.estadoPagoService.retNewEp()];
    }

    // this.actualizar = false;
    // this.setIngreso();
    // this.getCentroCosto();
    // this.cantPagos = 1;
    // this.total = 0;
    // //Filtrar por subCentroCosto (adicionar Folio para numero de contrato)
    // this._sOrdenComra.getOrdenComprabyEstado(6).subscribe((ingreso) => {
    //   this.ingreso = ingreso.find(
    //     (el) =>
    //       el.subCentroCosto == this.ingreso.subCentroCosto &&
    //       el.folio == indice.toString()
    //   );
    //   if (!this.ingreso) {
    //     this.setIngreso();
    //     this.getCentroCosto();
    //     this.actualizar = false;
    //   } else {
    //     this.sumaTotal();
    //     this.actualizar = true;
    //   }

    //   console.log("Ingreso", this.ingreso);
    //   this.cantPagos = this.ingreso.estadosPagos.length;
    //   this.despliegaFechas(this.ingreso.estadosPagos);
    // });
    this._comunesFechas.calendario();
  }

  getPagosContratoByContrato(contrato: Contrato) {
    this.movimientoService.getIngresosByCentroCosto(this.centroCosto.idCentroCosto).subscribe(res => {
      // console.log(res);
      const ingreso = res.find(el => el.descripcion.replace("Contrato: ", "") == contrato.nombreContrato)
      if (ingreso) {
        this.movimiento = { ...ingreso, centroCosto: ingreso.centroCosto.idCentroCosto, areaNegocio: ingreso.areaNegocio.idAreaNegocio, idMovimiento: ingreso.idMovimiento, proveedor: null, tipoGasto: null, subTipoGasto: null };
        this.ingreso = ingreso.estadoPago.filter(el => el.isActive);
        this.cantPagos = this.ingreso.length;
        this.agregaPagos();
      } else {
        this.initMovimiento();
        this.ingreso = [this.estadoPagoService.retNewEp()]
        this.cantPagos = 1;
      }
      this.movimiento.descripcion = "Contrato: " + contrato.nombreContrato;
      this.ingreso.forEach((el, i) => {
        this._comunesFechas.DespliegaFechaDateUTC("#txtFecha" + i, el.fechaPago)
      })
    })
  }

  despliegaFechas(pagos: Array<any>) {
    if (pagos.length) {
      pagos.forEach((pagos, i) => {
        if (pagos.fecha)
          this._comunesFechas.DespliegaFecha("#txtFecha" + i, pagos.fecha);
      });
    }
  }

  asignaFechas(i) {
    const calendario = $("#txtFecha" + i);
    this.ingreso[i].fechaPago = this._comunesFechas.retFechaParaGuardarDate(calendario.val());
  }

  agregaPagos() {
    this.ingreso.push(this.estadoPagoService.retNewEp())
    this._comunesFechas.calendario();
    // if (this.cantPagos > this.ingreso.length) {
    // } else {
    //   this.cantPagos = this.ingreso.length;
    // }
    // // console.log("Estado de pago:", this.ingreso.estadosPagos);
    // if (this.cantPagos < this.ingreso.estadosPagos.length) {
    //   this.ingreso.estadosPagos.splice(this.cantPagos);
    // } else {
    //   for (let i = this.ingreso.estadosPagos.length; i < this.cantPagos; i++) {
    //     this.ingreso.estadosPagos.push({
    //       opcion: "7",
    //       fecha: null,
    //       monto: null,
    //       metodoPago: 0,
    //       estado: 1,
    //     });
    //     if (
    //       this.ingreso.estadosPagos[i - 1] &&
    //       this.ingreso.estadosPagos[i - 1].fecha
    //     ) {
    //       let lastFecha = new Date(this.ingreso.estadosPagos[i - 1].fecha);
    //       // console.log(lastFecha);
    //       this.ingreso.estadosPagos[i].fecha = this._comunesFechas.cortaFecha(
    //         lastFecha
    //       );
    //       // console.log(this.ingreso.estadosPagos[i].fecha);
    //       this._comunesFechas.DespliegaFecha(
    //         "#txtFecha" + i,
    //         this.ingreso.estadosPagos[i].fecha
    //       );
    //     }
    //   }
    // }
    // // console.log(this.ingreso);
    // this._comunesFechas.calendario();
  }

  sumaTotalFacturado() {
    // this.total = 0;
    // this.ingreso.estadosPagos.forEach((ingreso) => {
    //   if (ingreso.monto) this.total += ingreso.monto;
    // });
    if (this.ingreso[this.ingreso.length - 1].monto) {
      this.agregaPagos();
    }
    const totalFacturado = this.ingreso.reduce((acc, el) => acc + (el.estado > 3 && el.monto ? el.monto : 0), 0)
    console.log(totalFacturado,this.ingreso);
    
    return totalFacturado
  }

  sumaTotal() {
    // this.total = 0;
    // this.ingreso.estadosPagos.forEach((ingreso) => {
    //   if (ingreso.monto) this.total += ingreso.monto;
    // });
    if (this.ingreso[this.ingreso.length - 1].monto) {
      this.agregaPagos();
    }
    return this.ingreso.reduce((acc, el) => acc + el.monto, 0)
  }

  // eliminaIngresosVacios() {
  // this.ingreso.estadosPagos.forEach((estadoPago, i) => {
  //   console.log(estadoPago.monto);
  //   if (estadoPago.monto == 0 || !estadoPago.monto) {
  //     this.ingreso.estadosPagos.splice(i, 1);
  //   }
  // });
  // this.ingreso = this.ingreso.filter(el => el.monto && el.monto > 0);
  // }

  /********************** CRUD **********************/

  validar(): boolean {
    if (!this.contrato) {
      Swal.fire(
        "Proyeccion de Ingreso",
        "No se puede guardar una proyección sin un contrato",
        "error"
      );
      this.cancelar();
      return false;
    }
    if (!this.sumaTotal()) {
      Swal.fire(
        "Proyeccion de Ingreso",
        "No se puede guardar una proyección sin monto asignado",
        "error"
      );
      this.cancelar();
      return false;
    }
    if (this.total - this.sumaTotal() < 0) {
      Swal.fire(
        "Proyeccion de Ingreso",
        "No se puede guardar una proyección mayor al total asignado",
        "error"
      );
      return false;
    }
    if (!this.total) {
      Swal.fire(
        "Proyeccion de Ingreso",
        "No se puede guardar una proyección con total 0",
        "error"
      );
      return false;
    }
    return true;
  }

  guardar() {
    if (this.validar()) {
      // this.eliminaIngresosVacios();
      this.movimiento.estadoPago = this.ingreso;
      this.movimiento.estado = 2;
      this.movimientoService.addIngresoContrato(this.movimiento).subscribe(res => {
        this.cancelar();
        Swal.fire(
          "Proyeccion de Ingreso",
          "Se ha proyectado de forma correcta",
          "success"
        );
      })
      // this.ingreso.folio = this.contrato.toString();
      // // console.log(this.ingreso);
      // if (!this.actualizar) {
      //   this._sOrdenComra.postOrdenCompra(this.ingreso).subscribe((res) => {
      //     this.cancelar();
      //     Swal.fire(
      //       "Proyeccion de Ingreso",
      //       "Se ha proyectado de forma correcta",
      //       "success"
      //     );
      //   });
      // } else {
      //   this._sOrdenComra.putOrdenCompra(this.ingreso).subscribe((res) => {
      //     this.cancelar();
      //     Swal.fire(
      //       "Proyeccion de Ingreso",
      //       "Se ha actualizado de forma correcta",
      //       "success"
      //     );
      //   });
      // }
    }
  }

  cancelar() {
    this.cerrar.emit();
  }
}
