export interface solicitador {
    activo: boolean;
    contraseniaUsuario: string;
    fechaCreacion: string;
    idPersona: number;
    idUsuario: number;
    idUsuarioCreador: number;
    nombreUsuario: string;
    fechaRemocion?: string;
    idUsuarioRemovedor?: string;
}

export class mCotizacion {

    constructor(
        public _id: string,
        public prioridad: string,
        public adjunto: String,
        public areaNegocio: string,
        public centroCosto: string,
        public observacion: string,
        public solicitador: solicitador,
        public estado: number,
        public fechaCreacion: Date,
        public id:number
    ) { }

}
