import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Contrato, ContratoAdd } from "../../models/nestContrato";

@Injectable()
export class contratoService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/contrato'
    }

    init(): ContratoAdd {
        return { idContrato: null, nombreContrato: null, monto: null, isActive: true, fechaCreacion: new Date(), empresa: environment.empresa, centroCosto: null }
    }

    getContratos(): Observable<Contrato[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getContratoById(idContrato: number): Observable<Contrato> {
        return this._http.get(`${this.context}/id/${idContrato}`).map((res: Response) => res.json());
    }

    getContratoByIdCentroCosto(idCentroCosto: number): Observable<Contrato[]> {
        return this._http.get(`${this.context}/idCentroCosto/${idCentroCosto}`).map((res: Response) => res.json());
    }

    addContrato(contrato: ContratoAdd): Observable<Contrato> {
        return this._http.post(`${this.context}/add`, contrato).map((res: Response) => res.json());
    }
}