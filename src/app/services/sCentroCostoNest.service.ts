import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { CentroCosto, CentroCostoAdd } from "../models/nestCentroCosto";

@Injectable()
export class centroCostoService {
    context: string
    constructor(private _http: Http) { this.context = environment.nest + 'v1/centroCosto' }

    init(): CentroCostoAdd {
        return { idCentroCosto: null, nombreCentroCosto: null, montoProgramado: null, fondo: '#ffffff', letras: "#000000", responsable: null, isActive: true, fechaCreacion: new Date(), areaNegocio: 0 }
    }

    getCentroCosto(): Observable<CentroCosto[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getCentroCostoWithParent(): Observable<CentroCosto[]> {
        return this._http.get(`${this.context}/allParent`).map((res: Response) => res.json());
    }

    getCentroCostoWithParentFull(): Observable<CentroCosto[]> {
        return this._http.get(`${this.context}/allParentFull`).map((res: Response) => res.json());
    }

    getCentroCostoById(idCentroCosto: number): Observable<CentroCosto> {
        return this._http.get(`${this.context}/id/${idCentroCosto}`).map((res: Response) => res.json());
    }

    getCentroCostoByIdAreaNegocio(idAreaNegocio: number): Observable<CentroCosto[]> {
        return this._http.get(`${this.context}/areaNegocio/${idAreaNegocio}`).map((res: Response) => res.json());
    }

    addCentroCosto(centroCosto: CentroCostoAdd): Observable<CentroCosto[]> {
        return this._http.post(`${this.context}/add`, centroCosto).map((res: Response) => res.json());
    }

    updateCentroCosto(centroCosto: CentroCosto): Observable<CentroCosto[]> {
        return this._http.put(`${this.context}/update`, centroCosto).map((res: Response) => res.json());
    }

}