import { SubTipoGasto } from "./nestSubTipoGasto";

export class TipoGasto {
    nombreTipoGasto: string;
    isActive: boolean;
    fechaCreacion: Date;
    idTipoGasto: number;
    subTipoGasto?: SubTipoGasto[]
}