import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Buscador } from '../models/buscadoEntity';
import { CuentaCorriente } from '../models/mCuentaCorriente';

@Injectable()
export class SCuentaCorrienteService {

  context: string;

  constructor(public _http: Http) { this.context = environment.nest + 'v1/cuentaCorriente' }

  getCuentaCorrienteConfirmados(): Observable<CuentaCorriente[]> {
    return this._http.get(`${this.context}/confirmados`).map((res: Response) => res.json());
  }

  getCuentaCorrientePendientes(): Observable<CuentaCorriente[]> {
    return this._http.get(`${this.context}/pendientes`).map((res: Response) => res.json());
  }

  getCuentaCorrienteConfirmadosFilter(buscador: Buscador): Observable<CuentaCorriente[]> {
    return this._http.post(`${this.context}/confirmados`, buscador).map((res: Response) => res.json());
  }

  getCuentaCorrientePendientesfilter(buscador: Buscador): Observable<CuentaCorriente[]> {
    return this._http.post(`${this.context}/pendientes`, buscador).map((res: Response) => res.json());
  }

}
