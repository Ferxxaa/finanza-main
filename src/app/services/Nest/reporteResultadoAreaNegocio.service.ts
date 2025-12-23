import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment"
import { ReportRentabilidadAreaNegocioByYear, ReportResultadoAreaNegocioByYear } from "../../models/nestResultadoAreaNegocio"

@Injectable()
export class ResultadoAreaNegocioService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/resultadoAreaNegocio'
    }

    getResultadoByAreaNegocio(idAreaNegocio: number): Observable<ReportResultadoAreaNegocioByYear[]> {
        return this._http.get(`${this.context}/resultados/${idAreaNegocio}`).map((res: Response) => res.json());
    }

    getRentabilidadByAreaNegocio(idAreaNegocio: number): Observable<ReportRentabilidadAreaNegocioByYear[]> {
        return this._http.get(`${this.context}/rentabilidad/${idAreaNegocio}`).map((res: Response) => res.json());
    }
}