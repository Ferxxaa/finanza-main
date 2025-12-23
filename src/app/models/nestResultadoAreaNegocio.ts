export interface ReportResultadoAreaNegocio {
    periodo: string,
    countMonth: number,
    nombreCentroCosto: string,
    letras: string,
    fondo: string,
    netoContrato: number,
    ivaContrato: number,
    montoContratos: number,
    gastado: number,
    utilidad: number,
    porcentajeUtilidad: number
    utilidadMensual: number,
    utilidadMensualPromedio: number,
}

export interface ReportResultadoAreaNegocioByYear {
    year: number,
    utilidadTotal: number,
    ponderadoTotal: number,
    detalle: ReportResultadoAreaNegocio[]
}

export interface ReportRentabilidadAreaNegocioByYear {
    year: number,
    utilidadTotal: number,
    ponderadoTotal: number,
    ingresos: number,
    totalOperacional: number
    detalle: ReportResultadoAreaNegocio[]
    margen1Utilidad: number
    margen2Utilidad: number
}