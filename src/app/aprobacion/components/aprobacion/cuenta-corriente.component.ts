import { Component, OnInit } from "@angular/core";

import { estadoPago, mOrdenCompra } from "../../../models/mOrdenCompra";
import { mCuentas } from "../../../models/mCuentas";
import { mCentroCosto } from "../../../models/mCentroCosto";

import { sOrdenComra } from "../../../services/sOrdenComra.service";
import { sCuentas } from "../../../services/sCuentas.service";
import { sCotizacion } from "../../../services/sCotizacion.service";

// Config
import { environment } from "../../../../environments/environment";
import { sCorreo } from "../../../services/sCorreo.service";
import { sUsuario } from "../../../services/sUsuario.service";
import { sOrdenPedido } from "../../../services/sOrdenPedido.service";
import { mOrdenPedido } from "../../../models/mOrdenPedido";
import { sCentroCosto } from "../../../services/sCentroCosto.service";
import { comunesFechas } from "../../../share/fechas";
import { sBolsas } from "../../../services/sBolsas.service";
import { Observable } from "rxjs";
import { MovimientoRelationShip } from "../../../models/movimiento";
import { sMovimientoService } from "../../../services/sMovimiento.service";
import { TiposMovimientos } from "../../../models/tiposMovimientos";

// import html2canvas from 'html2canvas';

declare var $: any;
declare var jsPDF: any;
declare var Swal: any;

@Component({
    selector: "app-cuenta-corriente",
    templateUrl: "./cuenta-corriente.component.html",
    styleUrls: ["./cuenta-corriente.component.css"],
    providers: [
        sOrdenComra,
        sCuentas,
        sCotizacion,
        sCorreo,
        sUsuario,
        sOrdenPedido,
        sCentroCosto,
        comunesFechas,
        sBolsas,
        sMovimientoService
    ]
})
export class aprobacion implements OnInit {
    Flujos: Array<any>;
    ordenCompra: mOrdenCompra;
    ordenPedido: mOrdenPedido;

    movimientos$: Observable<MovimientoRelationShip[]>;

    idMovimiento: number | null;
    idOP: number | null;

    // total: number;
    imprimir: boolean;

    indice: number;
    // eCentroCosto: mCentroCosto;

    adjunto: any;
    pagar: number;
    totalOC: number;
    afecto: number;
    TotalPagar: number;
    firmar: boolean;

    url: string;
    urlVerOc: string;
    urlVerFull: string;

    motivo: String;
    rechazarMotivo: boolean;

    creador: string;

    tipo: boolean;
    celular: boolean;

    OcOriginal: any;
    folio: string;

    // PopUp
    buscador: boolean;
    loading: boolean;
    // idOC:string;
    // idOP:string;

    tiposMovimiento: TiposMovimientos;

    constructor(
        private _sOrdenComra: sOrdenComra,
        private _sCuentas: sCuentas,
        private _sCotizacion: sCotizacion,
        private _sCorreo: sCorreo,
        private _sUsuario: sUsuario,
        private _sOrdenPedido: sOrdenPedido,
        private _sCentroCosto: sCentroCosto,
        private _sComunesFecha: comunesFechas,
        private _sBolsas: sBolsas,
        private movimientoService: sMovimientoService
    ) {
        this.tiposMovimiento = environment.tiposOC;
        this.movimientos$ = this.movimientoService.getPorAprobar();
        this.url = environment.node + "adjuntar/";
        this.imprimir = false;
        this.buscador = false;
        this.Flujos = [];
        this.folio = null;
        // this.total = 0;
        // this.eCentroCosto = null;
        this.ordenCompra = null;
        this.indice = 0;
        this.firmar = false;
        this.tipo = true;
        this.OcOriginal = null;
        this.loading = false;
        this.celular = this.isMobile();
        this.urlVerOc = 'http://trazas-nbi.com:3700/api/adjuntarOC/'
        // this.ordenCompra = { _id: null, folio: null, proveedor: null, centroCosto: null, subCentroCosto: null, tipoGasto: null, subTipoGasto: null, metodoPago: null, Items: null, estadosPagos: null, solicita: null, descripcion: null, despacho: null, usuarioCreador: null, usuarioAprovador: null, evaluacionCantidad: null, evaluacionCalidad: null, observacionCantidad: null, observacionCalidad: null, Estado: null, fechaCreacion: null }
    }

