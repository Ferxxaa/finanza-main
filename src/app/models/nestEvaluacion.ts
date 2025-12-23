import { Empresa } from "./Empresa";
import { Movimiento } from "./movimiento";

export class Evaluacion {
    idEvaluacion: number;
    disponibilidad: number;
    precio: number;
    tiempo: number;
    calidad: number;
    ssoma: number | null;
    Comentario: string | null;
    isActive: boolean;
    fechaCreacion: Date;
    empresa: Empresa;
    movimiento: Movimiento;
}

export class EvaluacionAdd {
    disponibilidad: number;
    precio: number;
    tiempo: number;
    calidad: number;
    ssoma: number | null;
    Comentario: string | null;
    isActive: boolean;
    fechaCreacion: Date;
    empresa: number;
    movimiento: number;
}