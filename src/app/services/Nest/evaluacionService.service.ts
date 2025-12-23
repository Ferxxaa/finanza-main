import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Evaluacion, EvaluacionAdd } from "../../models/nestEvaluacion";

@Injectable()
export class evaluacionService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/evaluacion'
    }

    getEvaluacion(): Observable<Evaluacion[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getEvaluacionByIdMovimiento(idMovimiento: number): Observable<Evaluacion> {
        return this._http.get(`${this.context}/movimiento/${idMovimiento}`).map((res: Response) => res ? res.json() : null);
    }


    addEvaluacion(evaluacion: EvaluacionAdd): Observable<Evaluacion> {
        return this._http.post(`${this.context}/add`, evaluacion).map((res: Response) => res.json());
    }

    addEvaluacionMasiva(evaluacion: EvaluacionAdd[]): Observable<Evaluacion> {
        return this._http.post(`${this.context}/masive/add`, evaluacion).map((res: Response) => res.json());
    }
}