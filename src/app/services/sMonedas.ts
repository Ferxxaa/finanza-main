import { Injectable } from "@angular/core";
import {
  Http, Response, Headers,
  RequestMethod, RequestOptions,
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment"

@Injectable()
export class sMonedas {
  constructor(public _http: Http) { }

  getMonedas(): Observable<any> {
    return this._http
      .get(environment.monedas)
      .map((res: Response) => res.json());
  }

}
