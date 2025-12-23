import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { TipoGasto } from "../models/nestTipoGasto";

@Injectable()
export class tipoGastoService {
    context: string
    constructor(private _http: Http) { this.context = environment.nest + 'v1/tipogasto' }

    init(): TipoGasto {
        return { idTipoGasto: null, nombreTipoGasto: null, isActive: true, fechaCreacion: new Date() }
    }

    getTiposGastos(): Observable<TipoGasto[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getTiposGastosWithChild(): Observable<TipoGasto[]> {
        return this._http.get(`${this.context}/allfull`).map((res: Response) => res.json());
    }

    getTiposGastosById(idTipoGasto: number): Observable<TipoGasto> {
        return this._http.get(`${this.context}/id/${idTipoGasto}`).map((res: Response) => res.json());
    }

    addTiposGasto(tipoGasto: TipoGasto): Observable<TipoGasto> {
        return this._http.post(`${this.context}/add`, tipoGasto).map((res: Response) => res.json());
    }

    putTiposGasto(tipoGasto: TipoGasto): Observable<TipoGasto> {
        return this._http.put(`${this.context}/update`, tipoGasto).map((res: Response) => res.json());
    }

    delTiposGasto(idTipoGasto: number): Observable<TipoGasto> {
        return this._http.get(`${this.context}/delete/${idTipoGasto}`).map((res: Response) => res.json());
    }
}