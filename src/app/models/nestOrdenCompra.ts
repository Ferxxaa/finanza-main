import { EstadoPago } from "./nestEstadoPago";
import { Item } from "./nestItem";

export interface OrdenCompra {
    idMovimiento: null | number;
    folio: number | null;
    metodoPago: string;
    descripcion: string | null;
    despacho: string | null;
    estado: number;
    prioridad: string | null;
    correo: boolean;
    tipo: number;
    categoria: number;
    idCreador: number;
    idAprobador: number | null;
    idSolicitador: number | null;
    padre: number | null;
    condicionPago: string | null;
    motivoRechazo: number | null;
    isActive: boolean;
    fechaCreacion: Date;
    empresa: number;
    cotizacion: number | null;
    proveedor: number | null;
    areaNegocio: number;
    centroCosto: number;
    tipoGasto: number | null;
    subTipoGasto: number | null;
    item: Item[];
    estadoPago: EstadoPago[];
    iva: number;
    boleta: number;
}