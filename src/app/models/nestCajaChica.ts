import { CentroCosto } from "./nestCentroCosto";
import { Profesional } from "./nestProfesional";
import { SubTipoGasto } from "./nestSubTipoGasto";
import { TipoGasto } from "./nestTipoGasto";

export class CajaChica {
    idCajaChica: number;
    monto: number;
    tipo: number;
    descripcion: string;
    estado: number;
    nombreAdjunto: string;
    isActive: boolean;
    fechaCreacion: Date;
    profesional?: Profesional | number;
    centroCosto?: CentroCosto | number;
    tipoGasto?: TipoGasto | number;
    subTipoGasto?: SubTipoGasto | number;
}

export class CajaChicaGet {
    idCajaChica: number;
    monto: number;
    tipo: number;
    descripcion: string;
    estado: number;
    nombreAdjunto: string;
    isActive: boolean;
    fechaCreacion: Date;
    profesional?: Profesional;
    centroCosto?: CentroCosto;
    tipoGasto?: TipoGasto;
    subTipoGasto?: SubTipoGasto;
}

export class CajaChicaSaldo {
    idCajaChica: number;
    monto: number;
    tipo: number;
    descripcion: string;
    estado: number;
    nombreAdjunto: string;
    isActive: boolean;
    fechaCreacion: Date;
    profesional?: Profesional | number;
    centroCosto?: CentroCosto | number;
    tipoGasto?: TipoGasto | number;
    subTipoGasto?: SubTipoGasto | number;
    saldo: number;
}