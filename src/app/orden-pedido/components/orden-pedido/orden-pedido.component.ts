import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

//Modelos
import { mProveedor } from '../../../models/mProveedor';
import { mCentroCosto } from '../../../models/mCentroCosto';
import { mGastos } from '../../../models/mGastos';
import { mOrdenPedido } from '../../../models/mOrdenPedido';
import { mOrdenCompra } from '../../../models/mOrdenCompra';
import { mCotizacion } from '../../../models/mCotizacion';

//Servicios
import { sProveedor } from '../../../services/sProveedor.service';
import { sCentroCosto } from '../../../services/sCentroCosto.service';
import { sGastos } from '../../../services/sGastos.service';
import { sOrdenPedido } from '../../../services/sOrdenPedido.service';
import { sCotizacion } from '../../../services/sCotizacion.service';
import { sCorreo } from '../../../services/sCorreo.service';

//Config
import { environment } from "../../../../environments/environment";
import { sOrdenComra } from '../../../services/sOrdenComra.service';
import { sVis_UsuarioPersona } from '../../../services/sVis_UsuarioPersona.service';
import { sMonto } from '../../../services/sMonto.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-orden-pedido',
  templateUrl: './orden-pedido.component.html',
  styleUrls: ['./orden-pedido.component.css'],
  providers: [
    sProveedor,
    sCentroCosto,
    sGastos,
    sCotizacion,
    sCorreo,
    sOrdenPedido,
    sOrdenComra,
    sVis_UsuarioPersona,
    sMonto
  ]
})
export class OrdenPedidoComponent implements OnInit {

  ordenCompra: mOrdenCompra
  ordenPedido: mOrdenPedido;
  //Select
  usuarios: Array<any>;
  Proveedores: Array<mProveedor>;
  centrosCostos: Array<mCentroCosto>;
  TiposGastos: Array<mGastos>;
  AdjuntarCotizacion: mCotizacion;

  fecha: string;
  item: Array<any>;
  cantidadEstadosPago: number;
  estadosPagos: Array<any>;
  folio: string;

  cotizacion: any;
  url: string;

  mensaje: any;

  actualizar: boolean;

  usuario: any;

  saldoOC: Number;

  total: number;
  env: any;

  constructor(
    private _sProveedor: sProveedor,
    private _sGastos: sGastos,
    private _sCentroCosto: sCentroCosto,
    private _sOrdenPedido: sOrdenPedido,
    private _sOrdenComra: sOrdenComra,
    private _rute: ActivatedRoute,
    private _sCotizacion: sCotizacion,
    private _Vis_UsuarioPersona: sVis_UsuarioPersona,
    private _sCorreo: sCorreo,
    private _montos: sMonto,
    private route: ActivatedRoute
  ) {
    this.mensaje = { ok: null, error: null };
    this.total = 0;
    this.limpiar();
    this.env = { iva: 0, boleta: 0 }
    this._montos.getMonto().subscribe(res => {
      this.env = { iva: res[0].iva, boleta: res[0].boleta }
    })
  }

  ngOnInit() {
    var self = this;
    $.getScript("https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.js", function (data, textStatus, jqxhr) {
      $("#drdProveedor").select2();
      $("#drdProveedor").change(() => {
        self.AsignaProveedor(self);
      })
    });
    this.cargaDatos();
    this._rute.params.subscribe(parametro => {
      if (!localStorage.hasOwnProperty("editarOC")) {
        this.ordenPedido.idOrdenCompra = parametro.id;
        this.getOCparaOP();
        this._sOrdenComra.getOrdenComprabyID(parametro.id).subscribe(res => {
          // console.log(res.estadosPagos);
          res.estadosPagos.filter(el => el.estado == 1).forEach(element => {
            this.saldoOC += element.monto;
          });
        });
      }
    });
    this._Vis_UsuarioPersona.fetchVis_UsuarioPersona()
      .then(usuario => {
        this.usuarios = usuario;
      });
  }

