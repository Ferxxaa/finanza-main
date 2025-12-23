export interface filterDetalleCentroCosto {
    ordenes: boolean,
    proyecciones: boolean
}

export interface viewDetalleCentroCosto {
    total: number;
    real: number;
    proyectado: number;
    ivareal: number;
    ivaproyectado: number;
}