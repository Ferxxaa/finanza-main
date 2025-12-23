import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";

import { estadoPago, mOrdenCompra } from '../models/mOrdenCompra';

declare var jsPDF: any;

@Injectable()

export class sOrdenComra {

    constructor(
        public _http: Http
    ) { }

    getOrdenCompra(): Observable<any> {
        return this._http.get(environment.node + 'ordenCompra').map((res: Response) => res.json());
    }

    getOrdenComprabyID(_id: string): Observable<any> {
        return this._http.get(environment.node + 'ordenCompra/' + _id).map((res: Response) => res.json());
    }

    getOrdenComprabyEstado(estado: number): Observable<any> {
        return this._http.get(environment.node + 'ordenCompra/estado/' + estado).map((res: Response) => res.json());
    }

    getOrdenComprabyProveedor(idProveedor: string): Observable<any> {
        return this._http.get(environment.node + 'ordenCompra/proveedor/' + idProveedor).map((res: Response) => res.json());
    }

    fetchOrdenComprabyEstado(estado: number) {
        return fetch(environment.node + 'ordenCompra/estado/' + estado).then(res => res.json());
    }

    getOrdenComprabyCentroCosto(centroCosto: String): Observable<any> {
        return this._http.get(environment.node + 'ordenCompra/centroCosto/' + centroCosto).map((res: Response) => res.json());
    }

    getCuentaCorriente(): Observable<any> {
        return this._http.get(environment.node + 'cuentaCorriente').map((res: Response) => res.json());
    }

    getCuentaCorrienteSplit(): Observable<any> {
        return this._http.get(environment.node + 'cuentaCorrienteSplit').map((res: Response) => res.json());
    }

    getVentas(): Observable<any> {
        return this._http.get(environment.node + 'ventas').map((res: Response) => res.json());
    }

    getOrdenComprabySolicitante(solicitante: string): Observable<any> {
        return this._http.get(environment.node + 'ordenCompra/solicitante/' + solicitante).map((res: Response) => res.json());
    }

    getOrdenCompraAnulable(id: string): Observable<any> {
        return this._http.get(environment.node + 'ordenCompra/anulable/' + id).map((res: Response) => res.json());
    }

    postOrdenCompra(ordenCompra: mOrdenCompra): any {
        return this._http.post(environment.node + 'ordenCompra/', ordenCompra).map((res: Response) => res.json());
    }

    putOrdenCompra(ordenCompra: mOrdenCompra): any {
        return this._http.put(environment.node + 'ordenCompra/' + ordenCompra._id, ordenCompra).map((res: Response) => res.json());
    }

    deleteOrdenCompra(ordenCompra: mOrdenCompra): any {
        return this._http.delete(environment.node + 'ordenCompra/' + ordenCompra._id).map((res: Response) => res.json());
    }

    retMontoNeto(ordenes: mOrdenCompra[]): number {
        return ordenes.reduce((acc, el) => acc + this.retMontoNetoEP(el.estadosPagos), 0)
    }

    retMontoNetoSinConfirmar(ordenes: mOrdenCompra[]): number {
        return ordenes.reduce((acc, el) => acc + this.retMontoNetoEPSinConfirmar(el.estadosPagos), 0)
    }

    retMontoNetoEP(estadoPago: estadoPago[]): number {
        return estadoPago.reduce((acc, el) => acc + (el.estado == 4 ? el.monto : 0), 0)
    }

    private retMontoNetoEPSinConfirmar(estadoPago: estadoPago[]): number {
        return estadoPago.reduce((acc, el) => acc + el.monto, 0)
    }

    retTotalIva(ordenes: mOrdenCompra[]): number {
        return ordenes.reduce((acc, el) => acc + this.retIva(el), 0)
    }

    retIva(orden: mOrdenCompra): number {
        return orden.Items.reduce((acc, el) => acc + el.iva == 2 ? (el.precioUnitario * el.cantidad * .19) : 0 + el.iva == 3 ? (el.precioUnitario * el.cantidad * .1075) : 0, 0)
    }

    retEvaluacion(orden) {
        console.log(orden);
        return orden;
    }

    retTotalCuentaCorriente(cuentaCorriente: any[]) {
        return Math.ceil(cuentaCorriente.reduce((acc, el) => acc + el.costo, 0))
    }

