import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from "../../environments/environment"

declare var jQuery: any;
declare var $: any;

@Injectable()

export class sCorreo {

    constructor(
        public _http: Http
    ) { }

    postCuentas(Correo: any): any {
        return this._http.post(environment.node + 'correo/', Correo).map((res: Response) => res.json());
    }

    postCorreoAttach(Correo: any): any {
        return this._http.post(environment.node + 'correoAttach/', Correo).map((res: Response) => res.json());
    }

}
