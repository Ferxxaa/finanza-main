import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import { buscadorProveedor } from "../models/buscadorProveedor"
import { Proveedor } from "../models/nestProveedor"

@Injectable()
export class nestProveedorService {
    context: string
    constructor(public _http: Http) {
        this.context = environment.nest + 'v1/proveedor'
    }

    init(): Proveedor {
        return {
            rutProveedor: null,
            nombre: null,
            categoria: 0,
            telefono: null,
            direccion: null,
            contacto: null,
            mail: null,
            observacion: null,
            fechaCreacion: new Date(),
            isActive: true,
            idProveedor: null
        }
    }

    getProveedores(): Observable<Proveedor[]> {
        return this._http.get(`${this.context}/all`).map((res: Response) => res.json());
    }

    getProveedorById(idProveedor: number): Observable<Proveedor> {
        return this._http.get(`${this.context}/id/${idProveedor}`).map((res: Response) => res.json());
    }

    getProveedorByFilter(filter: buscadorProveedor): Observable<Proveedor[]> {
        return this._http.post(`${this.context}/filter`, filter).map((res: Response) => res.json());
    }

    addProveedor(proveedor: Proveedor): Observable<Proveedor> {
        return this._http.post(`${this.context}/add`, proveedor).map((res: Response) => res.json());
    }

    delProveedor(proveedor: Proveedor): Observable<Proveedor> {
        return this._http.get(`${this.context}/delete/${proveedor.idProveedor}`).map((res: Response) => res.json());
    }
}