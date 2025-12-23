import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Cotizacion } from "../models/nestCotizacion";

@Injectable()
export class cotizacionService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/cotizacion'
    }

    init(): Cotizacion{
        return { idCotizacion: null, prioridad: 0, nombreAdjunto: null, observacion: null, estado: 1, solicitador: 1, isActive: true, fechaCreacion: new Date(), empresa: environment.empresa, areaNegocio: 0, centroCosto: 0 };
    }

    getCotizaciones(): Observable<Cotizacion[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getCotizacionById(idCotizacion: number): Observable<Cotizacion> {
        return this._http.get(`${this.context}/id/${idCotizacion}`).map((res: Response) => res.json());
    }

    getMisCotizaciones(idSolicitador: number): Observable<Cotizacion[]> {
        return this._http.get(`${this.context}/solicitador/${idSolicitador}`).map((res: Response) => res.json());
    }

    getCotizacionesPendientes(): Observable<Cotizacion[]> {
        return this._http.get(`${this.context}/pendientes`).map((res: Response) => res.json());
    }

    addCotizacion(cotizacion: Cotizacion): Observable<Cotizacion> {
        return this._http.post(`${this.context}/add`, cotizacion).map((res: Response) => res.json());
    }

    updateCotizacion(cotizacion: Cotizacion): Observable<Cotizacion> {
        return this._http.put(`${this.context}/update`, cotizacion).map((res: Response) => res.json());
    }

    deleteCotizacion(idSolicitador: number): Observable<boolean> {
        return this._http.delete(`${this.context}/id/${idSolicitador}`).map((res: Response) => res.json());
    }
}