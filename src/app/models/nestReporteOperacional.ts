export interface gastoByTipo {
    subTipo: string
    enero: number
    febrero: number
    marzo: number
    abril: number
    mayo: number
    junio: number
    julio: number
    agosto: number
    septiembre: number
    octubre: number
    noviembre: number
    diciembre: number
}

export interface tablaReporteOperacional {
    nombreTipoGasto: string,
    enero: number
    febrero: number
    marzo: number
    abril: number
    mayo: number
    junio: number
    julio: number
    agosto: number
    septiembre: number
    octubre: number
    noviembre: number
    diciembre: number
    gastos: gastoByTipo[]
}

export interface operacionalYears {
    year: number
    enero: number
    febrero: number
    marzo: number
    abril: number
    mayo: number
    junio: number
    julio: number
    agosto: number
    septiembre: number
    octubre: number
    noviembre: number
    diciembre: number
}