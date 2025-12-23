import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Item } from "../models/nestItem";

@Injectable()
export class itemService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/movimiento'
    }

    getMovimientos(): Observable<Item[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getMovimientoById(idMovimiento: number): Observable<Item> {
        return this._http.get(`${this.context}/id/${idMovimiento}`).map((res: Response) => res.json());
    }
}