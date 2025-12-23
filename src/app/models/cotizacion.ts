import { Comunes } from "../Share/Comunes";
import { LoginUser } from "./login-user";


export interface solicitador {
    activo: boolean;
    contraseniaUsuario: string;
    fechaCreacion: string;
    idPersona: number;
    idUsuario: number;
    idUsuarioCreador: number;
    nombreUsuario: string;
    fechaRemocion?: string;
    idUsuarioRemovedor?: string;
}

export interface iCotizacion {
    id: number;
    solicitador: solicitador;
    centroCosto: string;
    areaNegocio: string;
    observacion: string;
    adjunto: string;
    estado: number;
    fechaCreacion: string;
}

export class Cotizacion {

    id: number;
    solicitador: solicitador;
    centroCosto: string;
    areaNegocio: string;
    observacion: string;
    adjunto: string;
    estado: number;
    fechaCreacion: string;
    private comunes: Comunes

    constructor(
        element: iCotizacion
    ) {
        this.comunes = new Comunes();
        this.id = element.id;
        this.solicitador = element.solicitador;
        this.centroCosto = element.centroCosto;
        this.areaNegocio = element.areaNegocio;
        this.observacion = element.observacion;
        this.adjunto = element.adjunto;
        this.estado = element.estado;
        this.fechaCreacion = element.fechaCreacion ? element.fechaCreacion : this.comunes.fechaToString();
    }

    validatePropiedad(user: LoginUser): boolean {
        return user && this.solicitador ? this.solicitador.idUsuario == user.idUsuario : false;
    }

}
