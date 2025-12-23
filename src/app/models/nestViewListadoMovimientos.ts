export interface ViewListadoMovimiento {
    idMovimiento: number;
    fechaCreacion: Date;
    folio: number | null;
    descripcion: string | null;
    estado: number;
    categoria: number;
    correo: boolean;
    tipoOC: number;
    idSolicitador: number | null;
    idProveedor: number;
    nombre: string;
    mail: string;
    idCentroCosto: number;
    nombreCentroCosto: string;
    letras: string;
    fondo: string;
    disponibilidad: number;
    precio: number;
    tiempo: number;
    calidad: number;
    ssoma: number | null;
    idCotizacion: number | null;
    nombreAdjunto: string | null;
    totalItem: number | null;
    iva: number | null;
    boleta: number | null;
}