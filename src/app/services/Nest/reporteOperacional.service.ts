import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { operacionalYears, tablaReporteOperacional } from "../../models/nestReporteOperacional";
import { ReporteVentas } from "../../models/nestReportVentas";

@Injectable()
export class reporteOperacionalService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/reporteOperacional'
    }

    // getProveedoresYears(): Observable<EvalProveedoresYear[]> {
    //     return this._http.get(`${this.context}/reportYears`).map((res: Response) => res.json());
    // }

    getYears(): Observable<number[]> {
        return this._http.get(`${this.context}/years`).map((res: Response) => res.json());
    }

    getReportByYear(year: number): Observable<tablaReporteOperacional[]> {
        return this._http.get(`${this.context}/year/${year}`).map((res: Response) => res.json());
    }

    getReportByFiveYear(year: number = new Date().getFullYear()): Observable<operacionalYears[]> {
        return this._http.get(`${this.context}/fiveyears/${year}`).map((res: Response) => res.json());
    }

    // getDetalleProveedor(idProveedor: number, year: number): Observable<ReportEvalProv[]> {
    //     return this._http.get(`${this.context}/proveedor/${idProveedor}/${year}`).map((res: Response) => res.json());
    // }


}