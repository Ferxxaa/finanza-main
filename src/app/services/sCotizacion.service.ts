import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment"
import { Cotizacion } from '../models/cotizacion';
import { LoginUser } from '../models/login-user';

import { mCotizacion } from '../models/mCotizacion';

declare var jQuery: any;
declare var $: any;

@Injectable()

export class sCotizacion {

    constructor(
        public _http: Http
    ) { }

    getCotizacion(): Observable<any> {
        return this._http.get(environment.node + 'Cotizacion').map((res: Response) => res.json());
    }

    getCotizacionesbyID(_id: string): Observable<any> {
        return this._http.get(environment.node + 'Cotizacion/' + _id).map((res: Response) => res.json());
    }

    postCotizaciones(Cotizacion: mCotizacion): any {
        return this._http.post(environment.node + 'Cotizacion/', Cotizacion).map((res: Response) => res.json());
    }

    putCotizaciones(Cotizacion: mCotizacion): any {
        return this._http.put(environment.node + 'Cotizacion/' + Cotizacion._id, Cotizacion).map((res: Response) => res.json());
    }

    deleteCotizaciones(Cotizacion: mCotizacion): any {
        return this._http.delete(environment.node + 'Cotizacion/' + Cotizacion._id + "/" + Cotizacion.adjunto).map((res: Response) => res.json());
    }

    AdjuntarArchivo(file) {
        return new Promise((resolve, reject) => {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();

            formData.append('adjuntar', file, `${new Date().getTime()}-${file.name}`)

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', environment.node + 'adjuntar', true);
            xhr.send(formData);
        });
    }

    getFile(fileName: string) {
        return this._http.get(environment.node + 'adjuntar/' + fileName).map((res: Response) => res);
    }

}
