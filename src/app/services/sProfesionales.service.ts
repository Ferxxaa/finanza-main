import { Injectable } from "@angular/core";
import {
  Http, Response, Headers,
  RequestMethod, RequestOptions,
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment"
import { mProfesional } from "../models/mProfesional";
import { BehaviorSubject } from 'rxjs';

declare var jQuery: any;
declare var $: any;

@Injectable()
export class sProfesionales {

  private allProfesionales: mProfesional[];
  private profesionalesBehavior = new BehaviorSubject<mProfesional[]>([])
  profesionales$ = this.profesionalesBehavior.asObservable();

  constructor(public _http: Http) {
    this.getProfesionales().subscribe(prof => {
      this.allProfesionales = prof;
      this.profesionalesBehavior.next(this.allProfesionales);
    });
  }

  getProfesionales(): Observable<mProfesional[]> {
    return this._http
      .get(environment.node + "Profesionales")
      .map((res: Response) => res.json());
  }

  getProfesionalesId(id: string): Observable<mProfesional> {
    return this._http
      .get(environment.node + "Profesionales/" + id)
      .map((res: Response) => res.json());
  }

  postProfesional(profesional: mProfesional): any {
    return this._http
      .post(environment.node + "Profesionales/", profesional)
      .map((res: Response) => res.json());
  }

  putProfesional(profesional: mProfesional): any {
    return this._http
      .put(environment.node + "Profesionales/" + profesional._id, profesional)
      .map((res: Response) => res.json());
  }

  deleteProfesional(profesional: mProfesional): any {
    return this._http
      .delete(environment.node + "Profesionales/" + profesional._id)
      .map((res: Response) => res.json());
  }

  /**************** RXJS ****************/

  addProfesional(profesional: mProfesional) {
    this.allProfesionales = [...this.allProfesionales, profesional];
    this.profesionalesBehavior.next(this.allProfesionales);
  }

  /**************** Gets ****************/
  findProfesional(id: string): mProfesional {
    let { _id, nombre, saldo } = this.allProfesionales.find(prof => prof._id == id);
    return { _id, nombre, saldo }
  }

  getAllProf() {
    return this.allProfesionales;
  }
}
