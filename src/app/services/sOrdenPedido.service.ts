import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";

import { mOrdenPedido } from '../models/mOrdenPedido';

declare var jQuery: any;
declare var $: any;

@Injectable()

export class sOrdenPedido {

    constructor(
        public _http: Http
    ) { }

    getOrdenPedido(): Observable<any> {
        return this._http.get(environment.node + 'ordenPedido').map((res: Response) => res.json());
    }

    getOrdenPedidobyID(_id: string): Observable<any> {
        return this._http.get(environment.node + 'ordenPedido/' + _id).map((res: Response) => res.json());
    }

    getOrdenPedidobyOrdenCompra(idOrdenCompra: string): Observable<any> {
        return this._http.get(environment.node + 'ordenPedido/OC/' + idOrdenCompra).map((res: Response) => res.json());
    }
    
    getOrdenPedidobyCentroCosto(centroCosto: string): Observable<any> {
        return this._http.get(environment.node + 'ordenPedido/CentroCosto/' + centroCosto).map((res: Response) => res.json());
    }

    postOrdenPedido(ordenPedido: mOrdenPedido): any {
        return this._http.post(environment.node + 'ordenPedido/', ordenPedido).map((res: Response) => res.json());
    }

    putOrdenPedido(ordenPedido: mOrdenPedido): any {
        return this._http.put(environment.node + 'ordenPedido/' + ordenPedido._id, ordenPedido).map((res: Response) => res.json());
    }

    deleteOrdenPedido(ordenPedido: mOrdenPedido): any {
        return this._http.delete(environment.node + 'ordenPedido/' + ordenPedido._id).map((res: Response) => res.json());
    }

}
