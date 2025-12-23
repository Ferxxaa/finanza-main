export interface ReporteVentas {
    tipo: number;
    centroCostoIdCentroCosto: number;
    descripcion: string;
    fechaPago: Date;
    monto: number;
    estado: number;
    numeroPago: string;
    numeroFactura: string;
    nombreAreaNegocio: string;
    nombreCentroCosto: string;
    letras: string;
    fondo: string;
}

export interface ReporteVentasMonth {
    mes: string,
    reporteVentas: ReporteVentas[]
}