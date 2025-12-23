import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment"

import { mCuentas } from '../models/mCuentas';

declare var jQuery: any;
declare var $: any;

@Injectable()

export class sCuentas {

    constructor(
        public _http: Http
    ) { }

    getCuentas(): Observable<any> {
        return this._http.get(environment.node + 'Cuentas').map((res: Response) => res.json());
    }

    getCuentasbyID(_id: number): Observable<any> {
        return this._http.get(environment.node + 'Cuentas/' + _id).map((res: Response) => res.json());
    }

    postCuentas(Cuentas: mCuentas): any {
        return this._http.post(environment.node + 'Cuentas/', Cuentas).map((res: Response) => res.json());
    }

    putCuentas(Cuentas: mCuentas): any {
        return this._http.put(environment.node + 'Cuentas/' + Cuentas._id, Cuentas).map((res: Response) => res.json());
    }

    deleteCuentas(Cuentas: mCuentas): any {
        return this._http.delete(environment.node + 'Cuentas/' + Cuentas._id).map((res: Response) => res.json());
    }

}
