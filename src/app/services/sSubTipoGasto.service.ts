import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { SubTipoGasto } from "../models/nestSubTipoGasto";

@Injectable()
export class subTipoGastoService {
    context: string
    constructor(private _http: Http) { this.context = environment.nest + 'v1/subTipoGasto' }

    init(): SubTipoGasto {
        return { nombreSubtipoGasto: null, colorFondo: null, colorLetras: null, isActive: true, fechaCreacion: new Date(), idSubTipoGasto: null, tipoGasto: 0 }
    }

    getSubTiposGastos(): Observable<SubTipoGasto[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getSubTiposGastosById(idSubTipoGasto: number): Observable<SubTipoGasto> {
        return this._http.get(`${this.context}/id/${idSubTipoGasto}`).map((res: Response) => res.json());
    }

    getSubTipoGastoByIdTipoGasto(idTipoGasto: number) {
        return this._http.get(`${this.context}/tipoGasto/${idTipoGasto}`).map((res: Response) => res.json());
    }
    
    addSubTiposGasto(subTipoGasto: SubTipoGasto): Observable<SubTipoGasto> {
        return this._http.post(`${this.context}/add`, subTipoGasto).map((res: Response) => res.json());
    }
    
    putSubTiposGasto(subTipoGasto: SubTipoGasto): Observable<SubTipoGasto> {
        return this._http.put(`${this.context}/update`, subTipoGasto).map((res: Response) => res.json());
    }

    delSubTiposGasto(idSubTipoGasto: number): Observable<SubTipoGasto> {
        return this._http.get(`${this.context}/delete/${idSubTipoGasto}`).map((res: Response) => res.json());
    }
}