import { Injectable } from "@angular/core";
import {
  Http, Response, Headers,
  RequestMethod, RequestOptions,
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment"

import { mBolsa } from "../models/mBolsa";

declare var jQuery: any;
declare var $: any;

@Injectable()
export class sBolsas {
  constructor(public _http: Http) { }

  getBolsas(): Observable<any> {
    return this._http
      .get(environment.node + "Bolsas")
      .map((res: Response) => res.json());
  }

  getBolsasId(id: string): Observable<any> {
    return this._http
      .get(environment.node + "Bolsas/" + id)
      .map((res: Response) => res.json());
  }

  getBolsasIdCentroCosto(idCentroCosto: string, subCentroCostro: string): Observable<any> {
    return this._http
      .get(environment.node + "BolsasCentro/" + idCentroCosto + "&" + subCentroCostro)
      .map((res: Response) => res.json());
  }

  descuentaBolsa(mMonto: number): void {
    this.getBolsas().subscribe(Bolsas => {
      console.log(Bolsas);

    })
  }

  postBolsa(bolsa: mBolsa): any {
    return this._http
      .post(environment.node + "Bolsas/", bolsa)
      .map((res: Response) => res.json());
  }

  putBolsa(bolsa: mBolsa): any {
    return this._http
      .put(environment.node + "Bolsas/" + bolsa._id, bolsa)
      .map((res: Response) => res.json());
  }

  deleteBolsa(bolsa: mBolsa): any {
    return this._http
      .delete(environment.node + "Bolsas/" + bolsa._id)
      .map((res: Response) => res.json());
  }
}
