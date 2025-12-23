import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
import { environment } from "../../environments/environment";

import { mProveedor } from '../models/mProveedor';
import { mReporteProveedor } from '../models/mReporteProveedor';

declare var jQuery: any;
declare var $: any;

@Injectable()

export class sProveedor {

    constructor(
        public _http: Http
    ) { }

    getProveedor(): Observable<any> {
        return this._http.get(environment.node + 'Proveedor').map((res: Response) => res.json());
    }

    getProveedorbyID(_id: string): Observable<any> {
        return this._http.get(environment.node + 'Proveedor/' + _id).map((res: Response) => res.json());
    }

    postProveedor(proveedor: mProveedor): any {
        return this._http.post(environment.node + 'Proveedor/', proveedor).map((res: Response) => res.json());
    }

    putProveedor(proveedor: mProveedor): any {
        return this._http.put(environment.node + 'Proveedor/' + proveedor._id, proveedor).map((res: Response) => res.json());
    }

    deleteProveedor(proveedor: mProveedor): any {
        return this._http.delete(environment.node + 'Proveedor/' + proveedor._id).map((res: Response) => res.json());
    }

    getReporteProveedor(agno: number): Observable<mReporteProveedor[]> {
        return this._http.get(environment.reporte + 'reporte/Proveedores/' + agno).map((res: Response) => res.json()).pipe(share())
    }

}
