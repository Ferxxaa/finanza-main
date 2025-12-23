import { Empresa } from "./Empresa";
import { CentroCosto } from "./nestCentroCosto";
import { Ingreso } from "./nestIngreso";

export class Contrato {
    idContrato: number;
    nombreContrato: string;
    monto: number;
    isActive: boolean;
    fechaCreacion: Date;
    empresa: Empresa;
    centroCosto: CentroCosto;
    ingreso: Ingreso[];
}

export class ContratoAdd {
    idContrato?: number;
    nombreContrato: string;
    monto: number;
    isActive: boolean;
    fechaCreacion: Date;
    empresa: number;
    centroCosto: number;
    ingreso?: Ingreso[];
}