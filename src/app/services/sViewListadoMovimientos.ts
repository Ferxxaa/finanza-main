import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Buscador } from "../models/buscadoEntity";
import { Movimiento } from "../models/movimiento";
import { ViewListadoMovimiento } from "../models/nestViewListadoMovimientos";

@Injectable()
export class sViewListadoMovimientosService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/viewListaMovimientos'
    }

    getViewListadoMovimientos(): Observable<ViewListadoMovimiento[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getViewListadoMovimientosFilter(buscador: Buscador): Observable<ViewListadoMovimiento[]> {
        return this._http.post(`${this.context}/all`, buscador).map((res: Response) => res.json());
    }

    updateMovimientoMail(idMovimiento:number): Observable<Movimiento> {
        return this._http.put(`${environment.nest}v1/movimiento/mailEnviado/${idMovimiento}`, idMovimiento).map((res: Response) => res.json());
    }
}