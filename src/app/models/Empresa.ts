import { Cotizacion } from "./cotizacion";
import { AreaNegocio } from "./mGastos";
import { CentroCosto } from "./nestCentroCosto";
import { Proveedor } from "./nestProveedor";
import { SubTipoGasto } from "./nestSubTipoGasto";
import { TipoGasto } from "./nestTipoGasto";

export interface Empresa {
    idEmpresa: number;
    nombreEmpresa: string;
    montoPartida: number;
    maximoSobregiro: number;
    valBoleta: number;
    valIVA: number;
    isActive?: boolean;
    fechaCreacion?: Date;
    proveedores?: Proveedor[];
    areasNegocio?: AreaNegocio[];
    tipoGasto?: TipoGasto[];
    subTipoGasto?: SubTipoGasto[];
    centroCosto?: CentroCosto[];
    cotizacion?: Cotizacion[];
    
}