  private EditarOP() {
    this._sOrdenPedido.getOrdenPedidobyID(localStorage.getItem("editarOC")).subscribe(op => {
      this.ordenPedido = op;
      localStorage.removeItem("editarOC");
      this.getOC();
      this.estadosPagos = op.estadosPagos;
      this.item = op.Items;
      this.actualizar = true;
    });
  }

  limpiar() {
    this.actualizar = false;
    this.AdjuntarCotizacion = new mCotizacion(null, "1", null, null, null, null, null, 2, null, null);
    this.estadosPagos = [];
    this.usuario = JSON.parse(localStorage.usuario);
    this.Proveedores = [];
    this.centrosCostos = [];
    this.TiposGastos = [];
    this.saldoOC = 0;
    this.item = [{ codigo: null, detalle: null, cantidad: 1, declaracion: null, moneda: "CLP", precioUnitario: null, iva: 2 }];
    this.ordenPedido = { _id: null, idOrdenCompra: null, proveedor: { _id: 0, categoria: 0 }, centroCosto: { _id: 0, subCentroCosto: [] }, subCentroCosto: "0", tipoGasto: { _id: 0 }, subTipoGasto: "0", metodoPago: "0", Items: this.item, estadosPagos: this.estadosPagos, solicita: { id: 0, nombre: null }, descripcion: null, despacho: null, usuarioCreador: this.usuario.idUsuario, usuarioAprovador: null, evaluacion: null, observacionCantidad: null, observacionCalidad: null, Estado: 1, fechaCreacion: null, cotizacion: null, prioridad: "0", iva: 0, boleta: 0, correo: false, ingresoEgreso: 1, motivo: null, condicionPago: null, correlativo: null, chequeEmitido: false, sobregiro: 0 };
  }

  cargaDatos() {
    this.fecha = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
    this._sProveedor.getProveedor().subscribe(proveedor => {
      this.Proveedores = proveedor;
    });
    this._sGastos.getGastos().subscribe(gastos => {
      this.TiposGastos = gastos;
    });
    this._sCentroCosto.getCentroCosto().subscribe(res => {
      this.ordenPedido.subCentroCosto = "0";
      res.forEach(centrosCosto => {
        centrosCosto.subCentroCosto.forEach(subCentros => {
          this.ordenPedido.centroCosto.subCentroCosto.push(subCentros);
        });
      });
      if (localStorage.hasOwnProperty("editarOC"))
        this.EditarOP();
    });
    this.estadosPagos = [{ opcion: null, fecha: null }];
  }

  private getOCparaOP() {
    this._sOrdenComra.getOrdenComprabyID(this.ordenPedido.idOrdenCompra).subscribe(res => {
      this.ordenCompra = res;
      // console.log(this.ordenCompra);
      this._sOrdenPedido.getOrdenPedidobyOrdenCompra(this.ordenCompra._id).subscribe(res => {
        this.ordenPedido.correlativo = res.length + 1;
        // console.log(this.ordenPedido);
      });
    });
  }

  private getOC() {
    this._sOrdenComra.getOrdenComprabyID(this.ordenPedido.idOrdenCompra).subscribe(res => {
      this.ordenCompra = res;
    });
  }

  addNombreResponsable(e) {
    this.ordenPedido.solicita.nombre = e.target.options[e.target.selectedIndex].text
  }

  // AsignaProveedor() {
  //   this._sProveedor.getProveedorbyID(this.ordenPedido.proveedor._id).subscribe(res => {
  //     this.ordenPedido.proveedor = res;
  //   });
  // }

  AsignaProveedor(self) {
    let proveedor = $('#select2-drdProveedor-container').text().trim();
    let prove = self.Proveedores.find(el => el.nombre == proveedor);

    this._sProveedor
      .getProveedorbyID(prove._id)
      .subscribe((res) => {
        self.ordenPedido.proveedor = res;
        // console.log(res);
      });
  }

  AsignaTipoGasto() {
    this.ordenPedido.tipoGasto.subTipoGasto = [];
    this._sGastos.getGastosbyID(this.ordenPedido.tipoGasto._id).subscribe(res => {
      this.ordenPedido.tipoGasto = res;
      this.ordenPedido.subTipoGasto = "0";
    });
  }

