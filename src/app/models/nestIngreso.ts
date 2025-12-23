import { Empresa } from "./Empresa";
import { CentroCosto } from "./nestCentroCosto";
import { Contrato } from "./nestContrato";

export class Ingreso {
    idIngreso: number;
    fechaIngreso: Date;
    monto: Date;
    isActive: boolean;
    fechaCreacion: Date;
    empresa: Empresa;
    centroCosto: CentroCosto;
    contrato: Contrato;
}

export class IngresoAdd {
    idIngreso: number;
    fechaIngreso: Date;
    monto: Date;
    isActive: boolean;
    fechaCreacion: Date;
    empresa: number;
    centroCosto: number;
    contrato: number;
}