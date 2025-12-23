export interface estadoPago {
    opcion: string;
    fecha: string;
    monto: number;
    metodoPago: number | string;
    estado: number;
    numeroPago?: string;
    factura?: string;
    cheque?: boolean;
}

export class mOrdenCompra {

    constructor(
        public _id: string,
        public folio: string,
        public proveedor: any,
        public centroCosto: any,
        public subCentroCosto: string,
        public tipoGasto: any,
        public subTipoGasto: String,
        public metodoPago: String,
        public Items: Array<any>,
        public estadosPagos: estadoPago[],
        public solicita: any,
        public descripcion: String,
        public despacho: String,
        public usuarioCreador: Number,
        public usuarioAprovador: Number,
        public evaluacion: any,
        public observacionCantidad: String,
        public observacionCalidad: String,
        public Estado: Number,
        public fechaCreacion: Date,
        public cotizacion: string,
        public prioridad: string,
        public iva: number,
        public boleta: number,
        public correo: boolean,
        public ingresoEgreso: number,
        public motivo: String,
        public condicionPago: String,
        public chequeEmitido: boolean,
        public sobregiro: number,
        public fechaFirma?: String,
        public afecta?: boolean,
        public categoria?: number
    ) { }

}
