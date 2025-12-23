import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { mCentroCosto } from '../models/mCentroCosto';
import { environment } from "../../environments/environment";

declare var jQuery: any;
declare var $: any;

@Injectable()

export class sCentroCosto {

    private AllCentroCosto;

    constructor(
        public _http: Http
    ) {
        this.getCentroCosto().subscribe(centro => {
            this.AllCentroCosto = centro;
        });
    }

    getCentroCosto(): Observable<any> {
        return this._http.get(environment.node + 'CentroCosto').map((res: Response) => res.json());
    }

    getCentroCostobyID(_id: string): Observable<any> {
        return this._http.get(environment.node + 'CentroCosto/' + _id).map((res: Response) => res.json());
    }

    fetchCentroCosto() {
        return fetch(environment.node + 'CentroCosto/').then(res => res.json());
    }

    fetchCentroCostobyID(_id: string) {
        return fetch(environment.node + 'CentroCosto/' + _id).then(res => res.json());
    }

    postCentroCosto(CentroCosto: mCentroCosto): any {
        return this._http.post(environment.node + 'CentroCosto/', CentroCosto).map((res: Response) => res.json());
    }

    putCentroCosto(CentroCosto: mCentroCosto): any {
        return this._http.put(environment.node + 'CentroCosto/' + CentroCosto._id, CentroCosto).map((res: Response) => res.json());
    }

    deleteCentroCosto(CentroCosto: mCentroCosto): any {
        return this._http.delete(environment.node + 'CentroCosto/' + CentroCosto._id).map((res: Response) => res.json());
    }

    /**************** Gets ****************/
    findCentroCosto(subcentro: string): any {
        let nombre, responsable, activo, fondo, letras;
        if (this.AllCentroCosto) {
            this.AllCentroCosto.forEach(centroCosto => {
                if (centroCosto.subCentroCosto.length && centroCosto.subCentroCosto.filter(centro => centro.nombre == subcentro).length) {
                    let subCentro = centroCosto.subCentroCosto.find(subCentroCosto => subCentroCosto.nombre == subcentro);
                    nombre = subCentro.nombre;
                    responsable = subCentro.responsable;
                    activo = subCentro.activo;
                    fondo = subCentro.fondo;
                    letras = subCentro.letras;
                }
            });

            return { nombre, responsable, activo, fondo, letras };
        }
        return null;
    }

    // returns

    retSumaContratos(centroCosto: any): number {
        return centroCosto.contrato.reduce((acc, el) => acc + el.monto, 0)
    }

    retTotalContrato(CentroCosto: mCentroCosto[], nombreCentroCosto: string): number {
        return CentroCosto
            .find(CentroCosto => CentroCosto.subCentroCosto
                .map(el => el.nombre)
                .includes(nombreCentroCosto))
            .subCentroCosto
            .find(el => el.nombre == nombreCentroCosto)
            .contrato.reduce((acc, el) => acc + el.monto, 0)
    }

    retTotalContratos(CentroCosto: mCentroCosto[], nombreCentroCosto: string[]) {
        return nombreCentroCosto.reduce((acc, el) => acc + this.retTotalContrato(CentroCosto, el), 0)
    }

}
