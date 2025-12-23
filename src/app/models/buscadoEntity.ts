export interface Buscador {
    inicio: string | null;
    termino: string | null;
    oc: number | null;
    proveedor: string | null;
    cCosto: string | null;
    factura: number | null;
    pago: number | null;
    tipoGasto?: string | null;
    subTipoGasto?: string | null;
    estado?: number | null;
}