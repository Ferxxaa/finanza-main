import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Movimiento, MovimientoAdd, MovimientoRelationShip } from "../models/movimiento";
import { OrdenCompra } from "../models/nestOrdenCompra";

declare var jsPDF: any;

@Injectable()
export class sMovimientoService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/movimiento'
    }

    init(): MovimientoAdd {
        return { idMovimiento: null, folio: null, metodoPago: null, descripcion: null, despacho: null, prioridad: null, tipo: null, categoria: null, idCreador: JSON.parse(localStorage.usuario).idUsuario, idAprobador: null, idSolicitador: null, estado: 2, correo: false, padre: null, condicionPago: null, motivoRechazo: null, isActive: true, fechaCreacion: new Date(), empresa: environment.empresa }
    }

    getMovimientos(): Observable<Movimiento[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getMovimientosWithRelationShip(): Observable<MovimientoRelationShip[]> {
        return this._http.get(`${this.context}/allRelationShip`).map((res: Response) => res.json());
    }

    getPorAprobar(): Observable<MovimientoRelationShip[]> {
        return this._http.get(`${this.context}/aprobar`).map((res: Response) => res.json());
    }

    getRechazadas(): Observable<MovimientoRelationShip[]> {
        return this._http.get(`${this.context}/rechazados`).map((res: Response) => res.json());
    }

    getMovimientoById(idMovimiento: number): Observable<MovimientoRelationShip> {
        return this._http.get(`${this.context}/id/${idMovimiento}`).map((res: Response) => res.json());
    }

    getIngresosByCentroCosto(idCentroCosto: number): Observable<MovimientoRelationShip[]> {
        return this._http.get(`${this.context}/ingresosContratos/${idCentroCosto}`).map((res: Response) => res.json());
    }

    getMovbimientoByRutProveedor(rutProveedor: string): Observable<Movimiento[]> {
        return this._http.get(`${this.context}/evaluacion/proveedor/${rutProveedor}`).map((res: Response) => res.json());
    }

    addOrdenCompra(ordenCompra: any) {
        return this._http.post(`${this.context}/ordenCompra`, ordenCompra).map((res: Response) => res.json());
    }

    putOrdenCompra(ordenCompra: any) {
        return this._http.put(`${this.context}/ordenCompra`, ordenCompra).map((res: Response) => res.json());
    }

    addOrdenPedido(ordenPedido: OrdenCompra) {
        return this._http.post(`${this.context}/ordenPedido`, ordenPedido).map((res: Response) => res.json());
    }

    addIngresoContrato(ingreso: MovimientoAdd) {
        return this._http.post(`${this.context}/addIngreso`, ingreso).map((res: Response) => res.json());
    }

    addMovimiento(movimiento: MovimientoAdd) {
        return this._http.post(`${this.context}/movimiento`, movimiento).map((res: Response) => res.json());
    }

    updateMovimiento(movimiento: MovimientoRelationShip | Movimiento) {
        return this._http.put(`${this.context}/update`, movimiento).map((res: Response) => res.json());
    }

    updateOC(movimiento: MovimientoRelationShip | Movimiento) {
        return this._http.put(`${this.context}/updateOC`, movimiento).map((res: Response) => res.json());
    }

    editOC(movimiento: OrdenCompra) {
        return this._http.put(`${this.context}/editOC`, movimiento).map((res: Response) => res.json());
    }

    aprobarMovimiento(movimiento: MovimientoRelationShip | Movimiento) {
        return this._http.put(`${this.context}/aprobar`, movimiento).map((res: Response) => res.json());
    }

    rechazarMovimiento(movimiento: MovimientoRelationShip | Movimiento) {
        return this._http.put(`${this.context}/rechazar`, movimiento).map((res: Response) => res.json());
    }

    anularMovimiento(movimiento: MovimientoRelationShip | Movimiento) {
        return this._http.put(`${this.context}/anular`, movimiento).map((res: Response) => res.json());
    }

    addDayToCentroCosto(daysAdd: number, idCentroCosto: number) {
        return this._http.put(`${this.context}/addDay/${daysAdd}`, { idCentroCosto: idCentroCosto }).map((res: Response) => res.json());
    }

    RetPDF(movimiento: MovimientoRelationShip) {
        // console.log("Orden de compra:", ordenCompra.folio);
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

        pdf.text("ORDEN DE COMPRA", width / 2, 140, "center");
        pdf.text("N° " + movimiento.folio, width - 30, 140, "right");

        // Proveedor
        pdf.setFontSize(10);
        // Proveedor --> Cabeceras
        pdf.text(30, 160, "Señor (es)");
        pdf.text(width - 170, 160, "Fecha");
        pdf.text(30, 175, "Dirección");
        pdf.text(30, 190, "RUT");
        pdf.text(30, 205, "Teléfono");
        pdf.text(30, 220, "Contacto");
        // Proveedor --> Datos
        pdf.text(140, 160, movimiento.proveedor.nombre);
        let fecha = movimiento.fechaCreacion.toString().split("T")[0];
        pdf.text(fecha.split("-")[2] + "/" + fecha.split("-")[1] + "/" + fecha.split("-")[0], width - 30, 160, "right");
        pdf.text(140, 175, movimiento.proveedor.direccion ? movimiento.proveedor.direccion : " ");
        pdf.text(140, 190, movimiento.proveedor.rutProveedor);
        pdf.text(140, 205, movimiento.proveedor.telefono ? movimiento.proveedor.telefono : " ");
        pdf.text(140, 220, movimiento.proveedor.contacto);
        pdf.text("Email  " + movimiento.proveedor.mail, width - 30, 220, "right");

        // Centro costo
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, 240, width - 60, 25);
        // empty red square
        // Centro Costo --> Datos
        pdf.text(55, 255, "1.- CENTRO DE COSTO");
        pdf.text(width / 2, 255, "- " + movimiento.centroCosto.nombreCentroCosto);

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

        movimiento.item.forEach((element) => {
            top += 20;
            item += 1;
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
            if (element.tipoDeclaracion == environment.declaracion.boleta)
                pdf.text("$ " + String(this.format(element.cantidad * element.precioUnitario - element.declaracion)), totales, top, "right");
            else
                pdf.text("$ " + String(this.format(element.cantidad * element.precioUnitario)), totales, top, "right");
            total += element.cantidad * element.precioUnitario;
        });
        top += 20;
        pdf.text(420, top, "Total Neto");
        let totalBoleta: number = movimiento.item.filter(el => el.tipoDeclaracion == environment.declaracion.boleta).reduce((acc, el) => acc + el.declaracion, 0)
        let totalIVA: number = movimiento.item.filter(el => el.tipoDeclaracion == environment.declaracion.afecto).reduce((acc, el) => acc + el.declaracion, 0)
        pdf.text("$ " + String(this.format(total - totalBoleta)), totales, top, "right");
        if (totalBoleta > 0) {
            top += 20;
            pdf.text(420, top, "Boleta");
            pdf.text("$ " + String(this.format(totalBoleta)), totales, top, "right");
        }
        if (totalIVA > 0) {
            top += 20;
            pdf.text(420, top, "IVA");
            pdf.text("$ " + String(this.format(totalIVA)), totales, top, "right");
        } top += 20;
        pdf.text(420, top, "Total Bruto");
        pdf.text("$ " + String(this.format(total + totalIVA)), totales, top, "right");

        // Item --> Cuadro
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, 270, width - 60, 20 * (item + 4) + 45);
        // empty red square

        // Condicion de pago
        // Condicion de pago --> Caja
        top += 20;
        top += 20;
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, top, width - 60, 45);

        // Condicion de pago --> Texto
        top += 15;
        pdf.text(55, top, "3.- CONDICIONES DE PAGO Y PLAZO");
        top += 15;
        if (movimiento.condicionPago)
            pdf.text(55, top, "- " + movimiento.condicionPago);



        // Despacho
        // Despacho --> Caja
        top += 35;
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, top, width - 60, 45);

        // Despacho --> Texto
        top += 15;
        pdf.text(55, top, "4.- DESPACHO (Dirección y Contacto)");
        top += 15;
        if (movimiento.despacho)
            pdf.text(55, top, "- " + movimiento.despacho);



        // Firmas
        top += 70;

        // Firma --> UsuarioActual
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, top, 180, 20);
        pdf.text("Solicitador", 30 + 180 / 2, top + 13, "center");

        // Firma --> Proveedor
        if (movimiento.categoria == 3) {
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
        if (movimiento.categoria == 3) {
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

        // Notas
        top += 60;
        pdf.setFontSize(8);
        pdf.text(30, top, "Nota 1.- Las facturas emitidas a Trazas Ltda. se deberan entregar en la oficina central o enviar por correo electronico a contabilidad@trazas.cl.");
        top += 20;
        pdf.text(30, top, "Nota 2.- Se informa que nuestra politica de calidad, medio ambiente, seguridad y salud laboral se encuentra a disposicion en pagina web www.trazas.cl");
        top += 20;
        pdf.text(30, top, "Nota 3.- Esta Orden de compra solo es valida con el correo que la respalda.");
        if (movimiento.categoria == 2) {
            top += 20;
            pdf.text(30, top, "Nota 4.- Las empresas sub-contratista que ingresen a obras de Trazas Ltda., deben cumplir con lo estipulado ley 20.123 que regula el trabajo en régimen ");
            top += 10;
            pdf.text(30, top, "de Subcontratación, el funcionamiento de las Empresas de Servicios, y el contrato de trabajo de servicios transitorios, se agradece coordinar el proceso");
            top += 10;
            pdf.text(30, top, "con Sr. Rodrigo Méndez, email: rmendez@trazas.cl");
        }
        return pdf;
    }

    private format(input) {
        var num: any = Math.round(input).toString().replace(/\./g, "");
        if (!isNaN(num)) {
            num = num.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num = num.split("").reverse().join("").replace(/^[\.]/, "");
            return num;
        }
    }
}