    clean() {
        this.movimientos$ = null;
        this.idMovimiento = null;
        this.idOP = null;
        this.loading = false;
        this.movimientos$ = this.movimientoService.getPorAprobar();
    }

    ngOnInit() {
        console.clear();
        // setInterval(this.cargaDatos(), 300000);
        // this._sCuentas.getCuentas().subscribe((res) => {
        //     this.cargaDatos();
        // });
        // this.movimientos$.subscribe(res => console.log(res));
        // this.loading = false;
    }

    isMobile() {
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch (e) {
            return false;
        }
    }

    calendario() {
        $(".date").datetimepicker({ format: "DD/MM/YYYY" });
    }

    cargaDatos(e?: Object) { // let saldo = this.total;
        this.Flujos = [];

        this._sOrdenComra.getOrdenCompra().subscribe((res) => { // console.log(res);

            this.tipo = true;

            this.Flujos = res.filter((el) => el.Estado == 1);
            this.Flujos.forEach((el) => { // console.log(el.cotizacion);
                el.subCentro = el.centroCosto.subCentroCosto.filter((subCentro) => subCentro.nombre == el.subCentroCosto)[0];
                if (el.cotizacion)
                    this._sCotizacion.getCotizacionesbyID(el.cotizacion).subscribe((res) => {
                        el.adjunto = res.adjunto;
                        this.loading = false;
                    });
            });

            if (e)
                this.GetOP(res, e);
            else
                this.GetOP(res);



            // console.log(this.Flujos);
        });
    }

    Filtrar(e) {
        this.loading = true;
        this.cargaDatos(e);
        this.buscador = false;
    }

    filtrando(arr, e) {
        if (e.inicio && e.termino)
            arr = arr.filter((el) => el.fechaCreacion >= e.inicio && el.fechaCreacion <= e.termino);
        if (e.oc)
            arr = arr.filter((el) => el.folio && el.folio.includes(e.oc));
        if (e.proveedor)
            arr = arr.filter((el) => el.proveedor.nombre == e.proveedor);
        if (e.cCosto)
            arr = arr.filter((el) => el.subCentro.nombre == e.cCosto);
        return arr;
    }

    GetOP(OC, e?) { // console.log("Ordenes de Compra: ", OC);
        this._sOrdenPedido.getOrdenPedido().subscribe((OP) => { // console.log(OP);
            OP.filter((el) => el.Estado == 1).forEach((element) => {
                console.log(element);
                this.Flujos.push({
                    ...element,
                    folio: OC.filter((el) => el._id == element.idOrdenCompra)[0].folio + " OP " + element.correlativo.toString().padStart(3, "0"),
                    subCentro: element.centroCosto.subCentroCosto.filter((subCentro) => subCentro.nombre == element.subCentroCosto)[0]
                });
            });
            if (e) {
                this.Flujos = this.filtrando(this.Flujos, e);
            }
            this.loading = false;
        });
    }

    getDetalleOP(id) {
        this.tipo = false;
        this.urlVerFull = this.urlVerOc;
        this._sOrdenPedido.getOrdenPedidobyID(id).subscribe((res) => {
            this.ordenPedido = res;
            this.ordenCompra = res;
            // console.log(res);

            // this.RetPDF().save('web.pdf');
            this._sCotizacion.getCotizacionesbyID(this.ordenPedido.cotizacion).subscribe((res) => {
                this.adjunto = res.adjunto;
            });
            this._sOrdenComra.getOrdenComprabyID(res.idOrdenCompra).subscribe((OC) => {
                this.folio = OC.folio;
                this.OcOriginal = OC;
                this.urlVerFull += OC.folio + "_" + OC.proveedor.nombre + "_" + OC.subCentroCosto + ".pdf"
            });
        });
    }

    retSaldoOC(): number {
        return this.OcOriginal.estadosPagos.filter(el => el.estado <= 3).reduce((acc, el) => acc + el.monto, 0)
    }

