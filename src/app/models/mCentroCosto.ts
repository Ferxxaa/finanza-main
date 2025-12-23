import { mSubCentroCosto } from './mSubCentroCosto';

export interface mContrato {
    nombre: string;
    monto: number;
}

export class mCentroCosto {

    constructor(
        public _id: string,
        public nombre: string,
        public subCentroCosto: Array<mSubCentroCosto>,
        public activo: boolean,
        public fechaCreacion: Date,
        public periodo?: number
    ) { }

}
