import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { CajaChica, CajaChicaGet } from "../../models/nestCajaChica";

@Injectable()
export class cajaChicaService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/cajaChica'
    }

    getCajaChica(): Observable<CajaChica[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    aprobarCajaChica(cajaChica: CajaChica): Observable<CajaChica> {
        return this._http.put(`${this.context}/aprobar`, cajaChica).map((res: Response) => res.json());
    }

    anularCajaChica(cajaChica: CajaChica): Observable<CajaChica> {
        return this._http.put(`${this.context}/anula`, cajaChica).map((res: Response) => res.json());
    }

    addCajaChica(cajaChica: CajaChica): Observable<CajaChicaGet> {
        return this._http.post(`${this.context}/add`, cajaChica).map((res: Response) => res.json());
    }
}