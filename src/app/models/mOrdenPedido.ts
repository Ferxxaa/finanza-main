export class mOrdenPedido {

    constructor(
        public _id: string,
        public idOrdenCompra: string,
        public correlativo: Number,
        public proveedor: any,
        public centroCosto: any,
        public subCentroCosto: String,
        public tipoGasto: any,
        public subTipoGasto: String,
        public metodoPago: String,
        public Items: Array<any>,
        public estadosPagos: any,
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
        public fechaFirma?: String
    ) { }

}
