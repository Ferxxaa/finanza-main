import { Component, OnInit } from "@angular/core";

//Modelos
import { mProveedor } from "../../../models/mProveedor"
import { mCentroCosto } from "../../../models/mCentroCosto";
import { mGastos } from "../../../models/mGastos";
import { mOrdenCompra } from "../../../models/mOrdenCompra";
import { Proveedor } from "../../../models/nestProveedor";

//Servicios
import { sProveedor } from "../../../services/sProveedor.service";
import { sCentroCosto } from "../../../services/sCentroCosto.service";
import { sGastos } from "../../../services/sGastos.service";
import { sOrdenComra } from "../../../services/sOrdenComra.service";
import { sCotizacion } from "../../../services/sCotizacion.service";
import { sMonto } from "../../../services/sMonto.service";
import { sCorreo } from "../../../services/sCorreo.service";
import { sVis_UsuarioPersona } from "../../../services/sVis_UsuarioPersona.service";
import { nestProveedorService } from "../../../services/nestProfesional.service";
import { sMovimientoService } from "../../../services/sMovimiento.service";

//Config
import { environment } from "../../../../environments/environment";
import { comunesFechas } from "../../../share/fechas";
import { sUsuario } from "../../../services/sUsuario.service";
import { mCotizacion } from "../../../models/mCotizacion";

import { Observable } from "rxjs";


declare var $: any;
declare var Swal: any;

@Component({
  selector: "app-orden-compra",
  templateUrl: "./orden-compra.component.html",
  styleUrls: ["./orden-compra.component.css"],
  providers: [
    sProveedor,
    sCentroCosto,
    sGastos,
    sOrdenComra,
    sCotizacion,
    sCorreo,
    sUsuario,
    sVis_UsuarioPersona,
    comunesFechas,
    sMonto,
    sMovimientoService,
    nestProveedorService
  ],
})
export class OrdenCompraComponent implements OnInit {
  usuario: any;

  ordenCompra: mOrdenCompra;

  proveedorSelected: Proveedor;

  //Select
  proveedores$: Observable<Proveedor[]>;
  usuarios: Array<any>;
  Proveedores: Array<mProveedor>;
  centrosCostos: Array<mCentroCosto>;
  TiposGastos: Array<mGastos>;

  fecha: string;
  item: Array<any>;
  cantidadEstadosPago: number;
  estadosPagos: Array<any>;
  folio: string;

  cotizacion: any;
  url: string;
  AdjuntarCotizacion: mCotizacion;

  mensaje: any;

  actualizar: boolean;

  total: number;

  getnewFolio: any;

  env: any;

  constructor(
    private _sProveedor: sProveedor,
    private _sCentroCosto: sCentroCosto,
    private _sGastos: sGastos,
    private _sOrdenCompra: sOrdenComra,
    private _sCotizacion: sCotizacion,
    private _sCorreo: sCorreo,
    private _sUsuario: sUsuario,
    private _Vis_UsuarioPersona: sVis_UsuarioPersona,
    private _comunesFechas: comunesFechas,
    private _montos: sMonto,
    private movimientos: sMovimientoService,
    private proveedorService: nestProveedorService
  ) {
    this.usuario = JSON.parse(localStorage.usuario);
    this.mensaje = { ok: null, error: null };
    this.Limpiar();
    this.url = environment.node + "adjuntar/";
    this.actualizar = false;
    this.total = 0;
    this.env = { iva: 0, boleta: 0 }
    this._montos.getMonto().subscribe(res => {
      this.env = { iva: res[0].iva, boleta: res[0].boleta }
    })
    this.proveedores$ = this.proveedorService.getProveedores()
  }

