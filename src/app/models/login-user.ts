export interface LoginUser {
    idUsuario: number;
    idPersona: number;
    nombreUsuario: string;
    contraseniaUsuario: string;
    fechaCreacion: string;
    fechaRemocion?: string;
    idUsuarioRemovedor?: string;
}