  addItem(linea?: number) {
    let add = { codigo: null, detalle: null, cantidad: 1, declaracion: null, moneda: "CLP", precioUnitario: null, iva: 2 };
    if (!this.item[linea].codigo && !this.item[linea].detalle && this.item.length <= linea + 1) {
      this.item.push(add);
      this.AsignaTotal();
    }
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
  }

  setFechaEstadosPago(indice: number, opcion: number) {
    switch (opcion) {
      case 1:
        this.estadosPagos = [{ opcion: '1', fecha: null, monto: null, metodoPago: null, estado: 1, numeroPago: null, factura: null }];
        this.estadosPagos[indice].fecha = new Date;
        this.ordenPedido.estadosPagos = this.estadosPagos;
        break;
      case 2:
        this.estadosPagos = [{ opcion: '2', fecha: null, monto: null, metodoPago: null, estado: 1, numeroPago: null, factura: null }];
        this.estadosPagos[indice].fecha = this.addDays(30);
        this.ordenPedido.estadosPagos = this.estadosPagos;
        break;
      case 3:
        this.estadosPagos = [{ opcion: '3', fecha: null, monto: null, metodoPago: null, estado: 1, numeroPago: null, factura: null }];
        this.estadosPagos[indice].fecha = this.addDays(45);
        this.ordenPedido.estadosPagos = this.estadosPagos;
        break;
      case 4:
        this.estadosPagos = [{ opcion: '4', fecha: null, monto: null, metodoPago: null, estado: 1, numeroPago: null, factura: null }];
        this.estadosPagos[indice].fecha = this.addDays(60);
        this.ordenPedido.estadosPagos = this.estadosPagos;
        break;
      case 5:
        this.estadosPagos = [{ opcion: '5', fecha: null, monto: null, metodoPago: null, estado: 1, numeroPago: null, factura: null }];
        this.estadosPagos[indice].fecha = this.addDays(90);
        this.ordenPedido.estadosPagos = this.estadosPagos;
        break;
      case 6:
        this.estadosPagos = [{ opcion: '6', fecha: null, monto: null, metodoPago: null, estado: 1, numeroPago: null, factura: null }];
        this.estadosPagos[indice].fecha = null;
        this.ordenPedido.estadosPagos = this.estadosPagos;
        setTimeout(() => {
          this.calendario();
        }, 1000);
        break;
      case 7:
        this.cantidadEstadosPago = 1;
        this.estadosPagos[indice].fecha = null;
        this.estadosPagos = [{ opcion: '7', fecha: null, monto: null, metodoPago: null, estado: 1, numeroPago: null, factura: null }];
        setTimeout(() => {
          this.calendario();
        }, 1000);
        break;
    }

  }

