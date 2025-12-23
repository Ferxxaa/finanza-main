export class mProveedor {

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
        public fechaCreacion: Date
    ) { }

}