    viewOc(movimiento: MovimientoRelationShip) {
        if (movimiento.tipo == environment.tiposOC.ordenPedido) {
            this.idOP = movimiento.idMovimiento;
        } else {
            this.idMovimiento = movimiento.idMovimiento;
        }
    }

    PopUp(id, indice) {
        // console.log(id);
        // console.log(indice);
        this.pagar = null;
        this.totalOC = 0;
        this.afecto = 0;
        this.TotalPagar = 0;
        this.indice = indice - 1;
        this._sOrdenComra.getOrdenComprabyID(id).subscribe((res) => {
            // console.log(res);
            // if (!res.status)
            this.ordenCompra = res;
            // this.RetPDF().save('web.pdf');
            // this.descuentaBolsa(this.ordenCompra);
            // this._sUsuario.getUsuariobyID(this.ordenCompra.solicita.id).subscribe(res => {

            //     console.log(res);
            // })
            if (this.ordenCompra.cotizacion)
                this._sCotizacion.getCotizacionesbyID(this.ordenCompra.cotizacion).subscribe((res) => {
                    this.adjunto = res.adjunto;
                });
        }, (error) => {
            this.getDetalleOP(id);
        });
    }

    Limpiar() {
        this.ordenCompra = null;
        this.imprimir = false;
        this.firmar = false;
        this.OcOriginal = null;
    }

    imprSelec() {
        this.imprimir = true;
        // console.log()
        let header = `
    <link rel="shortcut icon" href="/assets/favicon.ico">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://smtpjs.com/v3/smtp.js"></script>
    `;
        let css = this.css();
        setTimeout(() => {
            let html = $("#popUp")[0].innerHTML;
            let ventimp = window.open(" ", "popimpr");
            ventimp.document.write(header + html + css);
            ventimp.document.close();
            setTimeout(() => {
                ventimp.print();
                ventimp.close();
                this.imprimir = false;
            }, 300);
        }, 300);
    }

    Guardar() {
        // this.htmltoPDF();
        this.loading = true;
        if (this.tipo) {
            console.log("firmar OC");
            this.ordenCompra.Estado = 2;
            this.ordenCompra.fechaFirma = new Date().toString();
            this.descuentaBolsa(this.ordenCompra);
            this.loading = false;
            this._sOrdenComra.putOrdenCompra(this.ordenCompra).subscribe((res) => {
                this.htmltoPDF();
                console.log(this.ordenCompra);
                this.sendMail(this.retTotal(this.ordenCompra.estadosPagos), "Aprobado");
                this.Limpiar();
                this.cargaDatos();
            });
        } else {
            console.log("firmar OP");
            this.ordenPedido.Estado = 2;

            //Resta valor OP de estados de Pago pendientes de la OC
            this.OcOriginal.estadosPagos.filter(el => el.estado <= 3).forEach((estadoPago) => {
                estadoPago.monto -= this.retTotal(this.ordenPedido.estadosPagos) / this.OcOriginal.estadosPagos.filter(el => el.estado <= 3).length ? this.OcOriginal.estadosPagos.filter(el => el.estado <= 3).length : 1;
            });
            this.OcOriginal.iva -= this.ordenPedido.iva;

            this._sOrdenComra.putOrdenCompra(this.OcOriginal).subscribe((res) => {
                this.ordenPedido.fechaFirma = new Date().toString();
                this._sOrdenPedido.putOrdenPedido(this.ordenPedido).subscribe((res) => {
                    this.htmltoPDF();
                    this.Limpiar();
                    this.cargaDatos();
                });
            });
        }
    }

    retTotalOC(estadoPagos: Array<any>) {
        // console.log("EP: ", estadoPagos);

        return estadoPagos.reduce((acc, estadoPago) => acc + estadoPago.monto, 0);
    }

