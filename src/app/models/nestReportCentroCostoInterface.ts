export interface reportCentroCostoInterface {
    idTipoGasto: number;
    nombreTipoGasto: string;
    idSubTipoGasto?: number;
    nombreSubTipoGasto?: string;
    monto: number;
    iva: number;
    boleta: number;
    total: number;
}