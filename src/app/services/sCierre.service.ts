import { Injectable } from "@angular/core";
import {
  Http, Response, Headers,
  RequestMethod, RequestOptions,
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment"

// import { mBolsa } from "../models/mBolsa";

declare var jQuery: any;
declare var $: any;

@Injectable()
export class sCierre {
  constructor(public _http: Http) { }

  getCierre(): Observable<any> {
    return this._http
      .get(environment.node + "Cierre")
      .map((res: Response) => res.json());
  }

  getCierreByAgno(agno: number): Observable<any> {
    return this._http
      .get(environment.node + "Cierre/" + agno)
      .map((res: Response) => res.json());
  }

  postBolsa(cierre: any): any {
    return this._http
      .post(environment.node + "Cierre/", cierre)
      .map((res: Response) => res.json());
  }

  putBolsa(Cierre: any): any {
    return this._http
      .put(environment.node + "Cierre/" + Cierre._id, Cierre)
      .map((res: Response) => res.json());
  }

  corrigeCierre(agno){
    this.getCierreByAgno(agno).subscribe(res => {
      let cierre = res[0];
      cierre.OC = this.filtraAgno(cierre.OC,agno)
      cierre.OP = this.filtraAgno(cierre.OP,agno);
      this.putBolsa(cierre).subscribe(res => console.log(res));
    })
  }

  private filtraAgno(ordenes: any[], agno: number) {
    let filtrada = ordenes.map(orden => ({ ...orden, estadosPagos: orden.estadosPagos.filter(el => new Date(el.fecha).getFullYear() == agno) }));
    return filtrada.filter(el => el.estadosPagos.length > 0);
  }
}