  addDays(dias: number): Date {
    let fecha: Date;
    fecha = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * dias));
    return fecha;
  }

  AgregarEstadosPago() {
    // this.estadosPagos = [{ opcion: '7', fecha: null }];
    if (this.estadosPagos.length < this.cantidadEstadosPago)
      for (let i = this.estadosPagos.length - 1; i < this.cantidadEstadosPago - 1; i++) {
        this.estadosPagos.push({ opcion: "7", fecha: null, monto: null, metodoPago: null, estado: 1 });
      }
    else {
      this.estadosPagos.splice(this.cantidadEstadosPago);
    }

    this.ordenPedido.estadosPagos = this.estadosPagos;
    setTimeout(() => {
      this.calendario();
    }, 1000);
  }

  calendario() {
    $(".date").datetimepicker(
      {
        format: 'DD/MM/YYYY'
      }
    );
  }

  AsignaFechaEstadosPago(nombre: string, indice?: number) {
    let dia = $("#" + nombre + indice).val().split("/")[0];
    let mes = $("#" + nombre + indice).val().split("/")[1];
    let agno = $("#" + nombre + indice).val().split("/")[2];
    this.estadosPagos[indice].fecha = agno + "-" + mes + "-" + dia + "T00:00:00";
    this.ordenPedido.estadosPagos = this.estadosPagos;
  }

  AsignaFechaEstadosPagoSix(nombre: string) {
    // console.log("entre!" + indice);
    let dia = $("#" + nombre).val().split("/")[0];
    let mes = $("#" + nombre).val().split("/")[1];
    let agno = $("#" + nombre).val().split("/")[2];
    // if (indice)
    //   indice = 0;
    this.estadosPagos[0].fecha = agno + "-" + mes + "-" + dia + "T00:00:00";
    this.ordenPedido.estadosPagos = this.estadosPagos;
  }

  NombreArchivo() {
    $("#NombreArch").html($("#fileupload1")[0].files[0].name);
    // console.log($("#fileupload1")[0].files[0]);
    this.cotizacion.adjunto = $("#fileupload1")[0].files[0].name;
  }

  /* *************************************** CRUD **************************************** */

  Agregar() {
    this.ordenPedido.iva = 0;
    this.ordenPedido.boleta = 0;

    let monto: number;
    monto = 0;
    this.item = this.item.filter(e => {
      return e.codigo || e.detalle
    });
    this.estadosPagos.forEach(e => {
      e.metodoPago = this.ordenPedido.metodoPago;
    });
    this.ordenPedido.estadosPagos = this.estadosPagos;
    this.item.forEach((element: any) => {
      monto += element.precioUnitario * element.cantidad
      if (element.iva == 2)
        this.ordenPedido.iva += element.precioUnitario * element.cantidad * environment.iva;
      if (element.iva == 3)
        this.ordenPedido.boleta += element.precioUnitario * element.cantidad * environment.boleta;
    });
    monto += this.ordenPedido.iva

    this.ordenPedido.Items = this.item;
    this.estadosPagos[0].monto = monto;
    if (this.estadosPagos[0].opcion == "7") {
      for (let i = 0; i < this.cantidadEstadosPago; i++) {
        this.estadosPagos[i].monto = monto / this.cantidadEstadosPago;
      }
    }

    if (this.actualizar) {
      this.ordenPedido.Estado = 1;
      if ($("#fileupload1")[0].files[0]) {
        this.AdjuntarArchivo()
          .then((cotizacion: mCotizacion) => {
            this.ordenPedido.cotizacion = cotizacion._id
            this._sOrdenPedido.putOrdenPedido(this.ordenPedido).subscribe(res => {
              this.sendMail(this.ordenPedido.estadosPagos.reduce((acc, EP) => acc + EP.monto), "creado");
              Swal.fire(
                "Orden Pedido",
                "Se ha actualizado correctamente la orden de pedido",
                "success"
              );
              this.limpiar();
            });
          });
      } else {
        this._sOrdenPedido.putOrdenPedido(this.ordenPedido).subscribe(res => {
          Swal.fire(
            "Orden Pedido",
            "Se ha actualizada correctamente la orden de pedido",
            "success"
          );
          this.sendMail(this.ordenPedido.estadosPagos.reduce((acc, EP) => acc + EP.monto), "editado");
          this.limpiar();
        });
      }

    } else {
      if ($("#fileupload1")[0].files[0]) {
        this.AdjuntarArchivo()
          .then((cotizacion: mCotizacion) => {
            this.ordenPedido.cotizacion = cotizacion._id
            this._sOrdenPedido.postOrdenPedido(this.ordenPedido).subscribe(res => {
              Swal.fire(
                "Orden Pedido",
                "Se ha creado correctamente la orden de pedido",
                "success"
              );
              this.limpiar();
            });
          });
      } else {
        this._sOrdenPedido.postOrdenPedido(this.ordenPedido).subscribe(res => {
          Swal.fire(
            "Orden Pedido",
            "Se ha creado correctamente la orden de pedido",
            "success"
          );
          this.limpiar();
        });
      }
    }

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
    this.mensaje.ok = "Se ha creado correctamente la orden de compra";
  }

}
