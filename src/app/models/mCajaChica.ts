import { mSubCentroCosto } from './mSubCentroCosto'
import { mProfesional } from './mProfesional'
import { Profesional } from './nestProfesional'

interface tipoGasto {
    _id: string,
    nombre: string,
    fechaCreacion: Date
}

export class mCajaChica {
    constructor(
        public _id: string,
        public profesional: mProfesional | Profesional,
        public subCentroCosto: mSubCentroCosto,
        public monto: number,
        public tipo: number,
        public descripcion: string,
        public estado: number,
        public adjunto: string,
        public tipoGasto: tipoGasto,
        public subTipoGasto: string,
        public fechaCreacion?: string
    ) { }
}
