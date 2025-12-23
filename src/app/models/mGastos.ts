interface coloresSubTipo {
    nombreSubTipo: string;
    colorFondo: string;
    colorLetras: string;
}

export interface AreaNegocio {
    _id: string,
    nombre: string
}

export class mGastos {

    constructor(
        public _id: string,
        public nombre: string,
        public subTipoGasto: Array<any>,
        public coloresSubTipo: Array<coloresSubTipo>,
        public areaNegocio?: AreaNegocio,
        public colorLetras?: string,
        public colorFondo?: string,
        public fechaCreacion?: Date
    ) { }

}