  Limpiar() {
    this.total = 0;
    this.ordenCompra = {
      _id: null,
      folio: null,
      proveedor: 0,
      centroCosto: { _id: 0 },
      subCentroCosto: "0",
      tipoGasto: { _id: 0 },
      subTipoGasto: "0",
      metodoPago: "0",
      Items: this.item,
      estadosPagos: this.estadosPagos,
      solicita: { id: 0, nombre: null },
      descripcion: null,
      despacho: null,
      usuarioCreador: this.usuario.idUsuario,
      usuarioAprovador: null,
      evaluacion: null,
      observacionCantidad: null,
      observacionCalidad: null,
      Estado: 1,
      fechaCreacion: null,
      cotizacion: null,
      prioridad: "0",
      iva: 0,
      boleta: 0,
      correo: false,
      ingresoEgreso: 1,
      motivo: null,
      condicionPago: null,
      chequeEmitido: false,
      sobregiro: 0
    };
    this.folio = "1".padStart(7, "0");
    this.ordenCompra.folio = this.folio;
    this.ordenCompra.folio = "1".padStart(7, "0");
    this.getnewFolio = this._sOrdenCompra.getOrdenCompra().subscribe((res) => {
      let arrTemp = res.filter(el => el.folio).sort(this.compare);
      let lastOC = arrTemp[arrTemp.length - 1]
      // console.log(lastOC);
      if (lastOC && lastOC.folio) {
        this.folio = String(parseInt(lastOC.folio) + 1).padStart(7, "0");
        this.ordenCompra.folio = String(parseInt(lastOC.folio) + 1).padStart(7, "0");
      }
    });
    this.cotizacion = null;
    this.cantidadEstadosPago = 1;
    this.estadosPagos = [{ opcion: null, fecha: null }];
    this.item = [
      {
        codigo: null,
        detalle: null,
        cantidad: 1,
        declaracion: null,
        moneda: "CLP",
        precioUnitario: null,
        iva: 2,
      },
    ];
    this.fecha =
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();
    this.CargaDatos();
    this.AsignaCentroCosto();

    if (localStorage.hasOwnProperty("cotizacion")) {
      this.cotizacion = JSON.parse(localStorage.cotizacion);
      console.log(this.cotizacion);
      
      localStorage.removeItem("cotizacion");
      this.ordenCompra.cotizacion = this.cotizacion._id;
      this.ordenCompra.solicita.nombre = this.cotizacion.solicitador.nombreUsuario;
      this.ordenCompra.descripcion = this.cotizacion.observacion;
      // console.log(this.cotizacion);

      this.getUsuario(this.cotizacion.solicitador.nombreUsuario)
      this.ordenCompra.prioridad = this.cotizacion.prioridad;
    }
  }

  compare(a, b) {
    if (parseInt(a.folio) < parseInt(b.folio)) {
      return -1;
    }
    if (parseInt(a.folio) > parseInt(b.folio)) {
      return 1;
    }
    // a debe ser igual b
    return 0;
  }

  ngOnInit() {
    $('#content').scroll(function () {
      if ($('#content').scrollTop() > 50) {
        $('.Folio').addClass('white');
      } else {
        $('.white').removeClass('white');
      }
    });

    var self = this;
    $.getScript("https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.js", function (data, textStatus, jqxhr) {
      $("#drdProveedor").select2();
      $("#drdProveedor").change((e) => {
        self.AsignaProveedor($('#drdProveedor').find(':selected').val());
      })
    });
    console.clear();
    this.CargaDatos();

    if (localStorage.hasOwnProperty("editarOC")) {
      this.getnewFolio.unsubscribe();
      this._sOrdenCompra
        .getOrdenComprabyID(localStorage.getItem("editarOC"))
        .subscribe((res) => {
          this.ordenCompra = res;
          this.item = this.ordenCompra.Items;
          this.folio = this.ordenCompra.folio;
          this.estadosPagos = this.ordenCompra.estadosPagos;
          let add = {
            codigo: null,
            detalle: null,
            cantidad: 1,
            declaracion: null,
            moneda: null,
            precioUnitario: null,
            iva: 0,
          };
          this.item.push(add);
          this.actualizar = true;
          this.AsignaTotal();
          if (this.estadosPagos[0].opcion == "7") {
            this.cargaDatosEstadosPago();
          }
          localStorage.removeItem("editarOC");
          // console.log(this.ordenCompra);
          if (this.ordenCompra.cotizacion)
            this.getCotizacionEdit(this.ordenCompra.cotizacion);
        });
    }

    this._Vis_UsuarioPersona.fetchVis_UsuarioPersona().then((usuario) => {
      this.usuarios = usuario;
    });
  }

  getUsuario(nombre: string) {
    if (nombre)
      this._sUsuario.getUsuariobynombreUsuario(nombre).subscribe(res => this.ordenCompra.solicita.id = res[0].idUsuario);
  }

  getCotizacionEdit(idCotizacion: string) {
    // console.log("get Cotizacion", idCotizacion);
    this._sCotizacion.getCotizacionesbyID(idCotizacion).subscribe(cotizacion => {
      this.cotizacion = cotizacion;
    });
  }

