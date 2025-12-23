import { Empresa } from "./Empresa";
import { CentroCosto } from "./nestCentroCosto";

export interface Garantia{
    idGarantia: number;
    NumeroDocumento: string;
    TipoDoc: string;
    Monto: number;
    descripcion: string;
    proveedor: string;
    cliente: string;
    vencimiento: Date | null;
    estado: number;
    banco: string;
    isActive: boolean;
    fechaCreacion: Date;
    empresa: Empresa;
    centroCosto?: CentroCosto;
}

export interface GarantiaAdd{
    idGarantia?: number;
    NumeroDocumento: string;
    TipoDoc: string;
    Monto: number;
    descripcion: string;
    proveedor: string;
    cliente: string;
    vencimiento: Date | null;
    estado: number;
    banco: string;
    isActive: boolean;
    fechaCreacion: Date;
    empresa?: Empresa;
    centroCosto?: CentroCosto;
}