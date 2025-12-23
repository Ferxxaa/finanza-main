import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AreaNegocio } from "../../models/nestAreaNegocio";
import { Garantia, GarantiaAdd } from "../../models/nestGarantia";

@Injectable()
export class garantiaService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/garantia'
    }

    init(): GarantiaAdd {
        return { NumeroDocumento: null, TipoDoc: '0', Monto: 0, descripcion: null, proveedor: '0', cliente: '0', vencimiento: null, estado: 1, banco: '0', isActive: true, fechaCreacion: new Date() }
    }

    getGarantia(): Observable<Garantia[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getGarantiaById(idGarantia: number): Observable<Garantia> {
        return this._http.get(`${this.context}/id/${idGarantia}`).map((res: Response) => res.json());
    }

    getGarantiaByIdCentroCosto(idCentroCosto: number): Observable<Garantia[]> {
        return this._http.get(`${this.context}/centroCosto/${idCentroCosto}`).map((res: Response) => res.json());
    }

    addGarantia(garantia: GarantiaAdd): Observable<AreaNegocio> {
        return this._http.post(`${this.context}/add`, garantia).map((res: Response) => res.json());
    }

    putGarantia(garantia: Garantia): Observable<AreaNegocio> {
        return this._http.put(`${this.context}/put`, garantia).map((res: Response) => res.json());
    }
}