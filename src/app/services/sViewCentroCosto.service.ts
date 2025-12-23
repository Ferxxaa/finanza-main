import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Buscador } from "../models/buscadoEntity";
import { filterDetalleCentroCosto, viewDetalleCentroCosto } from "../models/detalleCentroCosto";
import { ViewCentroCosto } from "../models/nestViewCentroCosto";

@Injectable()
export class viewCentroCostoService {
    context: string
    constructor(private _http: Http) { this.context = environment.nest + 'v1/viewCentroCosto' }

    getViewCentroCosto(): Observable<ViewCentroCosto[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getViewCentroCostoByConfirmados(idCentroCosto: number): Observable<ViewCentroCosto[]> {
        return this._http.get(`${this.context}/centroCosto/confirmados/${idCentroCosto}`).map((res: Response) => res.json());
    }

    getViewCentroCostoByPendientes(idCentroCosto: number): Observable<ViewCentroCosto[]> {
        return this._http.get(`${this.context}/centroCosto/pendientes/${idCentroCosto}`).map((res: Response) => res.json());
    }

    getViewCentroCostoByConfirmadosFilter(idCentroCosto: number, buscador: Buscador): Observable<ViewCentroCosto[]> {
        return this._http.post(`${this.context}/centroCosto/confirmados/${idCentroCosto}`, buscador).map((res: Response) => res.json());
    }

    getViewCentroCostoByPendientesFilter(idCentroCosto: number, buscador: Buscador): Observable<ViewCentroCosto[]> {
        return this._http.post(`${this.context}/centroCosto/pendientes/${idCentroCosto}`, buscador).map((res: Response) => res.json());
    }

    getDetalleCentroCosto(idCentroCosto: number, filter: filterDetalleCentroCosto): Observable<viewDetalleCentroCosto> {
        return this._http.post(`${environment.nest}v1/detalleCentroCosto/detalle/${idCentroCosto}`, filter).map((res: Response) => res.json());
    }
}