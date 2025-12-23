export interface ReportEvalProv {
    fechaCreacion: Date;
    folio: number;
    year: number;
    idProveedor: number;
    nombre: string;
    categoria: number;
    rutProveedor: string;
    disponibilidad: number;
    precio: number;
    tiempo: number;
    calidad: number;
    ssoma: number;
    cantidadEval?: number;
    calificacion?: number;
    Comentario?: string;
    totalOC?: number;
}

export interface EvalProveedoresYear {
    year: number,
    tipoProveedor:string,
    cantidadProveedores: number,
    cantidadEvaluaciones: number,
    notaPromedio: number
}