  private CargaDatos() {
    this.calendario();
    this._sProveedor.getProveedor().subscribe((res) => {
      this.Proveedores = res;
    });
    this._sCentroCosto.getCentroCosto().subscribe((res) => {
      this.centrosCostos = res;
      if (this.cotizacion)
        this.ordenCompra.subCentroCosto = this.cotizacion.centroCosto;
    });
    this._sGastos.getGastos().subscribe((res) => {
      this.TiposGastos = res;
    });
  }

  cargaDatosEstadosPago() {
    setTimeout(() => {
      if (this.total == 0) {
        this.AsignaTotal();
      }
      for (let index = 0; index < this.estadosPagos.length; index++) {
        $("[name='txtEstadoPagoMonto']")[index].value =
          (this.estadosPagos[index].monto * 100) / this.total;
        this._comunesFechas.DespliegaFecha(
          "#txtEstadoPago" + index,
          this.estadosPagos[index].fecha
        );
        this._comunesFechas.calendario();
      }
    }, 300);
  }

  calendario() {
    $(".date").datetimepicker({ format: "DD/MM/YYYY" });
  }

  AsignaProveedor(idProveedor) {
    this.proveedorService.getProveedorById(idProveedor).subscribe(res => {
      this.proveedorSelected = res;
    });
  }

  addNombreResponsable(e) {
    this.ordenCompra.solicita.nombre =
      e.target.options[e.target.selectedIndex].text;
  }

  AsignaCentroCosto() {
    this.ordenCompra.centroCosto.subCentroCosto = [];
    this._sCentroCosto.getCentroCosto().subscribe((res) => {
      this.ordenCompra.subCentroCosto = "0";
      // console.log(res);
      res.forEach((centrosCosto) => {
        centrosCosto.subCentroCosto.filter(el => el.activo).forEach((subCentros) => {
          this.ordenCompra.centroCosto.subCentroCosto.push(subCentros);
        });
      });
      // console.log(this.ordenCompra.centroCosto.subCentroCosto);
    });
  }

  AsignaTipoGasto() {
    this.ordenCompra.tipoGasto.subTipoGasto = [];
    this._sGastos
      .getGastosbyID(this.ordenCompra.tipoGasto._id)
      .subscribe((res) => {
        this.ordenCompra.tipoGasto = res;
        this.ordenCompra.subTipoGasto = "0";
      });
  }

  addItem(linea?: number) {
    let add = {
      codigo: null,
      detalle: null,
      cantidad: 1,
      declaracion: null,
      moneda: "CLP",
      precioUnitario: null,
      iva: 2,
    };
    if (
      !this.item[linea].codigo &&
      !this.item[linea].detalle &&
      this.item.length <= linea + 1
    )
      this.item.push(add);
  }

  AsignaTotal() {
    this.total = 0;
    this.item
      .filter((el) => el.precioUnitario)
      .forEach((item) => {
        // console.log(item);
        switch (item.iva) {
          case 2:
            this.total += parseInt(item.precioUnitario) * parseInt(item.cantidad) * (1 + (this.env.iva / 100));
            break;
          case "2":
            this.total += parseInt(item.precioUnitario) * parseInt(item.cantidad) * (1 + (this.env.iva / 100));
            break;
          case 3:
            this.total += parseInt(item.precioUnitario) * parseInt(item.cantidad) * (1 + (this.env.boleta / 100));
            break;
          case "3":
            this.total += parseInt(item.precioUnitario) * parseInt(item.cantidad) * (1 + (this.env.boleta / 100));
            break;
          default:
            this.total += parseInt(item.precioUnitario) * parseInt(item.cantidad);
            break;
        }
      });
    // this.total*=1.19;
    this.cambiaTodosMontos();
  }

  AgregarEstadosPago() {
    // this.estadosPagos = [{ opcion: '7', fecha: null }];
    if (this.estadosPagos.length < this.cantidadEstadosPago)
      for (
        let i = this.estadosPagos.length - 1;
        i < this.cantidadEstadosPago - 1;
        i++
      ) {
        this.estadosPagos.push({
          opcion: "7",
          fecha: null,
          monto: null,
          metodoPago: null,
          numeroPago: null,
          estado: 1,
        });
      }
    else {
      this.estadosPagos.splice(this.cantidadEstadosPago);
    }

    this.ordenCompra.estadosPagos = this.estadosPagos;
    let origin = this;
    setTimeout(() => {
      $("[name='txtEstadoPagoMonto']").each(function () {
        this.value = 100 / origin.cantidadEstadosPago;
      });
      this.calendario();
      this.cambiaTodosMontos();
      // this.setValEp();
    }, 300);
  }

