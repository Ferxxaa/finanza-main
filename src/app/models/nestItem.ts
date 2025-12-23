export interface Item {
    codigo: string | null;
    detalle: string | null;
    cantidad: number;
    declaracion: number | null;
    moneda: string;
    precioUnitario: number;
    tipoDeclaracion: number;
    isActive: boolean;
    fechaCreacion: Date;
    idItem: number;
}