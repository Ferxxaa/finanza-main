export interface ViewCentroCosto{
    idEstadoPago: number;
    fechaPago: Date;
    monto: number;
    metodoPago: number;
    estado: number;
    valorCuentaCorriente: number | null;
    idMovimiento: number;
    numeroPago: string | null;
    numeroFactura: string;
    descripcion: string | null;
    estadoOrden: number;
    tipoOC: number;
    folio: number | null;
    idCentroCosto: number;
    nombreCentroCosto: string;
    fondo: string;
    letras: string;
    nombreTipoGasto: string;
    colorFondoSTP: string;
    colorLetrasSTP: string;
    nombreSubtipoGasto: string;
    nombreProveedor: string;
    motivoRechazo: string;
}