  setFechaEstadosPago(indice: number, opcion: number) {
    switch (opcion) {
      case 1:
        this.estadosPagos = [
          {
            opcion: "1",
            fecha: null,
            monto: null,
            metodoPago: null,
            estado: 1,
            numeroPago: null,
            factura: null,
          },
        ];
        this.estadosPagos[indice].fecha = new Date();
        this.ordenCompra.estadosPagos = this.estadosPagos;
        this.ordenCompra.condicionPago = 'Contado';
        break;
      case 2:
        this.estadosPagos = [
          {
            opcion: "2",
            fecha: null,
            monto: null,
            metodoPago: null,
            estado: 1,
            numeroPago: null,
            factura: null,
          },
        ];
        this.estadosPagos[indice].fecha = this.addDays(30);
        this.ordenCompra.estadosPagos = this.estadosPagos;
        this.ordenCompra.condicionPago = 'Credito 30 Dias';
        break;
      case 3:
        this.estadosPagos = [
          {
            opcion: "3",
            fecha: null,
            monto: null,
            metodoPago: null,
            estado: 1,
            numeroPago: null,
            factura: null,
          },
        ];
        this.estadosPagos[indice].fecha = this.addDays(45);
        this.ordenCompra.estadosPagos = this.estadosPagos;
        this.ordenCompra.condicionPago = 'Credito 45 Dias';
        break;
      case 4:
        this.estadosPagos = [
          {
            opcion: "4",
            fecha: null,
            monto: null,
            metodoPago: null,
            estado: 1,
            numeroPago: null,
            factura: null,
          },
        ];
        this.estadosPagos[indice].fecha = this.addDays(60);
        this.ordenCompra.estadosPagos = this.estadosPagos;
        this.ordenCompra.condicionPago = 'Credito 60 Dias';
        break;
      case 5:
        this.estadosPagos = [
          {
            opcion: "5",
            fecha: null,
            monto: null,
            metodoPago: null,
            estado: 1,
            numeroPago: null,
            factura: null,
          },
        ];
        this.estadosPagos[indice].fecha = this.addDays(90);
        this.ordenCompra.estadosPagos = this.estadosPagos;
        this.ordenCompra.condicionPago = 'Credito 90 Dias';
        break;
      case 6:
        this.estadosPagos = [
          {
            opcion: "6",
            fecha: null,
            monto: null,
            metodoPago: null,
            estado: 1,
            numeroPago: null,
            factura: null,
          },
        ];
        this.estadosPagos[indice].fecha = null;
        this.ordenCompra.estadosPagos = this.estadosPagos;
        setTimeout(() => {
          this.calendario();
        }, 1000);
        this.ordenCompra.condicionPago = 'A Convenir';
        break;
      case 7:
        this.cantidadEstadosPago = 1;
        this.estadosPagos[indice].fecha = null;
        this.estadosPagos = [
          {
            opcion: "7",
            fecha: null,
            monto: null,
            metodoPago: null,
            estado: 1,
            numeroPago: null,
            factura: null,
          },
        ];
        setTimeout(() => {
          this.calendario();
          $("[name='txtEstadoPagoMonto']")[0].value = 100;
          this.cambiaTodosMontos();
          // this.setValEp();
        }, 300);
        this.ordenCompra.condicionPago = 'Estados de Pago';
        break;
    }
  }

