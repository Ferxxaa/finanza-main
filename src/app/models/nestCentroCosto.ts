import { AreaNegocio } from "./nestAreaNegocio";

export class CentroCosto {
    nombreCentroCosto: string;
    responsable: string;
    fondo: string;
    letras: string;
    montoProgramado: number;
    isActive: boolean;
    fechaCreacion: Date;
    idCentroCosto: number;
    areaNegocio?: AreaNegocio;
    fechaInicio?: Date;
    fechaTermino?: Date;
}

export class CentroCostoAdd {
    nombreCentroCosto: string;
    responsable: string;
    fondo: string;
    letras: string;
    montoProgramado: number;
    isActive: boolean;
    fechaCreacion: Date;
    idCentroCosto: number;
    areaNegocio?: number;
    fechaInicio?: Date;
    fechaTermino?: Date;
}