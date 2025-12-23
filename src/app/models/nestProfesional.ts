import { CajaChica, CajaChicaSaldo } from "./nestCajaChica";

export interface Profesional {
    idProfesional: number;
    nombreProfesional: string;
    saldo: number;
    isActive: boolean;
    fechaCreacion: Date;
    cajaChica?: CajaChica[]
}

export interface profesionalDTO {
    idProfesional: number,
    nombreProfesional: string,
    saldo: number,
    cajaChica: number
}

export interface ProfesionalSaldo {
    idProfesional: number;
    nombreProfesional: string;
    saldo: number;
    isActive: boolean;
    fechaCreacion: Date;
    cajaChica?: CajaChicaSaldo[]
}