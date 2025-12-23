import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs'

@Injectable()
export class ReporteCentroCostoService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/reporteCentroCosto'
    }

    getReporteCentroCostoConsolidado(): Observable<any[]> {
        return this._http.get(`${this.context}/`).map((res: Response) => res.json());
    }

    getReporteTipoGasto(idCentroCosto: number) {
        return this._http.get(`${this.context}/detalle/${idCentroCosto}`).map((res: Response) => res.json());
    }

}