    RetPDF(ordenCompra: mOrdenCompra) {
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
        pdf.text("N° " + ordenCompra.folio, width - 30, 140, "right");



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
        pdf.text(140, 160, ordenCompra.proveedor.nombre);
        let fecha = ordenCompra.fechaCreacion.toString().split("T")[0];
        // console.log(fecha.split("-")[2]+"/"+ fecha.split("-")[1] +"/"+ fecha.split("-")[0]);
        // console.log(fecha.getDate()+"/"+ fecha.getMonth()+1 +"/"+ fecha.getFullYear());
        pdf.text(fecha.split("-")[2] + "/" + fecha.split("-")[1] + "/" + fecha.split("-")[0], width - 30, 160, "right");
        pdf.text(140, 175, ordenCompra.proveedor.direccion ? ordenCompra.proveedor.direccion : " ");
        pdf.text(140, 190, ordenCompra.proveedor.rutProveedor);
        pdf.text(140, 205, ordenCompra.proveedor.telefono ? ordenCompra.proveedor.telefono : " ");
        pdf.text(140, 220, ordenCompra.proveedor.contacto);
        pdf.text("Email  " + ordenCompra.proveedor.mail, width - 30, 220, "right");

        // Centro costo
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, 240, width - 60, 25);
        // empty red square
        // Centro Costo --> Datos
        pdf.text(55, 255, "1.- CENTRO DE COSTO");
        pdf.text(width / 2, 255, "- " + ordenCompra.subCentroCosto);

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

        ordenCompra.Items.forEach((element) => {
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
            pdf.text("$ " + String(this.format(element.cantidad * element.precioUnitario - ordenCompra.boleta)), totales, top, "right");
            // pdf.text(500, top, "$ " + String(this.format(element.cantidad * element.precioUnitario - this.ordenCompra.boleta)));
            total += element.cantidad * element.precioUnitario;
        });
        top += 20;
        pdf.text(420, top, "Total Neto");
        pdf.text("$ " + String(this.format(total - ordenCompra.boleta)), totales, top, "right");
        // pdf.text(500, top, "$ " + this.format(total - ordenCompra.boleta).toString());
        if (ordenCompra.boleta) {
            top += 20;
            pdf.text(420, top, "Boleta");
            pdf.text("$ " + String(this.format(ordenCompra.boleta)), totales, top, "right");
            // pdf.text(500, top, "$ " + this.format(ordenCompra.boleta).toString());
        }
        if (ordenCompra.iva) {
            top += 20;
            pdf.text(420, top, "IVA");
            pdf.text("$ " + String(this.format(ordenCompra.iva)), totales, top, "right");
            // pdf.text(500, top, "$ " + this.format(ordenCompra.iva).toString());
        } top += 20;
        pdf.text(420, top, "Total Bruto");
        pdf.text("$ " + String(this.format(total + ordenCompra.iva)), totales, top, "right");
        // pdf.text(500, top, "$ " + String(this.format(total + ordenCompra.iva)));

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
        if (ordenCompra.condicionPago)
            pdf.text(55, top, "- " + ordenCompra.condicionPago);



        // Despacho
        // Despacho --> Caja
        top += 35;
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, top, width - 60, 45);

        // Despacho --> Texto
        top += 15;
        pdf.text(55, top, "4.- DESPACHO (Dirección y Contacto)");
        top += 15;
        if (ordenCompra.despacho)
            pdf.text(55, top, "- " + ordenCompra.despacho);



        // Firmas
        top += 70;

        // Firma --> UsuarioActual
        pdf.setDrawColor(128, 128, 128);
        pdf.rect(30, top, 180, 20);
        pdf.text("Solicitador", 30 + 180 / 2, top + 13, "center");

        // Firma --> Proveedor
        if (ordenCompra.proveedor.categoria == 3) {
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
        if (ordenCompra.proveedor.categoria == 3) {
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
        // top += 10;
        // pdf.text(30, top, "a 13:00 y 15:00 a 19:00 horas, solo los días viernes ");

        top += 20;
        pdf.text(30, top, "Nota 2.- Se informa que nuestra politica de calidad, medio ambiente, seguridad y salud laboral se encuentra a disposicion en pagina web www.trazas.cl");

        top += 20;
        pdf.text(30, top, "Nota 3.- Esta Orden de compra solo es valida con el correo que la respalda.");

        // console.log(ordenCompra);

        if (ordenCompra.proveedor.categoria == 2) {
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

    private format(input) {
        var num: any = Math.round(input).toString().replace(/\./g, "");
        if (!isNaN(num)) {
            num = num.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num = num.split("").reverse().join("").replace(/^[\.]/, "");
            return num;
        }
    }

}
