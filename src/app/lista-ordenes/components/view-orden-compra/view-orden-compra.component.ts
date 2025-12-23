import { Component, OnInit, ViewChild } from "@angular/core";
import { sOrdenComra } from "../../../services/sOrdenComra.service";
import { mOrdenCompra } from "../../../models/mOrdenCompra";
import { sCotizacion } from "../../../services/sCotizacion.service";
import { sCorreo } from "../../../services/sCorreo.service";

import { environment } from "../../../../environments/environment";
import { sUsuario } from "../../../services/sUsuario.service";
import { sOrdenPedido } from "../../../services/sOrdenPedido.service";
import { GetMovimientosComponent } from "../get-movimientos/get-movimientos.component";
import { BuscadorComponent } from "../../../shared/components/buscador/buscador.component";
import { Buscador } from "../../../models/buscadoEntity";

declare var Swal: any;

@Component({
  selector: "app-view-orden-compra",
  templateUrl: "./view-orden-compra.component.html",
  styleUrls: ["./view-orden-compra.component.css"],
  providers: [sOrdenComra, sCotizacion, sCorreo, sUsuario, sOrdenPedido],
})
export class ViewOrdenCompraComponent implements OnInit {
  Flujos: Array<any>;

  @ViewChild(GetMovimientosComponent) GetMovimientosComponent: GetMovimientosComponent;
  @ViewChild(BuscadorComponent) BuscadorComponent: BuscadorComponent;

  ordenCompra: mOrdenCompra;
  ocEvaluar: mOrdenCompra;
  buscador: any;

  adjunto: any;
  pagar: number;
  totalOC: number;
  afecto: number;
  TotalPagar: number;
  indice: number;

  url: string;

  mensaje: any;

  creador: string;

  emitido: boolean;
  loading: boolean;

  OP: any;
  idOC: number;

  constructor(
    private _sOrdenComra: sOrdenComra,
    private _sCotizacion: sCotizacion,
    private _sCorreo: sCorreo,
    private _sUsuario: sUsuario,
    private _sOrdenPedido: sOrdenPedido
  ) {
    this.mensaje = { ok: null, error: null };
    this.url = environment.node + "adjuntar/";
    this.buscador = null;
    this.loading = false;
    this.emitido = false;
    this.Flujos = [];
    this.idOC = null;
  }

  ngOnInit() {
    // this.loading = true;
    // this._sOrdenComra.getOrdenCompra().subscribe((res) => {
    //   // console.log(res);
    //   res.forEach((el) => {
    //     el.total = 0;
    //     el.subCentro = el.centroCosto.subCentroCosto.find(
    //       (subCentro) => subCentro.nombre == el.subCentroCosto
    //     );
    //     el.estadosPagos.forEach((element) => {
    //       el.total += element.monto;
    //     });
    //   });
    //   this.Flujos = res
    //     .filter((el) => el.proveedor.nombre);
    //   this.GetOP(res);
    // },
    //   error => {
    //     Swal.fire(
    //       "Lista Ordenes",
    //       "Error: " + error,
    //       "error"
    //     );
    //     this.loading = false;
    //   });
  }

  TraeDatosPromise() {
    return new Promise((resolve, reject) => {
      this._sOrdenComra.getOrdenCompra().subscribe(
        async (res) => {
          const OP = await this._sOrdenPedido.getOrdenPedido().toPromise();
          // console.log(OP);
          const Ordenes = res.concat(OP)
          // console.log("Ordenes: ", Ordenes);
          let presentador = Ordenes.map(el => {
            return {
              ...el,
              folio: el.folio ? el.folio : el.idOrdenCompra ? Ordenes.find(OC => OC._id == el.idOrdenCompra).folio + " OP " + el.correlativo.toString().padStart(3, "0") : null,
              total: el.estadosPagos.reduce((acc, el) => acc + el.monto, 0),
              subCentro: el.centroCosto.subCentroCosto.find((subCentro) => subCentro.nombre == el.subCentroCosto)
            }
          });
          // res.forEach((el) => {
          //   el.total = 0;
          //   el.subCentro = el.centroCosto.subCentroCosto.find(
          //     (subCentro) => subCentro.nombre == el.subCentroCosto
          //   );
          //   el.estadosPagos.forEach((element) => {
          //     el.total += element.monto;
          //   });
          // });
          // console.log(res);
          resolve(
            presentador.filter((el) => el.proveedor.nombre).sort(this.ordenaFlujos)
          );
        },
        (err) => {
          reject(new Error(err));
        }
      );
    });
  }

  GetOP(OC, e?) {
    this._sOrdenPedido.getOrdenPedido().subscribe((OP) => {
      // console.log(OP);
      OP.forEach((element) => {
        // console.log(element.centroCosto.subCentroCosto.find(subCentro => subCentro.nombre == element.subCentroCosto))
        this.Flujos.push({
          ...element,
          folio:
            OC.filter((el) => el._id == element.idOrdenCompra)[0].folio +
            " OP " +
            element.correlativo.toString().padStart(3, "0"),
          subCentro: element.centroCosto.subCentroCosto.find(
            (subCentro) => subCentro.nombre == element.subCentroCosto
          ),
          total: this.retTotal(element.Items),
        });
      });
      this.Flujos = this.Flujos.sort(this.ordenaFlujos);
      this.loading = false;
    });
  }