  addDays(dias: number): Date {
    let fecha: Date;
    fecha = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * dias);
    return fecha;
  }

  AsignaFechaEstadosPago(nombre: string, indice?: number) {
    // console.log("entre!" + indice);
    let dia = $("#" + nombre + indice)
      .val()
      .split("/")[0];
    let mes = $("#" + nombre + indice)
      .val()
      .split("/")[1];
    let agno = $("#" + nombre + indice)
      .val()
      .split("/")[2];
    // if (indice)
    //   indice = 0;
    this.estadosPagos[indice].fecha =
      agno + "-" + mes + "-" + dia + "T00:00:00";
    this.ordenCompra.estadosPagos = this.estadosPagos;
  }

  AsignaFechaEstadosPagoSix(nombre: string) {
    // console.log("entre!" + indice);
    let dia = $("#" + nombre)
      .val()
      .split("/")[0];
    let mes = $("#" + nombre)
      .val()
      .split("/")[1];
    let agno = $("#" + nombre)
      .val()
      .split("/")[2];
    // if (indice)
    //   indice = 0;
    this.estadosPagos[0].fecha = agno + "-" + mes + "-" + dia + "T00:00:00";
    this.ordenCompra.estadosPagos = this.estadosPagos;
  }

  cambiaMonto(valor, indice) {
    this.estadosPagos[indice].monto = (this.total * valor) / 100;
    // this.setValEp();
  }

  // setValEp() {
  //   setTimeout(() => {
  //     this.estadosPagos.forEach((el, index) => {
  //       let txtEPMonto = $('#txtEPMonto' + index);
  //       console.log(txtEPMonto);

  //       txtEPMonto.val(el.monto)
  //     });
  //   }, 0);
  // }


  cambiaMontoEP(valor, indice) {
    let porcentajeVal = valor * 100 / this.total;
    let porcentajeOther = (100 - porcentajeVal) / (this.estadosPagos.length - 1 > 0 ? this.estadosPagos.length - 1 : 1)
    // console.log(porcentajeVal, porcentajeOther);


    console.log(this.total, valor, 'Repartir', this.total - valor, 'Entre:', this.estadosPagos.length - 1);

    let asignar = this.estadosPagos.length > 1 ? (this.total - valor) / (this.estadosPagos.length - 1) : 0
    // $("[name='txtEPMonto']").each((index, value) => {
    //   if (indice != index) {
    //     let el = $('#txtEPMonto' + index);
    //     console.log('Recalculando', index, this.estadosPagos[index], el);
    //   }
    // });
    // this.estadosPagos.forEach((el, index) => {
    //   if (indice != index)
    //     el.monto = asignar;
    // });
    this.estadosPagos = this.estadosPagos.map((el, i) => {

      return { ...el, monto: i == indice ? parseInt(valor) : asignar };
    })
    // this.estadosPagos.forEach((el, i) => {
    //   let elementhtml = $('#txtEstadoPagoMonto' + i);
    //   if (i == indice) {
    //     console.log(el, 'cambiado', parseInt(valor));
    // el.monto = valor
    // } else {
    //   console.log(el, 'Calculado', asignar);
    // el.monto = asignar
    // }
    // if (indice == i) {
    //   elementhtml.val(porcentajeVal);
    // } else {
    //   elementhtml.val(porcentajeOther);
    // }
    // })
  }

  cambiaTodosMontos() {
    let indice = 0;
    let origin = this;
    $("[name='txtEstadoPagoMonto']").each(function () {
      origin.estadosPagos[indice].monto = (origin.total * this.value) / 100;
      indice++;
    });
  }

  NombreArchivo() {
    $("#NombreArch").html($("#fileupload1")[0].files[0].name);
    // console.log($("#fileupload1")[0].files[0]);
    this.AdjuntarCotizacion = new mCotizacion(null, "1", $("#fileupload1")[0].files[0].name, null, null, null, null, 2, null, null);
  }

  AdjuntarArchivo() {
    return new Promise((response, reject) => {
      this._sCotizacion.AdjuntarArchivo($("#fileupload1")[0].files[0]).then((res: any) => {
        this.AdjuntarCotizacion.adjunto = res.files.adjuntar.originalFilename;
        this._sCotizacion.postCotizaciones(this.AdjuntarCotizacion).subscribe(res => {
          response(res);
        });
      });
    });
  }

  /* *************************************** CRUD **************************************** */

  Agregar() {
    // console.log(this.ordenCompra.estadosPagos);
    this.ordenCompra.iva = 0;
    this.ordenCompra.boleta = 0;
    // console.log(this.cotizacion);
    if (this.cotizacion) {
      this.cotizacion.estado = 2;
      this._sCotizacion.putCotizaciones(this.cotizacion).subscribe();
    }

    // console.log(this.ordenCompra.estadosPagos);
    // console.log(this.ordenCompra);

    this.estadosPagos.forEach((e) => {
      e.metodoPago = this.ordenCompra.metodoPago;
    });
    this.ordenCompra.estadosPagos = this.estadosPagos;

    if (this.ordenCompra.estadosPagos[0].opcion == "7") {
      if (this.validaPorcentaje()) {
        if (!this.validaMontos()) {
          Swal.fire("Los montos de los estados de pago no son iguales al total");
          return false;
        }
        this.quitaItemVacios();
        this.CargarDatos();
      } else {
        Swal.fire("Los porcentajes de los estados de pago no suman 100%");
      }
    } else {
      this.quitaItemVacios();
      // console.log(this.ordenCompra);
      this.CargarDatos();
    }
  }

  CargarDatos() {
    // console.log(this.ordenCompra);
    this.ordenCompra.centroCosto = { ...this.ordenCompra.centroCosto, subCentroCosto: this.ordenCompra.centroCosto.subCentroCosto.filter(el => el.nombre == this.ordenCompra.subCentroCosto) }
    if (this.actualizar) {
      this.ActualizaOC();
      return null;
    }

    this.movimientos.addOrdenCompra(this.ordenCompra).subscribe(res => console.log(res));

    // this._sOrdenCompra.postOrdenCompra(this.ordenCompra).subscribe((res) => {
    //   this.sendMail(this.total, "creado");
    // });
  }

  quitaItemVacios() {
    this.item = this.item.filter((e) => e.codigo || e.detalle);
    this.item.forEach((element: any) => {
      if (element.iva == 2)
        this.ordenCompra.iva +=
          element.precioUnitario * element.cantidad * (this.env.iva / 100);
      if (element.iva == 3)
        this.ordenCompra.boleta +=
          element.precioUnitario * element.cantidad * (this.env.boleta / 100);
    });
    this.ordenCompra.Items = this.item;

    if (this.estadosPagos[0].opcion != "7") {
      this.estadosPagos[0].monto = this.total;
    }
    // if (this.estadosPagos[0].opcion == "7") {
    //   for (let i = 0; i < this.cantidadEstadosPago; i++) {
    //     this.estadosPagos[i].monto = this.total / this.cantidadEstadosPago;
    //   }
    // }
    this.ordenCompra.estadosPagos = this.estadosPagos;
  }

  cerrarCorrecto() {
    this.mensaje = { ok: null, error: null };
  }

  ActualizaOC() {
    this.ordenCompra.Estado = 1;
    // console.log(this.ordenCompra);
    let fup = $("#fileupload1")
    if (fup && fup[0] && fup[0].files[0]) {
      this.AdjuntarArchivo().then((cotizacion: mCotizacion) => {
        this.ordenCompra.cotizacion = cotizacion._id
        this._sOrdenCompra.putOrdenCompra(this.ordenCompra).subscribe((res) => {
          this.sendMail(this.total, "editado");
        });
      })
    }
    else {
      this._sOrdenCompra.putOrdenCompra(this.ordenCompra).subscribe((res) => {
        this.sendMail(this.total, "editado");
      });
    }
  }

  validaPorcentaje(): boolean {
    let porcentaje = 0;
    $("[name='txtEstadoPagoMonto']").each(function () {
      porcentaje += parseInt(this.value);
    });

    if (Math.round(porcentaje) >= 99 && Math.round(porcentaje) <= 100) {
      return true;
    } else {
      return false;
    }
  }

  validaMontos() {
    let montoTotal = 0;
    let margenError = 50;
    this.ordenCompra.estadosPagos.forEach((element) => {
      montoTotal += element.monto;
    });
    return montoTotal <= this.total + margenError &&
      montoTotal >= this.total - margenError
      ? true
      : false;
  }

  private sendMail(monto: number, text: String) {
    let prioridad;
    if (this.ordenCompra.prioridad == "1") prioridad = "Baja";
    else if (this.ordenCompra.prioridad == "2") prioridad = "Media";
    else prioridad = "Alta";
    this._sCorreo
      .postCuentas({
        subject: "Nueva orden de compra",
        para: "gerenciaFinanzas@trazas.cl",
        messaje: `Estimado,<br><br>Informamos a Ud que se ha ${text} una orden de compra para su 
          gestión: <br><br>
          <table><tr><td>Numero OC :</td><td>${this.ordenCompra.folio}</td></tr>
          <tr><td>Proveedor :</td><td>${this.ordenCompra.proveedor.nombre
          }</td></tr>
          <tr><td>Centro de costo :</td><td>${this.ordenCompra.subCentroCosto
          }</td></tr>
          <tr><td>Prioridad :</td><td>${prioridad}</td></tr>
          <tr><td>Monto Total :</td><td>$ ${new Intl.NumberFormat(
            "de-DE"
          ).format(Math.round(monto))}</td></tr>
          </table><br><br><a href="http://finanzas.trazas-nbi.com/Aprobacion">Aprobación</a>`,
      })
      .subscribe();
    this.Limpiar();
    this.mensaje.ok = "Se ha creado correctamente la orden de compra";
  }

}
