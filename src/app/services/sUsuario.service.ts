import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";
import { mUsuario } from '../models/mUsuario';

declare var jQuery: any;
declare var $: any;

@Injectable()

export class sUsuario {

    constructor(
        public _http: Http
    ) { }

    getUsuario(): Observable<any> {
        return this._http.get(environment.url + 'Usuario').map((res: Response) => res.json());
    }

    fetchUsuario() {
        return fetch(environment.url + 'Usuario')
            .then(res => res.json());
    }

    getUsuariobyID(_id: number): Observable<any> {
        return this._http.get(environment.url + 'Usuario/' + _id).map((res: Response) => res.json());
    }

    getUsuariobyidUsuario(_idUsuario: number): Observable<any> {
        return this._http.get(environment.url + 'Usuario/GetUsuariobyidUsuario/idUsuario=' + _idUsuario).map((res: Response) => res.json());
    }

    getUsuariobyidPersona(_idPersona: number): Observable<any> {
        return this._http.get(environment.url + 'Usuario/GetUsuariobyidPersona/idPersona=' + _idPersona).map((res: Response) => res.json());
    }

    getUsuariobynombreUsuario(_nombreUsuario: string): Observable<mUsuario> {
        return this._http.get(environment.url + 'Usuario/GetUsuariobynombreUsuario/nombreUsuario=' + _nombreUsuario).map((res: Response) => res.json());
    }

    getUsuariobycontraseniaUsuario(_contraseniaUsuario: string): Observable<any> {
        return this._http.get(environment.url + 'Usuario/GetUsuariobycontraseniaUsuario/contraseniaUsuario=' + _contraseniaUsuario).map((res: Response) => res.json());
    }

    getUsuariobyfechaCreacion(_fechaCreacion: Date): Observable<any> {
        return this._http.get(environment.url + 'Usuario/GetUsuariobyfechaCreacion/fechaCreacion=' + _fechaCreacion).map((res: Response) => res.json());
    }

    getUsuariobyactivo(_activo: boolean): Observable<any> {
        return this._http.get(environment.url + 'Usuario/GetUsuariobyactivo/activo=' + _activo).map((res: Response) => res.json());
    }

    getUsuariobyfechaRemocion(_fechaRemocion: Date): Observable<any> {
        return this._http.get(environment.url + 'Usuario/GetUsuariobyfechaRemocion/fechaRemocion=' + _fechaRemocion).map((res: Response) => res.json());
    }

    getUsuariobyidUsuarioCreador(_idUsuarioCreador: number): Observable<any> {
        return this._http.get(environment.url + 'Usuario/GetUsuariobyidUsuarioCreador/idUsuarioCreador=' + _idUsuarioCreador).map((res: Response) => res.json());
    }

    getUsuariobyidUsuarioRemovedor(_idUsuarioRemovedor: number): Observable<any> {
        return this._http.get(environment.url + 'Usuario/GetUsuariobyidUsuarioRemovedor/idUsuarioRemovedor=' + _idUsuarioRemovedor).map((res: Response) => res.json());
    }

    getUsuarioPersonaByIdUsuario(_idUsuario: number) {
        return this._http.get(environment.url + "Vis_UsuarioPersona/" + _idUsuario).map((res: Response) => res.json())
    }

    postAddUsuario(_Usuario: mUsuario): any {
        return $.post(environment.url + 'Usuario', _Usuario)
    }

    postUpdDelUsuario(_Usuario: mUsuario): any {
        return $.post(environment.url + 'Usuario/' + _Usuario.idUsuario, _Usuario)
    }
}
