import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../../environments/environment";
import { EstadoPago } from "../models/nestEstadoPago";

@Injectable()
export class estadoPagoService {

    context: string;

    constructor(public _http: Http) { this.context = environment.nest + 'v1/estadoPago' }

    updateEstadoPago(estadoPago: EstadoPago[]) {
        return this._http.put(`${this.context}/update`, estadoPago).map((res: Response) => res.json());
    }

    retNewEp(): EstadoPago {
        return {
            fechaPago: null,
            monto: null,
            metodoPago: null,
            numeroFactura: null,
            numeroPago: null,
            estado: 1,
            valorCuentaCorriente: null,
            cheque: false,
            idEstadoPago: null,
            isActive: true,
            fechaCreacion: new Date()
        }
    }
}