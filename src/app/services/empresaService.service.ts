import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Empresa } from "../models/Empresa";

@Injectable()
export class empresaService{
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/empresa'
    }

    getEmpresa(): Observable<Empresa[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getEmpresaById(idEmpresa: number): Observable<Empresa> {
        return this._http.get(`${this.context}/id/${idEmpresa}`).map((res: Response) => res.json());
    }
}