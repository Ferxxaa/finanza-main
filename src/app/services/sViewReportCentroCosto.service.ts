import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import { reportCentroCostoInterface } from "../models/nestReportCentroCostoInterface"

@Injectable()
export class viewReportCentroCostoService {
    context: string
    constructor(private _http: Http) { this.context = environment.nest + 'v1/viewReportCentroCosto/centroCosto' }

    getViewReportCentroCostoTipoGasto(idCentroCosto: number): Observable<reportCentroCostoInterface[]> {
        return this._http.get(`${this.context}/tipoGasto/${idCentroCosto}`).map((res: Response) => res.json());
    }

    getViewReportCentroCostoSubTipoGasto(idCentroCosto: number): Observable<reportCentroCostoInterface[]> {
        return this._http.get(`${this.context}/subTipoGasto/${idCentroCosto}`).map((res: Response) => res.json());
    }
}