  cargaDatos() {
    this.GetMovimientosComponent.load();
  }

  retTotal(items: Array<any>): Number {
    let total = 0;
    items.forEach((item) => {
      total += item.precioUnitario * item.cantidad;
    });
    return total;
  }

  ordenaFlujos(a, b) {
    return a.fechaCreacion < b.fechaCreacion ? 1 : -1;
  }

  TraeBuscador() {
    if (this.buscador == null) {
      this.buscador = {
        inicio: null,
        termino: null,
        oc: null,
        proveedor: null,
        cCosto: null,
        factura: null,
        pago: null,
      };
    } else {
      this.buscador = null;
    }
  }

  Filtrar(e: Buscador) {
    this.buscador = null;
    this.GetMovimientosComponent.viewListadoMovimientos$ = null;
    this.GetMovimientosComponent.viewListadoMovimientos$ = this.BuscadorComponent.retViewListadoMovimientos(e)
    // this.TraeDatosPromise()
    //   .then((ordenes: Array<any>) => {
    //     this.Flujos = ordenes;
    //     // console.log(this.Flujos);
    //     if (e.inicio && e.termino)
    //       this.Flujos = this.Flujos.filter(
    //         (el) =>
    //           el.fechaCreacion >= e.inicio && el.fechaCreacion <= e.termino
    //       );
    //     if (e.oc)
    //       this.Flujos = this.Flujos.filter(
    //         (el) => el.folio && el.folio.includes(e.oc)
    //       );
    //     if (e.proveedor)
    //       this.Flujos = this.Flujos.filter(
    //         (el) => el.proveedor.nombre == e.proveedor
    //       );
    //     if (e.cCosto)
    //       this.Flujos = this.Flujos.filter(
    //         (el) => el.subCentro.nombre == e.cCosto
    //       );
    //     this.loading = false;
    //   })
    //   .catch((err) => console.log(err));
  }

  PopUp(flujo) {
    this.idOC = null;
    this.OP = null;
    this.pagar = null;
    this.totalOC = 0;
    this.afecto = 0;
    this.TotalPagar = 0;

    if (flujo.Estado == 1 || flujo.Estado == 3) {
      // console.log("Orden pendiente o rechazada , no se puede acceder a ella")
      return false
    }

    if (this.isOC(flujo)) {
      this.idOC = flujo._id;
    } else {
      this.OP = { _id: flujo._id };
    }

    // this._sOrdenComra.getOrdenComprabyID(id).subscribe((res) => {
    //   // console.log(res);
    //   this.ordenCompra = res;
    //   if (res.chequeEmitido)
    //     this.emitido=res.chequeEmitido
    //   this.retUsuario(res.usuarioCreador);
    //   if (this.ordenCompra.cotizacion)
    //     this._sCotizacion
    //       .getCotizacionesbyID(this.ordenCompra.cotizacion)
    //       .subscribe((res) => {
    //         this.adjunto = res.adjunto;
    //       });
    //   this.ordenCompra.Items.forEach((el) => {
    //     this.totalOC += el.cantidad * el.precioUnitario;
    //     this.afecto += el.iva == "2" ? (this.totalOC * 19) / 100 : 0;
    //   });
    //   this.TotalPagar = this.totalOC + this.afecto;
    // },
    // error =>{
    //   this.OP = { _id:id }
    // });
  }

  guardar() {
    console.log(this.ordenCompra);
    if (this.isOC) {
      this._sOrdenComra
        .putOrdenCompra(this.ordenCompra)
        .subscribe(oc => {
          Swal.fire(
            'Orden de Compra',
            'Se ha actualizado la orden de compra',
            'success'
          );
          this.Cerrar()
        });
    }
  }

  Limpiar() {
    this.Flujos = [];
    this.ordenCompra = null;
    this.ocEvaluar = null;
  }

  Cerrar() {
    this.ordenCompra = null;
    this.ocEvaluar = null;
  }

  isOC(elemento): boolean {
    let { folio } = elemento;
    if (folio.includes("OP")) return false;
    else return true;
  }

