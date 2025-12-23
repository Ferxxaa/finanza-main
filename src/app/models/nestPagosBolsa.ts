import { Empresa } from "./Empresa";
import { Bolsa } from "./nestBolsa";

export interface PagosBolsa {
    idPagoBolsa: number;
    fechaPago: Date;
    monto: number;
    gastado: number;
    isActive: boolean;
    fechaCreacion: Date;
    empresa?: Empresa;
    bolsa?: Bolsa;
}

export interface PagosBolsaAdd {
    idPagoBolsa: number;
    fechaPago: Date;
    monto: number;
    gastado: number;
    isActive: boolean;
    fechaCreacion: Date;
    empresa?: number;
    bolsa?: number;
}