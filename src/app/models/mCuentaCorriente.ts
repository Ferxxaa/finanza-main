export interface CuentaCorriente {
    idEstadoPago: number;
    fechaPago: Date;
    monto: number;
    metodoPago: number;
    estado: number;
    valorCuentaCorriente: number;
    idMovimiento: number;
    numeroPago: string | null;
    numeroFactura: string | null;
    cheque: boolean;
    descripcion: string | null;
    estadoOrden: number;
    folio: number | null;
    tipoOC: number;
    nombreCentroCosto: string | null;
    fondo: string | null;
    letras: string | null;
    nombreTipoGasto: string | null;
    nombreSubTipoGasto: string | null;
    colorFondoSTP: string | null;
    colorLetrasSTP: string | null;
    nombreProveedor: string | null;
    correlativo: string | null;
}