import { AreaNegocio } from "./nestAreaNegocio";
import { CentroCosto } from "./nestCentroCosto";
import { Cotizacion } from "./nestCotizacion";
import { EstadoPago } from "./nestEstadoPago";
import { Item } from "./nestItem";
import { Proveedor } from "./nestProveedor";
import { SubTipoGasto } from "./nestSubTipoGasto";
import { TipoGasto } from "./nestTipoGasto";

export interface Movimiento {
    folio: number;
    metodoPago: string;
    descripcion: string;
    despacho: string | null;
    prioridad: string;
    tipo: number;
    categoria: number;
    idCreador: number;
    idAprobador: number;
    idSolicitador: number;
    estado: number;
    correo: boolean;
    padre: number | null;
    condicionPago: string | null;
    idMovimiento: number;
    motivoRechazo: string;
    isActive: boolean;
    fechaCreacion: Date;
    correlativo?: number;
}

export interface MovimientoRelationShip {
    folio: number;
    metodoPago: string;
    descripcion: string;
    despacho: string | null;
    prioridad: string;
    tipo: number;
    categoria: number;
    idCreador: number;
    idAprobador: number;
    idSolicitador: number;
    estado: number;
    correo: boolean;
    padre: number | null;
    condicionPago: string | null;
    idMovimiento: number;
    motivoRechazo: string;
    isActive: boolean;
    fechaCreacion: Date;
    proveedor: Proveedor;
    areaNegocio: AreaNegocio;
    centroCosto: CentroCosto;
    tipoGasto: TipoGasto;
    subTipoGasto: SubTipoGasto;
    estadoPago: EstadoPago[];
    cotizacion?: Cotizacion;
    item: Item[];
    total?: number;
    iva?: number;
    boleta?: number;
    correlativo?: number;
}

export interface MovimientoAdd {
    folio: number;
    metodoPago: string;
    descripcion: string;
    despacho: string | null;
    prioridad: string;
    tipo: number;
    categoria: number;
    idCreador: number;
    idAprobador: number;
    idSolicitador: number;
    estado: number;
    correo: boolean;
    padre: number | null;
    condicionPago: string | null;
    idMovimiento: number;
    motivoRechazo: string;
    isActive: boolean;
    fechaCreacion: Date;
    centroCosto?: number;
    areaNegocio?: number;
    proveedor?: number;
    tipoGasto?: number;
    subTipoGasto?: number;
    estadoPago?: EstadoPago[];
    cotizacion?: Cotizacion;
    item?: Item[];
    total?: number;
    iva?: number;
    boleta?: number;
    empresa?: number;
    correlativo?: number;
}