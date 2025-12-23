import { Injectable } from "@angular/core";
import { Http,Response,Headers,RequestMethod,RequestOptions} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";

import { mIngreso } from "../models/mIngreso";

declare var jQuery: any;
declare var $: any;

@Injectable()
export class sBolsas {
  constructor(public _http: Http) {}

  getIngreso(): Observable<any> {
    return this._http
      .get(environment.node + "Ingresos")
      .map((res: Response) => res.json());
  }

  getBolsasId(id: string): Observable<any> {
    return this._http
      .get(environment.node + "Ingresos/" + id)
      .map((res: Response) => res.json());
  }

  getBolsasIdCentroCosto(idCentroCosto: string,subCentroCostro :string): Observable<any> {
    return this._http
      .get(environment.node + "IngresosCentro/" + idCentroCosto + "&" + subCentroCostro)
      .map((res: Response) => res.json());
  }

  postBolsa(bolsa: mIngreso): any {
    return this._http
      .post(environment.node + "Ingresos/", bolsa)
      .map((res: Response) => res.json());
  }

  putBolsa(bolsa: mIngreso): any {
    return this._http
      .put(environment.node + "Ingresos/" + bolsa._id, bolsa)
      .map((res: Response) => res.json());
  }

  deleteBolsa(bolsa: mIngreso): any {
    return this._http
      .delete(environment.node + "Ingresos/" + bolsa._id)
      .map((res: Response) => res.json());
  }
}
