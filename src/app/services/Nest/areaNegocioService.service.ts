import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AreaNegocio } from "../../models/nestAreaNegocio";

@Injectable()
export class areaNegocioService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/areaNegocio'
    }

    init(): AreaNegocio {
        return { idAreaNegocio: null, nombreAreaNegocio: null, isActive: true, fechaCreacion: new Date() }
    }

    getAreasNegocio(): Observable<AreaNegocio[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getAreaNegocioById(idAreaNegocio: number): Observable<AreaNegocio> {
        return this._http.get(`${this.context}/id/${idAreaNegocio}`).map((res: Response) => res.json());
    }

    addAreaNegocio(areaNegocio: AreaNegocio): Observable<AreaNegocio> {
        return this._http.post(`${this.context}/add`, areaNegocio).map((res: Response) => res.json());
    }
}