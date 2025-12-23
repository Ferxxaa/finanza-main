import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";

import { mGastos } from '../models/mGastos';

declare var jQuery: any;
declare var $: any;

@Injectable()

export class sGastos {

    constructor(
        public _http: Http
    ) { }

    getGastos(): Observable<any> {
        return this._http.get(environment.node + 'TipoGasto').map((res: Response) => res.json());
    }

    fetchGastos(){
        return fetch(environment.node + 'TipoGasto').then(res=> res.json());
    }

    getGastosbyID(_id: string): Observable<any> {
        return this._http.get(environment.node + 'TipoGasto/' + _id).map((res: Response) => res.json());
    }

    postGastos(Gastos: mGastos): any {
        return this._http.post(environment.node + 'TipoGasto/', Gastos).map((res: Response) => res.json());
    }

    putGastos(Gastos: mGastos): any {
        return this._http.put(environment.node + 'TipoGasto/' + Gastos._id, Gastos).map((res: Response) => res.json());
    }

    deleteGastos(Gastos: mGastos): any {
        return this._http.delete(environment.node + 'TipoGasto/' + Gastos._id).map((res: Response) => res.json());
    }

}
