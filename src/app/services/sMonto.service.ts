import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";

import { mMonto } from '../models/mMonto';

declare var jQuery: any;
declare var $: any;

@Injectable()

export class sMonto {

    private sobregiro: number;

    constructor(
        public _http: Http
    ) {
        this.sobregiro = 0;
        this.getMonto().subscribe(monto => {
            if (monto.length > 0)
                this.sobregiro = monto[0].sobregiro
        });
    }

    getMonto(): Observable<mMonto[]> {
        return this._http.get(environment.node + 'Monto').map((res: Response) => res.json());
    }

    postMonto(Monto: mMonto): any {
        return this._http.post(environment.node + 'Monto/', Monto).map((res: Response) => res.json());
    }

    putMonto(Monto: mMonto): any {
        return this._http.put(environment.node + 'Monto/' + Monto._id, Monto).map((res: Response) => res.json());
    }

    deleteMonto(Monto: mMonto): any {
        return this._http.delete(environment.node + 'Monto/' + Monto._id).map((res: Response) => res.json());
    }

    getSobregiro() {
        if (this.sobregiro)
            return this.sobregiro;
        else
            return 0;
    }

}
