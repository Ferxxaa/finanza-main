export interface ReporteDetalleTipoGastoEntity {
    idTipoGasto: number;
    nombreTipoGasto: string;
    totalTipoGasto: number;
    detalleSubTipoGasto: ReporteDetalleSubTipoGastoEntity[]
}

export interface ReporteDetalleSubTipoGastoEntity {
    centroCostoIdCentroCosto: number;
    idTipoGasto: number;
    nombreTipoGasto: string;
    idSubTipoGasto: number;
    nombreSubTipoGasto: string;
    colorFondo: string;
    colorLetras: number;
    totalSubTipoGasto: number;
}