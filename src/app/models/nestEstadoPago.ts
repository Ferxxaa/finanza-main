export class EstadoPago {
    fechaPago: Date;
    monto: number;
    metodoPago: number;
    estado: number;
    numeroPago: string | null;
    numeroFactura: string | null;
    valorCuentaCorriente: number;
    cheque: boolean;
    isActive: boolean;
    fechaCreacion: Date;
    idEstadoPago: number;
}