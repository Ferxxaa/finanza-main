import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment"

// import { mCuentas } from '../models/mCuentas';

declare var jQuery: any;
declare var $: any;

@Injectable()

export class sMandante {

    constructor(
        public _http: Http
    ) { }

    getMandantes(): Observable<any> {
        return this._http.get(environment.url + 'Mandante').map((res: Response) => res.json());
    }

    getMandantebyID(_id: number): Observable<any> {
        return this._http.get(environment.url + 'Mandante/' + _id).map((res: Response) => res.json());
    }

}
