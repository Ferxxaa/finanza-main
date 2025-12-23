import { AreaNegocio } from "./nestAreaNegocio";
import { CentroCosto } from "./nestCentroCosto";
import { EstadoPago } from "./nestEstadoPago";

export interface Cotizacion {
    idCotizacion: number;
    prioridad: number;
    nombreAdjunto: string;
    observacion: string | null;
    estado: number;
    solicitador: number;
    isActive: boolean;
    fechaCreacion: Date;
    empresa: number;
    areaNegocio: number | AreaNegocio | any;
    centroCosto: number | CentroCosto | any;
    usuarioSolicitador?: any
}