    descuentaBolsa(oc: mOrdenCompra) {
        // console.log("Orden de Compra: ", oc);

        // let resto = this.retTotalOC(oc.estadosPagos);
        this._sBolsas.getBolsas().subscribe(bolsas => {
            let bolsa = bolsas.find(bolsa => bolsa.subCentroCosto.nombre == oc.subCentroCosto && bolsa.tipoGasto.includes(oc.tipoGasto.nombre))
            // console.log("Antes", { ...bolsa });
            if (bolsa) {
                // bolsa.pagos.forEach((pagos, i, arr) => {
                // if (resto > 0)
                // resto = this.restaSaldo(pagos, resto, i, arr.length)

                // });
                oc.estadosPagos.forEach(EP => {
                    bolsa.pagos = this.restaSaldoEp(EP, bolsa);
                });
                this._sBolsas.putBolsa(bolsa).subscribe();
                // console.log(bolsa);
            }
            // let temp = { ...bolsa }
            // console.log("Descontada: ", temp);
        });

    }

    restaSaldoEp({ monto, fecha }: estadoPago, { pagos }): any[] {
        // console.log(monto, fecha);
        let fechaDescontar = new Date(fecha);
        return pagos.map(pago => {
            let fechaPago = new Date(pago.fechaPago)
            if (fechaPago.getMonth() == fechaDescontar.getMonth() && fechaPago.getFullYear() == fechaDescontar.getFullYear()) {
                return { ...pago, monto: pago.monto - monto }
            } else {
                return pago
            }

        });
    }

    restaSaldo(pagos, resto, indice, largo): number {
        let saldo = pagos.monto - pagos.gastado;
        if (indice == largo - 1) {
            pagos.gastado = pagos.gastado + resto;
        } else {
            if (saldo > 0) {
                if (saldo < resto) {
                    resto -= saldo;
                    pagos.gastado = pagos.monto
                } else {
                    pagos.gastado += resto;
                    resto = 0;
                }
            }
        }
        return resto;
    }

    rechazar() {
        if (!this.rechazarMotivo || this.motivo == "") {
            this.rechazarMotivo = true;
            return null;
        }

        const self = this;
        Swal.fire({
            title: "Rechazando",
            text: "¿Esta seguro de rechazar la Orden de compra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Rechazar"
        }).then((result) => {
            if (result.value)
                self.rechazando();
        });
    }

    rechazando() {
        if (this.tipo) {
            this.ordenCompra.motivo = this.motivo;
            this.ordenCompra.Estado = 3;
            this._sOrdenComra.putOrdenCompra(this.ordenCompra).subscribe((res) => {
                Swal.fire("Orden de Compra", "Se ha rechazado de forma correcta la orden de compra", "success");
                this.sendMail(this.retTotal(this.ordenCompra.estadosPagos), "rechazado");
                this.Limpiar();
                this.cargaDatos();
            });
        } else {
            this.ordenPedido.motivo = this.motivo;
            this.ordenPedido.Estado = 3;
            this._sOrdenPedido.putOrdenPedido(this.ordenPedido).subscribe((res) => {
                Swal.fire("Orden de Pedido", "Se ha rechazado de forma correcta la orden de pedido", "success");
                this.sendMail(this.retTotal(this.ordenCompra.estadosPagos), "rechazado");
                this.Limpiar();
                this.cargaDatos();
            });
        }
    }

    AsignaFechaCompromiso() { // console.log("entre!" + indice);
        let dia = $("#txtCompromiso").val().split("/")[0];
        let mes = $("#txtCompromiso").val().split("/")[1];
        let agno = $("#txtCompromiso").val().split("/")[2];
        // if (indice)
        // indice = 0;
        this.ordenCompra.estadosPagos[this.indice].fecha = agno + "-" + mes + "-" + dia + "T00:00:00";
    }

    Cerrar() {
        this.ordenCompra = null;
        this.ordenPedido = null;
        this.OcOriginal = null;
        this.adjunto = null;
        this.tipo = true;
    }

    retUsuario(id) {
        this._sUsuario.getUsuarioPersonaByIdUsuario(id).subscribe((res) => {
            this.creador = res.nombre + " " + res.paterno;
        });
    }