  sendMail(id, elemento) {
    let nombre: string = "";
    let correo;

    if (this.isOC(elemento)) {
      this._sOrdenComra.getOrdenComprabyID(id).subscribe((res) => {
        // console.log(res);
        // console.log(res.folio);

        // nombre = res.folio + '.pdf';
        nombre =
          res.folio +
          "_" +
          res.proveedor.nombre +
          "_" +
          res.subCentroCosto

        correo = `Estimado,<br><br>Informamos a Ud que se ha creado una orden de compra N° ${res.folio}
                <br><br>
                <a href="http://finanzas.trazas-nbi.com:3700/api/adjuntarOC/${nombre}">Orden de Compra</a>`;

        let send = {
          subject: nombre,
          messaje: correo,
          archivo: nombre,
          cotizacion: null,
          para: res.proveedor.mail,
        };

        if (res.cotizacion)
          //Correo con Cotizacion
          this._sCotizacion
            .getCotizacionesbyID(res.cotizacion)
            .subscribe((coti) => {
              this._sCorreo
                .postCorreoAttach({ ...send, cotizacion: coti.adjunto })
                .subscribe((correo) => {
                  this.mensaje.ok =
                    "Se ha enviado de forma correcta la orden de compra al proveedor";
                  res.correo = true;
                  this._sOrdenComra.putOrdenCompra(res).subscribe((res) => {
                    this.ngOnInit();
                  });
                });
            });
        else {
          //Correo sin Cotizacion
          this._sCorreo.postCorreoAttach({ ...send }).subscribe((correo) => {
            this.mensaje.ok =
              "Se ha enviado de forma correcta la orden de compra al proveedor";
            res.correo = true;
            this._sOrdenComra.putOrdenCompra(res).subscribe((res) => {
              this.ngOnInit();
            });
          });
        }
      });
    } else {
      this._sOrdenPedido.getOrdenPedidobyID(id).subscribe((ordenPedido) => {
        console.log(ordenPedido);
        this._sOrdenComra
          .getOrdenComprabyID(ordenPedido.idOrdenCompra)
          .subscribe((ordenCompra) => {
            let numop: string = ordenPedido.correlativo
              .toString()
              .padStart(3, "0");
            nombre =
              "OP_" +
              numop +
              "_" +
              ordenPedido.proveedor.nombre +
              "_" +
              ordenPedido.subCentroCosto +
              "-OC_" +
              ordenCompra.folio

            correo = `Estimado,<br><br>Informamos a Ud que se ha creado una orden de pedido N° ${numop}, 
                    la cual se encuenta asociada a la OC: ${ordenCompra.folio}`;

            let send = {
              subject: nombre,
              messaje: correo,
              archivo: nombre,
              cotizacion: null,
              para: ordenPedido.proveedor.mail,
            };

            if (ordenPedido.cotizacion) {
              this._sCotizacion
                .getCotizacionesbyID(ordenPedido.cotizacion)
                .subscribe((cotizacion) => {
                  this._sCorreo
                    .postCorreoAttach({
                      ...send,
                      cotizacion: cotizacion.adjunto,
                    })
                    .subscribe((correo) => {
                      ordenPedido.correo = true;
                      this._sOrdenPedido
                        .putOrdenPedido(ordenPedido)
                        .subscribe((update) => {
                          this.mensaje.ok =
                            "Se ha enviado de forma correcta la orden de pedido al proveedor";
                          this.ngOnInit();
                        });
                    });
                });
            } else {
              this._sCorreo
                .postCorreoAttach({ ...send })
                .subscribe((correo) => {
                  ordenPedido.correo = true;
                  this._sOrdenPedido
                    .putOrdenPedido(ordenPedido)
                    .subscribe((update) => {
                      this.mensaje.ok =
                        "Se ha enviado de forma correcta la orden de pedido al proveedor";
                      this.ngOnInit();
                    });
                });
            }
          });
      });
    }
  }

  cerrarCorrecto() {
    this.mensaje = { ok: null, error: null };
  }

  evaluar(id: string, folio: string) {
    console.log(folio);
    if (folio.includes("OP")) {
      this._sOrdenPedido.getOrdenPedidobyID(id).subscribe(op => {
        this.ocEvaluar = op;
      });
    } else {
      this._sOrdenComra.getOrdenComprabyID(id).subscribe((res) => {
        this.ocEvaluar = res;
      });
    }
  }

  getColor(categoria, evaluacion) {
    let total = 0;
    let promedio = 0;
    if (categoria == 1) {
      total =
        evaluacion.disponibilidad +
        evaluacion.precio +
        evaluacion.tiempo +
        evaluacion.calidad;
      promedio = total / 4;
    } else {
      total =
        evaluacion.disponibilidad +
        evaluacion.precio +
        evaluacion.tiempo +
        evaluacion.calidad +
        evaluacion.ssoma;
      promedio = total / 5;
    }
    return this.retColor(promedio);
  }

  retColor(promedio) {
    if (promedio >= 2.54) return "#64bd63";
    if (promedio < 2.54 && promedio >= 1.8) return "#f0b518";
    else return "#dd5826";
  }

  retUsuario(id) {
    this.creador = null;
    this._sUsuario.getUsuarioPersonaByIdUsuario(id).subscribe((res) => {
      this.creador = res.nombre + " " + res.paterno;
    });
  }

  actualizaEvaluacion() {
    this.Cerrar();
    this.ngOnInit();
    this.mensaje.ok = "Se ha evaluado de forma correcta al proveedor";
  }

  cerrarOrden() {
    this.idOC = null;
    this.OP = null;
  }

}
