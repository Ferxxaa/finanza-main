export class mReporteProveedor {

    constructor(
        public _id: string,
        public rutProveedor: string,
        public nombre: string,
        public categoria: string,
        public telefono: string,
        public direccion: string,
        public contacto: string,
        public mail: string,
        public observacion: string,
        public fechaCreacion: Date,
        public cantidadOC: number,
        public OcEvaluadas:number,
        public evaluacion: number,
        public disponibilidad:number,
        public precio:number,
        public tiempo:number,
        public calidad:number,
        public ssoMa:number,
        public totalOrden:number,
    ) { }

}