import { Empresa } from "./Empresa";
import { AreaNegocio } from "./nestAreaNegocio";
import { CentroCosto } from "./nestCentroCosto";
import { PagosBolsa, PagosBolsaAdd } from "./nestPagosBolsa";
import { TipoGasto } from "./nestTipoGasto";

export interface Bolsa {
    idBolsa: number;
    tipoBolsa: number;
    isActive: boolean;
    fechaCreacion: Date;
    empresa?: Empresa;
    areaNegocio?: AreaNegocio;
    centroCosto?: CentroCosto;
    pagosBolsa?: PagosBolsa[];
    tipoGastos?: TipoGasto[];
}

export interface BolsaAdd {
    idBolsa: number;
    tipoBolsa: number;
    isActive: boolean;
    fechaCreacion: Date;
    empresa?: number;
    areaNegocio?: number;
    centroCosto?: number;
    pagosBolsa: PagosBolsaAdd[];
    tipoGastos: TipoGasto[];
}