    htmltoPDF() {
        this.imprimir = true;
        this.firmar = true;

        // this.RetPDF().save('test');
        // return false
        // output as blob
        var pdf = this.RetPDF().output("blob");

        var formData = new FormData();
        var xhr = new XMLHttpRequest();

        // console.log("generando PDF")

        if (this.tipo)
            formData.append("adjuntar", pdf, this.ordenCompra.folio + "_" + this.ordenCompra.proveedor.nombre + "_" + this.ordenCompra.subCentroCosto + ".pdf");
        else
            formData.append("adjuntar", pdf, "OP_" + this.ordenPedido.correlativo.toString().padStart(3, "0") + "_" + this.ordenCompra.proveedor.nombre + "_" + this.ordenCompra.subCentroCosto + "-OC_" + this.folio + ".pdf");
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status != 200)
                    return null;
            }
        };
        xhr.open("POST", environment.node + "adjuntarOC", true);
        xhr.send(formData);

        // this.Limpiar();
        // this.cargaDatos();
        Swal.fire("Orden de Compra", "Se ha firmado correctamente la orden de compra", "success");
        this.loading = false;
    }

    private sendMail(monto
        : number, text
            : String) {
        let prioridad;
        if (this.ordenCompra.prioridad == "1")
            prioridad = "Baja";
        else if (this.ordenCompra.prioridad == "2")
            prioridad = "Media";
        else
            prioridad = "Alta";



        let correo;

        correo = `Estimado,<br><br>Informamos a Ud que se ha ${text} una orden de compra para su 
    gestión: <br><br>
    <table><tr><td>Numero OC :</td><td>${this.ordenCompra.folio
            }</td></tr>
    <tr><td>Proveedor :</td><td>${this.ordenCompra.proveedor.nombre
            }</td></tr>
    <tr><td>Centro de costo :</td><td>${this.ordenCompra.subCentroCosto
            }</td></tr>
    <tr><td>Prioridad :</td><td>${prioridad}</td></tr>
    <tr><td>Monto Total :</td><td>$ ${new Intl.NumberFormat("de-DE").format(Math.round(monto))
            }</td></tr>`;
        if (text == "rechazado")
            correo += `<tr><td>Motivo :</td><td>${this.motivo
                } < /td></tr > `;

        correo += ` </table>`;
        // correo +=`<br><br><a href="http://finanzas.trazas-nbi.com/Aprobacion ">Aprobación</a>`

        let asunto: string;
        if ((text == "rechazado"))
            asunto = "Orden de compra Rechazada";
        else
            asunto = "Orden de compra Aprobada";


        // if (this.ordenCompra.solicita.id)
        //     this._sUsuario.getUsuariobyID(this.ordenCompra.solicita.id).subscribe(res => {
        //         console.log(res);
        //     })


        this._sCorreo.postCuentas({
            subject: asunto,
            // para: 'gomez.romero.oscar@gmail.com',
            para: "administracion@trazas.cl",
            messaje: correo
        }).subscribe();
    }

    retTotal(estadosPago) {
        let totalOC;
        totalOC = 0;
        estadosPago.forEach((el) => {
            totalOC += el.monto;
        });
        return totalOC;
    }

    RetPDF() {
        var pdf = new jsPDF("p", "pt", "letter");

        let margins = {
            top: 230,
            bottom: 60,
            left: 15,
            width: 522
        };

        var width = pdf.internal.pageSize.getWidth();

        var img = new Image();
        img.src = "assets/Images/tzs.jpg";
        // header
        pdf.addImage(img, "png", 30, 15, 82, 95);
        pdf.setFontSize(10);
        pdf.text(140, 30, "TRAZAS GESTION DE PROYECTOS DE INFRAESTRUCTURA LTDA");
        pdf.text(140, 45, "RUT: 76.151.605-1");
        pdf.text(140, 60, "Cirujano Guzman 24 Depto 83");
        pdf.text(140, 75, "Fono           2 2982 9588 - 2 2492 0809");
        pdf.text(140, 90, "Giro           Arquitectura - Construcción");

        // Title
        pdf.setFillColor(202, 202, 202);
        pdf.rect(0, 125, width, 20, "F");
        pdf.setFontSize(12);
        if (this.tipo) {
            pdf.text("ORDEN DE COMPRA", width / 2, 140, "center");
            pdf.text("N° " + this.ordenCompra.folio, width - 30, 140, "right");
        } else {
            pdf.text(`ORDEN DE PEDIDO N° ${this.ordenPedido.correlativo}`, width / 2, 140, "center");
            // console.log(this.ordenPedido);
        }



        // Proveedor
        pdf.setFontSize(10);
        // Proveedor --> Cabeceras
        pdf.text(30, 160, "Señor (es)");
        pdf.text(width - 170, 160, "Fecha");
        pdf.text(30, 175, "Dirección");
        pdf.text(30, 190, "RUT");
        pdf.text(30, 205, "Teléfono");
        pdf.text(30, 220, "Contacto");
        // pdf.text(width - 170, 220, 'Email');
        // Proveedor --> Datos
        pdf.text(140, 160, this.ordenCompra.proveedor.nombre);
        let fecha = this.ordenCompra.fechaCreacion.toString().split("T")[0];
        // console.log(fecha.split("-")[2]+"/"+ fecha.split("-")[1] +"/"+ fecha.split("-")[0]);
        // console.log(fecha.getDate()+"/"+ fecha.getMonth()+1 +"/"+ fecha.getFullYear());
        pdf.text(fecha.split("-")[2] + "/" + fecha.split("-")[1] + "/" + fecha.split("-")[0], width - 30, 160, "right");
        pdf.text(140, 175, this.ordenCompra.proveedor.direccion ? this.ordenCompra.proveedor.direccion : " ");
        pdf.text(140, 190, this.ordenCompra.proveedor.rutProveedor);
        pdf.text(140, 205, this.ordenCompra.proveedor.telefono ? this.ordenCompra.proveedor.telefono : " ");
        pdf.text(140, 220, this.ordenCompra.proveedor.contacto);
        pdf.text("Email  " + this.ordenCompra.proveedor.mail, width - 30, 220, "right");

        // Centro costo
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, 240, width - 60, 25);
        // empty red square
        // Centro Costo --> Datos
        pdf.text(55, 255, "1.- CENTRO DE COSTO");
        pdf.text(width / 2, 255, "- " + this.ordenCompra.subCentroCosto);

        // Items

        // Items --> Cabecera
        pdf.text(55, 290, "2.- DETALLE DE MATERIALES");
        pdf.setFillColor(26, 151, 2);
        pdf.rect(55, 300, width - 120, 25, "F"); //
        pdf.setTextColor(255, 255, 255);
        pdf.text(80, 315, "Item");
        pdf.text(330, 315, "Cantidad");
        pdf.text(420, 315, "Unitario");
        pdf.text(510, 315, "Total");

        let top: number = 320;
        let item = 0;
        let total = 0;
        pdf.setTextColor(0, 0, 0);

        // Items --> Elementos
        let prevCod,
            prevDet = true;

        let totales = width - 65;

        this.ordenCompra.Items.forEach((element) => {
            top += 20;
            item += 1;
            // console.log(top);
            // console.log(element);
            pdf.text(80, top, item.toString());
            let horizontal = 140;
            if (element.codigo) {
                if (prevCod) {
                    pdf.setTextColor(255, 255, 255);
                    pdf.text(horizontal, 315, "Codigo");
                    prevCod = false;
                }
                pdf.setTextColor(0, 0, 0);
                pdf.text(horizontal - 20, top, element.codigo);
                horizontal += 100;
            }
            if (element.detalle) {
                if (prevDet) {
                    pdf.setTextColor(255, 255, 255);
                    pdf.text(horizontal, 315, "Detalle");
                    prevDet = false;
                }
                pdf.setTextColor(0, 0, 0);
                pdf.text(horizontal - 20, top, element.detalle);
            }
            pdf.text(330, top, element.cantidad.toString());
            pdf.text(420, top, "$ " + this.format(element.precioUnitario).toString());
            pdf.text("$ " + String(this.format(element.cantidad * element.precioUnitario)), totales, top, "right");
            // pdf.text(500, top, "$ " + String(this.format(element.cantidad * element.precioUnitario - this.ordenCompra.boleta)));
            total += element.cantidad * element.precioUnitario;
        });
        top += 20;
        pdf.text(420, top, "Total Neto");
        pdf.text("$ " + String(this.format(total)), totales, top, "right");
        // pdf.text(500, top, "$ " + this.format(total - this.ordenCompra.boleta).toString());
        if (this.ordenCompra.boleta) {
            top += 20;
            pdf.text(420, top, "Boleta");
            pdf.text("$ " + String(this.format(this.ordenCompra.boleta)), totales, top, "right");
            // pdf.text(500, top, "$ " + this.format(this.ordenCompra.boleta).toString());
        }
        if (this.ordenCompra.iva) {
            top += 20;
            pdf.text(420, top, "IVA");
            pdf.text("$ " + String(this.format(this.ordenCompra.iva)), totales, top, "right");
            // pdf.text(500, top, "$ " + this.format(this.ordenCompra.iva).toString());
        } top += 20;
        pdf.text(420, top, "Total Bruto");
        pdf.text("$ " + String(this.format(total + this.ordenCompra.iva + this.ordenCompra.boleta)), totales, top, "right");
        // pdf.text(500, top, "$ " + String(this.format(total + this.ordenCompra.iva)));

        // Item --> Cuadro
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, 270, width - 60, 20 * (item + 4) + 45);
        // empty red square

        // Condicion de pago
        // Condicion de pago --> Caja
        top += 20;
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, top, width - 60, 45);

        // Condicion de pago --> Texto
        top += 15;
        pdf.text(55, top, "3.- CONDICIONES DE PAGO Y PLAZO");
        top += 15;
        if (this.ordenCompra.condicionPago)
            pdf.text(55, top, "- " + this.ordenCompra.condicionPago);



        // Despacho
        // Despacho --> Caja
        top += 35;
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, top, width - 60, 45);

        // Despacho --> Texto
        top += 15;
        pdf.text(55, top, "4.- DESPACHO (Dirección y Contacto)");
        top += 15;
        if (this.ordenCompra.despacho)
            pdf.text(55, top, "- " + this.ordenCompra.despacho);



        // Firmas
        top += 70;

        // Firma --> UsuarioActual
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, top, 180, 20);
        pdf.text("Solicitador", 30 + 180 / 2, top + 13, "center");

        // Firma --> Proveedor
        if (this.ordenCompra.proveedor.categoria == 3) {
            pdf.setDrawColor(128, 128, 128);
            pdf.rect(216, top, 180, 20);
            pdf.text("Firma", 215 + 90, top + 13, "center");
        }

        // Firma --> Aprobador
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(width - 210, top, 180, 20);
        pdf.text("Aprobador", width - 210 + 90, top + 13, "center");

        // Parte 2
        top += 20;
        // Firma --> UsuarioActual
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, top, 180, 20);
        pdf.text("Preparado por", 30 + 180 / 2, top + 13, "center");

        // Firma --> Proveedor
        if (this.ordenCompra.proveedor.categoria == 3) {
            pdf.setDrawColor(128, 128, 128);
            pdf.rect(216, top, 180, 20);
            pdf.text("Proveedor ", 215 + 90, top + 13, "center");
        }

        // Firma --> Aprobador
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(width - 210, top, 180, 20);
        pdf.text("Autorizado por", width - 210 + 90, top + 13, "center");

        // Firma Aprobador
        var img2 = new Image();
        img2.src = "assets/firmaJaime.png";
        // header
        pdf.addImage(img2, "png", width - 210 + 30, top - 80, 120, 180);
        let now = new Date()
        let fechaFirma = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes();
        pdf.text("Firmado: " + fechaFirma, width - 120, top + 30, "center");

        // Notas
        top += 60;
        pdf.setFontSize(8);
        pdf.text(30, top, "Nota 1.- Las facturas emitidas a Trazas Ltda. se deberan entregar en la oficina central o enviar por correo electronico a contabilidad@trazas.cl.");
        // top += 10;
        // pdf.text(30, top, "a 13:00 y 15:00 a 19:00 horas, solo los días viernes ");

        top += 20;
        pdf.text(30, top, "Nota 2.- Se informa que nuestra politica de calidad, medio ambiente, seguridad y salud laboral se encuentra a disposicion en pagina web www.trazas.cl");

        top += 20;
        pdf.text(30, top, "Nota 3.- Esta Orden de compra solo es valida con el correo que la respalda.");

        // console.log(this.ordenCompra);

        if (this.ordenCompra.proveedor.categoria == 2) {
            top += 20;
            pdf.text(30, top, "Nota 4.- Las empresas sub-contratista que ingresen a obras de Trazas Ltda., deben cumplir con lo estipulado ley 20.123 que regula el trabajo en régimen ");
            top += 10;
            pdf.text(30, top, "de Subcontratación, el funcionamiento de las Empresas de Servicios, y el contrato de trabajo de servicios transitorios, se agradece coordinar el proceso");
            top += 10;
            pdf.text(30, top, "con Sr. Rodrigo Méndez, email: rmendez@trazas.cl");
        }
        // top += 10;
        // pdf.text(30, top, "mutualidad con un minimo de 3 dias de anticipacion, o en su efecto comunicarse con Sr. Rodrigo Méndez, email: rmendez@trazas.cl");

        return pdf;

        // pdf.fromHTML(source, margins.left, margins.top, { 'width': width }, (dispose) => { pdf.save("asd.pdf") }, margins);
    }

    format(input) {
        var num: any = Math.round(input).toString().replace(/\./g, "");
        if (!isNaN(num)) {
            num = num.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num = num.split("").reverse().join("").replace(/^[\.]/, "");
            return num;
        }
    }

    cambiarTipo(tipoGasto) {
        this.ordenCompra.tipoGasto = tipoGasto;
    }

    cambiarSubTipo(e) {
        this.ordenCompra.subTipoGasto = e;
    }

    css() {
        return `<style>
    *{
      font-size: 12px;
      -webkit-print-color-adjust:exact;
    }
  
    .table td {
        line-height: 0.8; 
    }
    
    .table-bordered thead th,
    .table-bordered thead td {
        border-bottom-width: 1px;
    }
    
    .descrip {
        min-width: 45%;
    }
    
    .right {
        text-align: right;
    }
    
    .cuenta {
        margin-bottom: 1em;
    }
    
    thead {
        background-color: white;
        font-weight: bold;
        color: black;
    }
    
    .row {
        margin-bottom: 0.7rem;
    }
    
    .Folio {
        font-weight: 600;
    }
    
    .flex {
        display: flex;
        align-items: center;
    }
    
    .Fcenter {
        justify-content: center;
    }
    
    .Fcenter .btn {
        margin: 0px 4px;
    }
    
    .Proveedor {
        padding: 0.5em 2px;
    }

    .linea{
       border-bottom: 1px solid rgb(95, 95, 95);
    }

    .lineatop{
        border-top: 1px solid rgb(95, 95, 95);
    }
    
    .linealeft{
        border-left: 1px solid rgb(95, 95, 95);
    }
  
    .lineafull{
        border: 1px solid rgb(95, 95, 95);
    }

    .gray {
        background-color: #ababab;
    }
    
    .center {
        text-align: center;
    }

    .fs{
      font-size: 16px;
    }
    
    .TzS .row {
        margin-bottom: 3px;
    }
    
    .caja {
        margin-top: 1em;
        border: 1px solid gray;
        padding: 0.4em 0px;
    }
    
    .labelHeder {
        font-weight: 100;
        margin-bottom: 0px;
    }
    
    .bgWhite {
        background-color: white !important;
    }
    
    .bgWhite td {
        border: 1px solid white;
    }
    
    .brRigt {
        border-right: 1px solid rgb(232, 232, 232) !important;
    }
    
    .firmas {
        margin-top: 7em;
    }
    
    .Firma {
      list-style: none;
      padding-left: 0px;
    }
    
    .FloatRight {
        float: right;
    }
    
    .Firma li {
        border: 1px solid rgb(99, 99, 99);
        width: 300px;
    }

    .justificado{
      text-align: justify;
    }

    .bold {
      font-weight: bold !important;
    }

    .TzS .col-2{
      max-width: 12em;
    }
    
    .texto {
      margin-top: 3em;
    }
    
    .marginR{
      margin-right: 2em;
    }

    body{
      padding : 3em 5em;
    }
  </style>
    `;
    }
}
