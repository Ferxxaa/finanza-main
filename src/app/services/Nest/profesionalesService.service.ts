import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Profesional, profesionalDTO } from "../../models/nestProfesional";

@Injectable()
export class profesionalService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/profesional'
    }

    getProfesionales(): Observable<Profesional[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getProfesionalById(idProfesional: number): Observable<Profesional> {
        return this._http.get(`${this.context}/id/${idProfesional}`).map((res: Response) => res.json());
    }

    getResumenProfesional(): Observable<profesionalDTO[]> {
        return this._http.get(`${this.context}/resumen`).map((res: Response) => res.json());
    }

    addProfesional(profesional: Profesional) {
        return this._http.post(`${this.context}/add`, profesional).map((res: Response) => res.json());
    }

    deleteProfesional(profesional: profesionalDTO) {
        return this._http.put(`${this.context}/delete`, profesional).map((res: Response) => res.json());
    }
}